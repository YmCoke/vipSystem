const express = require("express");
const multer = require("multer");
const cookie = require("cookie-parser");
const globalConfig = require("./config.js");
const loader = require("./loader.js");

const app = new express();

app.use(express.static("./" + globalConfig["page_path"]));
app.use(cookie());

const uploadSingle = multer({
    dest: './file/',
})

app.post('/sendMsg', uploadSingle.single("photo"), loader.get("/insertUserMsg"));


app.listen(10086, function () {
    console.log("server is running in 10086");
})
