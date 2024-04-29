import fs from "fs";
import http from "http";

const server = http.createServer();

server.on("request", (req, res) => {
  /**
   * 直接传输
   */
  // fs.readFile("./test-file.txt", "utf-8", (err, data) => {
  //   if (err) {
  //     console.log(err);
  //   }
  //   res.end(data);
  // });

  /**
   * 流传输（分块）
   */
  // const readable = fs.createReadStream("./test-file.txt");
  // readable.on("data", (chunk) => {
  //   res.write(chunk);
  // });
  // readable.on("end", () => res.end());
  // readable.on("error", (err) => {
  //   console.log(err);
  //   res.statusCode = 500;
  //   res.end("File not found!");
  // });

  // 使用 pipe() 方法更加简洁和方便，能够自动处理数据的传输和流量控制，而不使用 pipe() 方法则需要手动处理更多的细节。
  const readable = fs.createReadStream("./test-file.txt");
  readable.pipe(res);
});

server.listen(8000, "127.0.0.1", () => console.log("Listening to requests on port 8000"));
