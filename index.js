const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  // Fork workers for each core
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Listen for worker online event
  cluster.on('online', (worker) => {
    console.log(`Worker ${worker.process.pid} is online`);
  });

  // Listen for exit event
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  // Create a simple HTTP server
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('Hello, I am a worker!');
  }).listen(8000);
}
