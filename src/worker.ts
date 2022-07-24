import { createWorker } from "./processors";

async function start() {
  try {
    await createWorker();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

start();
