/**
 * =====================================================================
 *
 * 处理文件
 *
 * =====================================================================
 */
import fs from "fs";

// 读取文件（同步）
const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(textIn);

// 写入文件（同步）
const textOut = `This is what we know about the avocado: ${textIn}.\nCteated on ${Date.now}`;
fs.writeFileSync("./txt/output.txt", textOut);

// 读取 / 写入文件（异步）
fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
    if (err) {
        console.log("ERROR !!!");
        return;
    }

    console.log(data1);

    fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
        console.log(data2);

        fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
            console.log(data3);

            fs.writeFile(
                "./txt/final.txt",
                `${data2}\n${data3}`,
                "utf-8",
                (err) => {
                    console.log("Your file has been written !");
                }
            );
        });
    });
});

/**
 * =====================================================================
 *
 * 网络请求
 *
 * =====================================================================
 */
import http from "http";
import { fileURLToPath } from "url";
import { dirname } from "path";

// 获取当前工程绝对路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 静态资源可以先获取放入内存方便后面使用
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

// 创建 server
const server = http.createServer((req, res) => {
    console.log(req.url);
    // ” / “ 为根目录，” /favicon.ico “ 为浏览器图网页 Tab 栏图标（每次跳转都会获取）。
    // /
    // /favicon.ico

    const pathName = req.url;

    // 配置路由
    if (pathName === "/" || pathName === "/overview") {
        res.end("This is the OVERVIEW");
    } else if (pathName === "/product") {
        res.end("This is the PRODUCT");
    } else if (pathName === "/api") {
        res.writeHead(200, {
            "Content-Type": "application/json",
        });
        res.end(data);
    } else {
        res.writeHead(404, {
            "Content-Type": "text/html",
            "My-Own-Header": "hello-world",
        });
        res.end("<h1>Page not found!</h1>");
    }
});

// 开启 server 并监听
server.listen(8000, "127.0.0.1", () => {
    console.log("Listening to requests on port 8000");
});
