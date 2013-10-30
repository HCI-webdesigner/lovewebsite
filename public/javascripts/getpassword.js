function validate_required(field) {
	with(field) {
		if (value == null || value == "") {
			return false;
		} else {
			return true;
		}
	}
}
function check_form(thisform) {
	with(thisform) {
		if (validate_required(email) == false) {
			email.focus();
			document.getElementById('errorMessage').innerHTML = "邮箱不能为空！";
			return false;
		}
		if (validate_required(code) == false) {
			code.focus();
			document.getElementById('errorMessage').innerHTML = "请输入验证码!";
			return false;
		}
	}
}