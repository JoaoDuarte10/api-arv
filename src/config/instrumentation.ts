import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { Resource } from '@opentelemetry/resources';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { TypeormInstrumentation } from 'opentelemetry-instrumentation-typeorm';

import { name, version } from 'package.json';

const sdk = new NodeSDK({
  metricReader: new PrometheusExporter({
    port: 9464, // optional - default is 9464
    prefix: 'core',
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
      '@opentelemetry/instrumentation-pg': { enabled: true },
    }),
    new TypeormInstrumentation(),
  ],
});
sdk.start();
