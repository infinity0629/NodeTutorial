import fs from "fs";

/**
 * 读取文件（同步）
 */
const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(textIn);

/**
 * 写入文件（同步）
 */
const textOut = `This is what we know about the avocado: ${textIn}.\nCteated on ${Date.now}`;
fs.writeFileSync("./txt/output.txt", textOut);
