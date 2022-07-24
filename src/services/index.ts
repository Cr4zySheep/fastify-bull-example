import "fastify";
import { createQueues } from "../queues";
import { AsyncReturnType } from "src/utils";
import { AudioService } from "./AudioService";
import Bull from "bull";

export async function createAllServices() {
  const queues = createQueues();

  return {
    queues,
    audioService: new AudioService(queues.audio),
  };
}

export type AppServices = AsyncReturnType<typeof createAllServices>;

export type AppJobProcessor<T> = (
  services: AppServices
) => Bull.ProcessPromiseFunction<T>;

declare module "fastify" {
  interface FastifyInstance {
    services: AppServices;
  }

  interface FastifyRequest {
    services: AppServices;
  }

  interface FastifyReply {
    services: AppServices;
  }
}
