const fs = require("fs");
const globalConfig = require('./config.js');

const files = fs.readdirSync('./' + globalConfig["web_path"]);
const collectSet = [];
const path = new Map();

for (let i = 0;i < files.length; i++) {
    let temp = require("./" + globalConfig["web_path"] + "/" + files[i]);
    if (temp.path) {
        for (let [k,v] of temp.path) {
            if (!path.get(k)) {
                path.set(k, v);
            } else {
                throw new Error("url异常, 对应多个方法 -- " + k);
            }
        }
        collectSet.push(temp.path);
    }
}

module.exports = path;