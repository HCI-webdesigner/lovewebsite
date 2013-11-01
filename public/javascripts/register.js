function checkNonEmpty(inputField) {
    if (inputField.value.length == 0) {
        return false;
    } else {
        return true;
    }
}

function validateLength(inputField) {
    if (inputField.value.length < 12) {
        return false;
    } else {
        return true;
    }
}

function validateRegEx(regex, inputStr) {
    if (!regex.test(inputStr)) {
        return false;
    } else {
        return true;
    }
}

function validateUserId(inputField) {
    return validateRegEx(/^\d{12}$/, inputField.value);
}

function validateEmail(inputField) {
    return validateRegEx(/^[\w\.-_\+]+@[\w-]+(\.\w{2,4})+$/, inputField.value);
}

function validatePhone(inputField) {
    return validateRegEx(/^\d{11}$/, inputField.value);
}

function validatePassword(inputField) {
    if (inputField.value.length < 6) {
        return false;
    } else {
        return true;
    }
}

function validatePass(inputField) {
    if (inputField.value == document.getElementById('password').value) {
        return true;
    } else {
        document.getElementById('confirm-tips').innerHTML = "密码错误";
        return false;
    }
}

function checkUserId(inputField) {
    if (checkNonEmpty(inputField)) {
        if (validateLength(inputField)) {
            if (validateUserId(inputField)) {
                document.getElementById('userid-tips').innerHTML = "";
                return true;
            } else {
                document.getElementById('userid-tips').innerHTML = "请输入12位数字";
                return false;
            }
        } else {
            document.getElementById('userid-tips').innerHTML = "最小长度为12位";
            return false;
        }
    } else {
        document.getElementById('userid-tips').innerHTML = "学号不能为空";
        return false;
    }
}

function checkName(inputField) {
    if (checkNonEmpty(inputField)) {
        document.getElementById('name-tips').innerHTML = "";
        return true;
    } else {
        document.getElementById('name-tips').innerHTML = "姓名不能为空";
        return false;
    }
}

function checkEmail(inputField) {
    if (checkNonEmpty(inputField)) {
        if (validateEmail(inputField)) {
            document.getElementById('email-tips').innerHTML = "";
            return true;
        } else {
            document.getElementById('email-tips').innerHTML = "邮箱地址有误";
            return false;
        }
    } else {
        document.getElementById('email-tips').innerHTML = "邮箱不能为空";
        return false;
    }
}

function checkPhone(inputField) {
    if (checkNonEmpty(inputField)) {
        if (validatePhone(inputField)) {
            document.getElementById('phone-tips').innerHTML = "";
            return true;
        } else {
            document.getElementById('phone-tips').innerHTML = "手机号码有误";
            return false;
        }
    } else {
        document.getElementById('phone-tips').innerHTML = "手机号码不能为空";
        return false;
    }
}

function checkPassword(inputField) {
    if (checkNonEmpty(inputField)) {
        if (validatePassword(inputField)) {
            document.getElementById('password-tips').innerHTML = "";
            return true;
        } else {
            document.getElementById('password-tips').innerHTML = "密码长度至少为6位";
            return false;
        }
    } else {
        document.getElementById('password-tips').innerHTML = "密码不能为空";
        return false;
    }
}

function checkPass(inputField) {
    if (checkNonEmpty(inputField)) {
        if (validatePass(inputField)) {
            document.getElementById('confirm-tips').innerHTML = "";
            return true;
        } else {
            document.getElementById('confirm-tips').innerHTML = "两次密码不一致";
            return false;
        }
    } else {
        document.getElementById('confirm-tips').innerHTML = "密码不能为空";
        return false;
    }
}

function checkRegister(form) {
    if (checkUserId(form['userid']) && checkName(form['name']) &&
        checkEmail(form['email']) && checkPhone(form['phone']) &&
        checkPassword(form['password']) && checkPass(form['pass'])) {
        return true;
    } else {
        return false;
    }
}