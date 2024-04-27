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

/**
 * 读取 / 写入文件（异步）
 */
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
