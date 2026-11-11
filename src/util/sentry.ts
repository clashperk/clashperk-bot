import * as Sentry from '@sentry/node';
import { NodeOptions, httpIntegration, rewriteFramesIntegration } from '@sentry/node';

// Child spans (HTTP, Mongo, Redis) are kept on this share of command traces, to stay within the span quota.
const CHILD_SPAN_RATE = 0.1;

export const sentryConfig: NodeOptions = {
  dsn: process.env.SENTRY_DSN,
  serverName: process.env.SERVICE_NAME ?? 'clashperk_bot',
  environment: process.env.NODE_ENV ?? 'development',
  release: process.env.GIT_SHA,
  enableLogs: true,

  // Only command executions are traced; every other root span (DB, HTTP) would be recorded and then dropped.
  tracesSampler: ({ attributes }) => (attributes?.['interaction.command'] ? 1 : 0),
  sendDefaultPii: true,
  // No trace headers on outgoing requests: they push the CoC API's request headers past ~1 KB (~300 ms slower).
  tracePropagationTargets: [],

  ignoreSpans: [{ op: /^(?!command_executed|http\.client|db)/ }],
  beforeSendTransaction(event) {
    if (Math.random() >= CHILD_SPAN_RATE) event.spans = [];
    return event;
  },

  integrations: [
    rewriteFramesIntegration({
      iteratee(frame) {
        if (frame.filename) {
          const filename = frame.filename.replace(process.cwd(), '');
          frame.filename = filename.replace(/\\/g, '/');
        }
        return frame;
      }
    }),
    httpIntegration({
      breadcrumbs: false,
      disableIncomingRequestSpans: true,
      ignoreOutgoingRequests: (url) => {
        if (['https://gateway.discord.gg'].includes(new URL(url).origin)) {
          return true;
        }
        return false;
      }
    })
  ]
};

/** Usually already done by the `--import` preload (instrument.ts), which Mongo spans need. */
const sentry = () => {
  if (process.env.SENTRY_DSN && !Sentry.isInitialized()) {
    Sentry.init(sentryConfig);
  }
};

export default sentry;
