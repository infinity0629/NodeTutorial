import fs from "fs";
import crypto from "crypto";

const start = Date.now();

/**
 * 线程池默认有 4 个线程。（但是实际情况也不一定，大多数时候还是会根据 cpu 的核心来确定，通常一个 cpu 核心有 2 个线程）
 *
 * 将线程池的大小限制为 1，就意味着所有的计算都将在同一个线程上进行，这可能会导致性能下降，特别是在多核处理器上。
 */
process.env.UV_THREADPOOL_SIZE = 1;

setTimeout(() => console.log("Timer 1 finished"), 0);
setImmediate(() => console.log("Immediate 1 finished"));

fs.readFile("./test-file.txt", () => {
  console.log("I/O finished");
  console.log("-----------------------------------");

  setTimeout(() => console.log("Timer 2 finished"), 0);
  setTimeout(() => console.log("Timer 3 finished"), 3000);
  setImmediate(() => console.log("Immediate 2 finished"));

  /**
   * 在当前事件循环的尾部触发一个回调函数。调用时机比 setTimeout() 和 setImmediate() 更早，会在当前事件循环的末尾，下一个事件之前执行，而不是等待新的事件轮询。
   *
   * 具体来说，process.nextTick()中的回调会在当前代码执行完成后、事件循环的下一个阶段开始之前被调用。这意味着它会在I/O事件、定时器等待之前执行，
   * 因此它可以被用于确保某些操作在事件循环的下一个阶段之前执行，以避免阻塞I/O或者其他异步操作。
   */
  process.nextTick(() => console.log("Process.nextTick"));

  crypto.pbkdf2("password", crypto.randomBytes(16), 100000, 1024, "sha512", () => {
    console.log(`${Date.now() - start} Password encrypted`);
  });
  crypto.pbkdf2("password", crypto.randomBytes(16), 100000, 1024, "sha512", () => {
    console.log(`${Date.now() - start} Password encrypted`);
  });
  crypto.pbkdf2("password", crypto.randomBytes(16), 100000, 1024, "sha512", () => {
    console.log(`${Date.now() - start} Password encrypted`);
  });
  crypto.pbkdf2("password", crypto.randomBytes(16), 100000, 1024, "sha512", () => {
    console.log(`${Date.now() - start} Password encrypted`);
  });
});

console.log("Hello from the top-level code");
