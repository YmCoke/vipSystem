const path = new Map();
const submitDao = require("../dao/submitDao.js");
function insertUserMsg (request, response) {
    // username, password, gender, hobby, curcity, photodir, selfintro
    const body = request.body;
    console.log(body.username, body.password, body.email, body.gender, body.hobby, body.curCity, body.remark, request.file.filename);
    submitDao.insertUserMsg(body.username, body.password, body.email, body.gender, body.hobby, body.curCity, request.file.filename, body.remark, function (result) {
        console.log("数据插入数据库成功");
        response.writeHead(200);
        response.write("success");
        response.end();
    })
}

path.set('/insertUserMsg', insertUserMsg);

module.exports.path = path;