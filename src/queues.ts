import Queue from "bull";
import { REDIS_HOST } from "src/settings";

export interface AudioJob {
  name: string;
}

export function createQueues() {
  return {
    audio: new Queue<AudioJob>("audio", REDIS_HOST),
  };
}

export type AppQueues = ReturnType<typeof createQueues>;
