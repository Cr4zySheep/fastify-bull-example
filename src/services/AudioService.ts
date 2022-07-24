import { Queue } from "bull";
import { AudioJob } from "../queues";

export class AudioService {
  queue;

  constructor(queue: Queue<AudioJob>) {
    this.queue = queue;
  }

  processAudio(name: string) {
    console.log("Creating job");
    this.queue.add({ name });
  }
}
