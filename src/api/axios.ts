import { captureException, setContext } from '@sentry/node';
import { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { Agent as HttpAgent } from 'http';
import { Agent as HttpsAgent } from 'https';
import { container } from 'tsyringe';
import { Client } from '../struct/client.js';
import { Api, HttpClient } from './generated.js';

/** Endpoints that answer with 404 as a normal "no data" result, not as a failure. */
const EXPECTED_NOT_FOUND = [/^\/legends\/[^/]+\/estimate-rank$/];

const isExpectedError = (error: AxiosError) => {
  if (error.response?.status !== 404) return false;
  const url = error.config?.url ?? '';
  return EXPECTED_NOT_FOUND.some((pattern) => pattern.test(url));
};

// Cloudflare resets open connections when it moves them between data centers. Reads are safe to send
// again: GET, and QUERY, which the API uses for reads that take a body.
const RETRYABLE_CODES = new Set(['ECONNRESET', 'EPIPE']);
const RETRYABLE_METHODS = new Set(['GET', 'QUERY']);
type RetryableConfig = InternalAxiosRequestConfig & { retried?: boolean; startedAt?: number };

// the host has no IPv6 route, so every AAAA attempt ends in ENETUNREACH before falling back
const agentOptions = { keepAlive: true, family: 4 } as const;

const httpClient = new HttpClient({
  baseURL: `${process.env.INTERNAL_API_BASE_URL}/v1`,
  secure: true,
  timeout: 30_000,
  httpAgent: new HttpAgent(agentOptions),
  httpsAgent: new HttpsAgent(agentOptions),
  securityWorker: () => {
    return {
      headers: {
        'x-api-key': process.env.INTERNAL_API_KEY,
        'x-rate-limit-bypass-key': process.env.INTERNAL_API_KEY
      }
    };
  }
});

httpClient.instance.interceptors.request.use((config: RetryableConfig) => {
  config.startedAt ??= performance.now();
  return config;
});

httpClient.instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<{ message: string }>) => {
    const client = container.resolve(Client);

    const config = error.config as RetryableConfig | undefined;
    if (
      config &&
      !config.retried &&
      !error.response &&
      RETRYABLE_METHODS.has(config.method?.toUpperCase() ?? '') &&
      RETRYABLE_CODES.has(error.code ?? '')
    ) {
      config.retried = true;
      // A failed retry goes through this interceptor again, which logs and reports it.
      const response = await httpClient.instance.request(config);
      const elapsed = Math.round(performance.now() - (config.startedAt ?? performance.now()));
      client.logger.debug(
        `${response.status} ${config.method?.toUpperCase()} ${config.url} after 1 retry in ${elapsed} ms`,
        {
          label: 'AXIOS'
        }
      );
      return response;
    }

    client.logger.error(
      `${error.config?.method?.toUpperCase()} ${error.config?.url} ${JSON.stringify(error.response?.data || error.code, null, 0)}`,
      { label: 'AXIOS' }
    );

    if (!isExpectedError(error)) {
      setContext('http_call_errored', {
        response: error.response?.data || {},
        url: error.config?.url,
        code: error.code,
        message: error.message,
        method: error.config?.method,
        params: error.config?.params,
        data: error.config?.data
      });

      captureException(error);
    }

    // callers must see the failure; resolving here would hand them an undefined response
    return Promise.reject(error);
  }
);

export const encode = (str: string) => encodeURIComponent(str);

export const api = new Api(httpClient);
