const opentelemetry = require("@opentelemetry/api");
const { PgInstrumentation } = require("@opentelemetry/instrumentation-pg");
const {
  RedisInstrumentation,
} = require("@opentelemetry/instrumentation-redis");
const { BatchSpanProcessor } = require("@opentelemetry/sdk-trace-base");
const { NodeTracerProvider } = require("@opentelemetry/sdk-trace-node");
const {
  OTLPTraceExporter,
} = require("@opentelemetry/exporter-trace-otlp-grpc");
const { AWSXRayPropagator } = require("@opentelemetry/propagator-aws-xray");
const { AWSXRayIdGenerator } = require("@opentelemetry/id-generator-aws-xray");
const { HttpInstrumentation } = require("@opentelemetry/instrumentation-http");
const {
  ExpressInstrumentation,
} = require("@opentelemetry/instrumentation-express");
const {
  FastifyInstrumentation,
} = require("@opentelemetry/instrumentation-fastify");
const { PinoInstrumentation } = require("@opentelemetry/instrumentation-pino");
const {
  GraphQLInstrumentation,
} = require("@opentelemetry/instrumentation-graphql");

const { Resource } = require("@opentelemetry/resources");
const {
  SemanticResourceAttributes,
} = require("@opentelemetry/semantic-conventions");
const {
  AwsInstrumentation,
} = require("@opentelemetry/instrumentation-aws-sdk");

module.exports = (options = {}) => {
  const serviceName = options.serviceName || "UNKNOWN_SERVICE";
  const instrumentationsArray = loadInstrumentationPlugins(options);

  const tracerProvider = new NodeTracerProvider({
    resource: Resource.default().merge(
      new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: serviceName,
      })
    ),
    idGenerator: new AWSXRayIdGenerator(),
    instrumentations: instrumentationsArray,
  });

  const otlpExporter = new OTLPTraceExporter({
    serviceName,
    url: "localhost:4317",
  });

  tracerProvider.addSpanProcessor(new BatchSpanProcessor(otlpExporter));

  tracerProvider.register({
    propagator: new AWSXRayPropagator(),
  });

  return opentelemetry.trace.getTracer(serviceName);
};

const loadInstrumentationPlugins = (options) => {
  const INSTRUMENT_EXPRESS = options.expressInstrumentationOptions || false;
  const INSTRUMENT_FASTIFY = options.fastifyInstrumentationOptions || false;
  const INSTRUMENT_PG = options.pgInstrumentationOptions || false;
  const INSTRUMENT_PINO = options.pinoInstrumentationOptions || false;
  const INSTRUMENT_GRAPHQL = options.graphQlInstrumentationOptions || false;
  const INSTRUMENT_REDIS = options.redisInstrumentationOptions || false;

  const instrumentations = [
    new HttpInstrumentation(),
    new AwsInstrumentation(),
  ];

  if (INSTRUMENT_EXPRESS && typeof INSTRUMENT_EXPRESS === "object") {
    instrumentations.push(new ExpressInstrumentation(INSTRUMENT_EXPRESS));
  }
  if (INSTRUMENT_FASTIFY && typeof INSTRUMENT_FASTIFY === "object") {
    instrumentations.push(new FastifyInstrumentation(INSTRUMENT_FASTIFY));
  }
  if (INSTRUMENT_GRAPHQL && typeof INSTRUMENT_GRAPHQL === "object") {
    instrumentations.push(new GraphQLInstrumentation(INSTRUMENT_GRAPHQL));
  }
  if (INSTRUMENT_PG && typeof INSTRUMENT_PG === "object") {
    instrumentations.push(new PgInstrumentation(INSTRUMENT_PG));
  }
  if (INSTRUMENT_REDIS && typeof INSTRUMENT_REDIS === "object") {
    instrumentations.push(new RedisInstrumentation(INSTRUMENT_REDIS));
  }
  if (INSTRUMENT_PINO && typeof INSTRUMENT_PINO === "object") {
    instrumentations.push(new PinoInstrumentation(INSTRUMENT_PINO));
  }

  return instrumentations;
};
