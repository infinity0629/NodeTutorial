/**
 * EventEmitter
 */
import EventEmitter from "events";

// 自定义 EventEmitter
class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

// 可以直接使用，也可以使用自己自定义的 EventEmitter
// const myEmitter = new EventEmitter();
const myEmitter = new Sales();

myEmitter.on("newSale", () => {
  console.log("There was a new sale!");
});

myEmitter.on("newSale", () => {
  console.log("Costumer name: Jonas");
});

myEmitter.on("newSale", (stock) => console.log(`There are now ${stock} items left in stock.`));

myEmitter.emit("newSale", 9);

/**
 * http
 */

import http from "http";

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("Request received!");
  console.log(req.url);
  res.end("Request received !!!!!!!!");
});

server.on("request", (req, res) => {
  console.log("Anoter Request received");
});

server.on("close", (req, res) => {
  console.log("Server closed");
});

// setTimeout(() => server.close(), 3000);

server.listen(8000, "127.0.0.1", () => console.log("Listening to requests on port 8000"));
