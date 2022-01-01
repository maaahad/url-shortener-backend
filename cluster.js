const cluster = require("cluster");
const os = require("os");
const startServer = require("./server");
const { credentials } = require("./config");

function startWorker() {
  const worker = cluster.fork();
  console.log(`[CLUSTER] : Worker ${worker.id} has started`);
}

if (cluster.isMaster) {
  os.cpus().forEach(startWorker);

  //   if any worker is disconected, we will wait for exit event to spawn another worker
  //   to replace the disconnected worker
  cluster.on("disconnect", (worker) =>
    console.log(`[CLUSTER] : Worker ${worker.id} has disconneted.`)
  );

  console.log("exit", (worker, code, signal) => {
    console.log(
      `[CLUSTER] : Worker ${worker.id} died with exit code ${code} ${signal}`
    );
    startWorker();
  });
} else {
  // App server is run by worker
  startServer(credentials.site.port);
}
