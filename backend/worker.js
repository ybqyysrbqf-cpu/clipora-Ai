console.log("Clipora AI Worker starting...");

async function startWorker() {
  console.log("Clipora AI Worker is ready.");

  while (true) {
    // Processing queue will be connected here.
    await new Promise(resolve => setTimeout(resolve, 5000));
  }
}

startWorker().catch(error => {
  console.error("Worker error:", error);
  process.exit(1);
});
