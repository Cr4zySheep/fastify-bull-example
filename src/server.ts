import { BullMonitorFastify } from "@bull-monitor/fastify";
import { BullAdapter } from "@bull-monitor/root/dist/bull-adapter";
import { fastify } from "fastify";
import pino from "pino";
import { createAllServices } from "./services";
import { PORT } from "./settings";

async function createServer() {
  const server = fastify({
    logger: pino({ level: "info" }),
  });

  const services = await createAllServices();
  server.decorate("services", services);

  // TODO: Is this useful?
  server.addHook("onRequest", (request, reply, done) => {
    request.services = services;
    reply.services = services;

    done();
  });

  const monitor = new BullMonitorFastify({
    queues: Object.values(services.queues).map(
      (queue) => new BullAdapter(queue)
    ),
    // enables graphql introspection query. false by default if NODE_ENV == production, true otherwise
    // gqlIntrospection: true,
    baseUrl: "/bull",
    // enable metrics collector. false by default
    // metrics are persisted into redis as a list
    // with keys in format "bull_monitor::metrics::{{queue}}"
    // metrics: {
    // collect metrics every X
    // where X is any value supported by https://github.com/kibertoad/toad-scheduler
    // collectInterval: { hours: 1 },
    // maxMetrics: 100,
    // disable metrics for specific queues
    //   blacklist: ["1"],
    // },
  });
  await monitor.init({ app: server });
  await server.register(monitor.plugin);

  return server;
}

async function start() {
  const server = await createServer();
  try {
    await server.listen({ port: PORT });
    console.log("Server started successfully");
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
}

start();
