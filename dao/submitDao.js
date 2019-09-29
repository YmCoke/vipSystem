const dbUtil = require("./dbUtil.js");

function insertUserMsg (username, password, gender, hobby, curcity, photodir, selfintro, success) {
    const connection = dbUtil.createConnection();
    const insertSql = 'insert into vip (`username`, `password`, `gender`, `hobby`, `cur-city`, `photo-dir`, `self-intro`) values (?,?,?,?,?,?,?);';
    const params = [username, password, gender, hobby, curcity, photodir, selfintro]
    connection.connect();
    connection.query(insertSql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
        connection.end();
    })
}

module.exports = {
    insertUserMsg
}