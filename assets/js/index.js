function Form(form) {
    this.init(form);
}

Form.prototype.init = function (form) {
    this.dom = form;
    this.formData = new FormData();
}

Form.prototype.sendMsg = function () {
    const sendData = this._getData();
    console.log(sendData);
    if (this.userData.password !== this.userData.repassword) {
        alert("密码不一致, 请重新输入");
    } else {
        // 发送ajax

        const xhr = new XMLHttpRequest();
        xhr.open('post', '/sendMsg', true);
        xhr.send(sendData);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                console.log(xhr.responseText);
                if (xhr.responseText == "success") {
                    alert("注册成功");
                }
            }
        }
    }

}

Form.prototype._getData = function () {
    const data = _serialize(this.dom);
    this.userData = data;
    console.log(data);
    for (let prop in data) {
        this.formData.append(prop, data[prop]);
    }
    return this.formData;
}

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