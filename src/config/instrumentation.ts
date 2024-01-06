import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { Resource } from '@opentelemetry/resources';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { Span } from '@opentelemetry/api';
import { Request, Response } from 'express';

import { name, version } from 'package.json';

const sdk = new NodeSDK({
  metricReader: new PrometheusExporter({
    port: 9464, // optional - default is 9464
    prefix: 'api_arv',
  }),
  traceExporter: new OTLPTraceExporter({
    // optional - default url is http://localhost:4318/v1/traces
    url: 'http://tempo:4318/v1/traces',
    headers: {},
  }),
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: name,
    [SemanticResourceAttributes.SERVICE_NAMESPACE]: process.env.NODE_ENV,
    [SemanticResourceAttributes.SERVICE_VERSION]: version,
    [SemanticResourceAttributes.SERVICE_INSTANCE_ID]: process.pid,
  }),
  instrumentations: [
    getNodeAutoInstrumentations({
      '@opentelemetry/instrumentation-fs': { enabled: false },
      '@opentelemetry/instrumentation-pg': {
        enabled: true,
        enhancedDatabaseReporting: true,
      },
      '@opentelemetry/instrumentation-net': { enabled: false },
      '@opentelemetry/instrumentation-http': {
        enabled: true,
        ignoreIncomingRequestHook(req) {
          // Remove paths desnecessários para instrumentação
          return (
            '/swagger-stats/metrics'.includes(req.url) ||
            '/metrics'.includes(req.url) ||
            'health-check'.includes(req.url) ||
            req.method === 'OPTIONS'
          );
        },
        applyCustomAttributesOnSpan: (
          span: Span,
          request: Request,
          response: Response,
        ) => {
          // Apenas para chamadas com erro, para otimizar a qtd de dados nos traces
          if (response.statusCode >= 500 || response.statusCode === 400) {
            if (Object.keys(request.body).length) {
              span.setAttribute(
                'http.request_body',
                JSON.stringify(request.body),
              );
            }

            if (request.query) {
              span.setAttribute(
                'http.query_string',
                JSON.stringify(request.query),
              );
            }
          }
          span.setAttribute(
            'http.authorization',
            request.headers['authorization'],
          );
        },
      },
      '@opentelemetry/instrumentation-redis': { enabled: false },
      '@opentelemetry/instrumentation-nestjs-core': {
        enabled: true,
      },
      '@opentelemetry/instrumentation-express': {
        enabled: true,
      },
    }),
  ],
});
sdk.start();
