function checkNonEmpty(inputField) {
	if(inputField.value.length == 0) {
		if(inputField.name=="password"){
			document.getElementById('errorMessage').innerHTML="密码不能为空！";
		}
		return false;
	}
	else {
		return true;
	}
}

function checkEmail(inputField) {
	if(inputField.value==""){
		document.getElementById('errorMessage').innerHTML="邮箱不能为空！";
	}else if(!(/^[\w\.-_\+]+@[\w-]+(\.\w{2,4})+$/.test(inputField.value))) {
		document.getElementById('errorMessage').innerHTML = "邮箱格式错误！";
	}
}

function loginCheck(form) {
	if(checkNonEmpty(form['email']) &&checkNonEmpty(form['password'])) {
		return true;
	}
	else {
		return false;
	}
}