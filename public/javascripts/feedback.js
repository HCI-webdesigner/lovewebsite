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
		if (validate_required(name) == false) {
			name.focus();
			document.getElementById('errorMessage').innerHTML = "姓名不能为空！";
			return false;
		}
		if (validate_required(content) == false) {
			content.focus();
			document.getElementById('errorMessage').innerHTML = "内容不能为空！";
			return false;
		}
		if (validate_required(contact) == false) {
			contact.focus();
			document.getElementById('errorMessage').innerHTML = "联系方式不能为空！";
			return false;
		}
	}
}