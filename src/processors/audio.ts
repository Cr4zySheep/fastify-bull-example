import { AppJobProcessor } from "src/services";
import { AudioJob } from "src/queues";

export const acquireAudioProcessor: AppJobProcessor<AudioJob> = (
  services
) => async (job) => {
  console.log(services);

  console.log("Start processing ...", job.name);
  console.log(job.data);
  console.log("End processing");
};
