import * as Sentry from '@sentry/node';
import { NodeOptions, httpIntegration, rewriteFramesIntegration } from '@sentry/node';

export const sentryConfig: NodeOptions = {
  dsn: process.env.SENTRY_DSN,
  serverName: process.env.SERVICE_NAME ?? 'clashperk_bot',
  environment: process.env.NODE_ENV ?? 'development',
  release: process.env.GIT_SHA,

  // Only command executions are traced; every other root span (DB, HTTP) would be recorded and then dropped.
  tracesSampler: ({ attributes }) => (attributes?.['interaction.command'] ? 1 : 0),
  sendDefaultPii: true,

  ignoreSpans: [{ op: /^(?!command_executed)/ }],

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

const sentry = () => {
  if (process.env.SENTRY_DSN) {
    Sentry.init(sentryConfig);
  }
};

export default sentry;
