import Bull from "bull";
import { AppServices, createAllServices } from "src/services";

import { acquireAudioProcessor } from "./audio";

export async function createWorker() {
  const services = await createAllServices();

  services.queues.audio.process(acquireAudioProcessor(services));
}
