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
		if (validate_required(previous) == false) {
			previous.focus();
			document.getElementById('errorMessage').innerHTML = "密码不能为空！";
			return false;
		}
		if (validate_required(newpass) == false) {
			newpass.focus();
			document.getElementById('errorMessage').innerHTML = "新密码不能为空！";
			return false;
		}
		if (validate_required(newpass2) == false) {
			newpass2.focus();
			document.getElementById('errorMessage').innerHTML = "确认密码不能为空！";
			return false;
		}
		if(newpass.value.trim()!=newpass2.value.trim()){
			newpass.value="";
			newpass2.value="";
			document.getElementById('errorMessage').innerHTML = "输入的两次密码不一致！";
			return false;
		}
	}
}