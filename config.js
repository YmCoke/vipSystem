const fs = require("fs");

const globalConfig = {};
const arr = fs.readFileSync("./server.config").toString().split("\n");

for (let i = 0;i < arr.length; i++) {
    let temp = arr[i].trim().split("=");
    if (temp.length === 2) {
        globalConfig[temp[0]] = temp[1];
    }
}

module.exports = globalConfig;