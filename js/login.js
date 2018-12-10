var LOGIN_API = 'https://2-dot-backup-server-002.appspot.com/_api/v2/members/authentication'
var btnLogin = document.forms['myform']['btn-login'];

if (btnLogin != null) {
    btnLogin.onclick = function () {
        if (validateForm()) {
            //     // Gửi dữ liệu đi.
            doLogin();
        }
    }
}
function doLogin() {
    var pwdPassword = document.forms['myform']['password'];
    var txtEmail = document.forms['myform']['email'];
    var jsLog = {
        password: pwdPassword.value,
        email: txtEmail.value,
    }
    var jsonDataLogin = JSON.stringify(jsLog);
    postLoginData(jsonDataLogin);

    function postLoginData(jsonDataLogin) {
        var xmlHttpRequest = new XMLHttpRequest();
        xmlHttpRequest.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 201) {
                var member = JSON.parse(this.responseText);
                alert("token:" + member.token);
                localStorage.setItem('token-key', member.token);
            }
        }
        xmlHttpRequest.open('POST', LOGIN_API, true);
        xmlHttpRequest.setRequestHeader("Content-type", "application/json");
        xmlHttpRequest.send(jsonDataLogin);
    }
}

// Kiểm tra dữ liệu người dùng trước khi gửi đi.
// Trả về true hoặc false.
function validateForm() {
    // Lưu trữ trạng thái validate của cả form.
    var isValid = true;
    var isValidPassword = true;

    var pwdPassword = document.forms['myform']['password'];
    var msgPassword = pwdPassword.nextElementSibling;
    if (pwdPassword.value == null || pwdPassword.value.length == 0) {
        msgPassword.classList.remove('msg-success');
        msgPassword.classList.add('msg-error');
        msgPassword.innerHTML = 'Password is required!';
        isValidPassword = false;
    } else {
        msgPassword.classList.remove('msg-error');
        msgPassword.classList.add('msg-success');
        msgPassword.innerHTML = 'Ok.';
    }

    isValid = isValidPassword;
    return isValid;
}