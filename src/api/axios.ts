import { captureException } from '@sentry/node';
import { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { Agent as HttpAgent } from 'http';
import { Agent as HttpsAgent } from 'https';
import { container } from 'tsyringe';
import { Client } from '../struct/client.js';
import { userAgent } from '../util/user-agent.js';
import { Api, ErrorResponseDto, HttpClient } from './generated.js';

/** Endpoints that answer with 404 as a normal "no data" result, not as a failure. */
const EXPECTED_NOT_FOUND = [/^\/legends\/[^/]+\/estimate-rank$/];

/** Codes that don't say what went wrong, so a 4xx with one of them may be a bug. */
const GENERIC_ERROR_CODES = new Set<string>([
  'BAD_REQUEST',
  'UNAUTHORIZED',
  'FORBIDDEN',
  'NOT_FOUND',
  'INTERNAL_SERVER_ERROR',
  'SERVICE_UNAVAILABLE'
]);

type ApiErrorBody = Partial<ErrorResponseDto> & { cloudflare_error?: boolean };

/** Only `error` goes to Sentry Issues. The caller sees the failure at every level. */
const logLevelOf = (error: AxiosError<ApiErrorBody>) => {
  const url = error.config?.url ?? '';
  const status = error.response?.status ?? 0;
  const body = error.response?.data;
  if (status === 404 && EXPECTED_NOT_FOUND.some((pattern) => pattern.test(url))) {
    return 'debug';
  }
  // A specific code (GIVEAWAY_NOT_IN_CLAN) is an outcome the caller turns into a reply.
  if (status >= 400 && status < 500 && body?.code && !GENERIC_ERROR_CODES.has(body.code)) {
    return 'debug';
  }
  // The API answers 503 only when the CoC API failed. A Cloudflare error page means the origin is down.
  if (body?.statusCode === 503 || body?.cloudflare_error) return 'warn';
  return 'error';
};

/** Groups API errors by route and status: the stack has no app frames to tell them apart. */
const fingerprintOf = (error: AxiosError) => {
  const route = (error.config?.url ?? '')
    .split('?')[0]
    .replace(/\/%23[0-9A-Z]+/gi, '/:tag')
    .replace(/\/\d{15,}/g, '/:id')
    .replace(/\/[0-9a-f]{20,}/gi, '/:id');
  return [
    'api',
    error.config?.method?.toUpperCase() ?? '',
    route,
    String(error.response?.status ?? error.code)
  ];
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
  config.headers.set('User-Agent', userAgent(container.resolve(Client).user?.id));
  return config;
});

httpClient.instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiErrorBody>) => {
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

    const level = logLevelOf(error);
    client.logger[level](
      `${error.config?.method?.toUpperCase()} ${error.config?.url} ${JSON.stringify(error.response?.data || error.code, null, 0)}`,
      { label: 'AXIOS' }
    );

    if (level === 'error') {
      // On the event only: setContext would stick to the shared scope and reach later events.
      captureException(error, {
        fingerprint: fingerprintOf(error),
        contexts: {
          http_call_errored: {
            response: error.response?.data || {},
            url: error.config?.url,
            code: error.code,
            message: error.message,
            method: error.config?.method,
            params: error.config?.params,
            data: error.config?.data
          }
        }
      });
    }

    // callers must see the failure; resolving here would hand them an undefined response
    return Promise.reject(error);
  }
);

export const encode = (str: string) => encodeURIComponent(str);

export const api = new Api(httpClient);
