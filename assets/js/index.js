function Form(form) {
    this.init(form);
}

// 初始化数据
Form.prototype.init = function (form) {
    // 保存dom元素, 进行管理
    this.dom = form;
    // 设置提交的用户信息中必须要有的值
    this.mustMsg = ['username','password','repassword','gender','curCity', 'email'];
    // 将用户信息存放起来, 发送数据的 "包裹"
    this.formData = new FormData();
}

// 发送数据逻辑
Form.prototype.sendMsg = function () {
    // 获取页面上的表单数据
    this._getData();
    // 检查数据信息是否合格
    const checkMsg = this.checkMsg();
    if (checkMsg.status == 'error') {
        alert(checkMsg.msg);
    } else {
        console.log(this.userData);
        // 发送ajax
        _ajax.post('/sendMsg', this.formData, function (result) {
            if (result == 'success') {
                alert("注册成功");
                location.pathname = "/main.html";
            }
        })
    }
}

// 检查表单中的数据是否不合格
Form.prototype.checkMsg = function () {
    for (let i = 0;i < this.mustMsg.length; i++) {
        if (!this.userData[this.mustMsg[i]]) {
            return _util.getObj('error', '用户信息缺少' + this.mustMsg[i]);
        }
    }
    if (this.userData.password.length < 6) {
        return _util.getObj('error', '密码长度小于6个字符');
    }
    if (this.userData.password.length > 16) {
        return _util.getObj('error', '密码长度大于16个字符');
    }
    if (this.userData.password !== this.userData.repassword) {
        return _util.getObj('error', '密码不一致');
    }
    if (this.userData.email.indexOf("@") == -1) {
        return _util.getObj('error', '邮箱格式错误');
    }
    return _util.getObj('success', '用户信息完整');
}

// 获取页面上的表单数据
Form.prototype._getData = function () {
    this.userData = _serialize(this.dom);
    for (let prop in this.userData) {
        this.formData.append(prop, this.userData[prop]);
    }
}

// 深搜算法
function _serialize(root, data = {}) {
    if (!root || root.nodeType != 1) {
        return;
    }
    for (let i = 0; i < root.children.length; i++) {
        if (root.children[i].nodeType == 1) {
            if (root.children[i].nodeName == "INPUT" || root.children[i].nodeName == "TEXTAREA" || root.children[i].nodeName == 'SELECT') {
                if (root.children[i].getAttribute("type") == "radio") {
                    if (root.children[i].checked) {
                        data[root.children[i].getAttribute("name")] = root.children[i].value;
                    }
                } else if (root.children[i].getAttribute("type") == "checkbox") {
                    if (!data[root.children[i].getAttribute("name")]) {
                        data[root.children[i].getAttribute("name")] = [];
                    }
                    if (root.children[i].checked) {
                        data[root.children[i].getAttribute("name")].push(root.children[i].value);
                    }
                } else if (root.children[i].getAttribute("type") == "file") {
                    data[root.children[i].getAttribute("name")] = root.children[i].files[0];
                } else {
                    data[root.children[i].getAttribute("name")] = root.children[i].value;
                }
            }
            _serialize(root.children[i], data);
        }
    }
    return data;
}

// 工具方法:
var _util = {
    // 传入一个状态与信息参数, 返回对象形式.
    getObj: (status, msg) => ({status, msg})
}

// 封装ajax工具
var _ajax = {
    post (url, data, success) {
        const xhr = new XMLHttpRequest();
        xhr.open('post', url, true);
        xhr.send(data);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                success(xhr.responseText);
            }
        }
    }
}