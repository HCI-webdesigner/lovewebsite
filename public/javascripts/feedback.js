function checkNonEmpty(inputField) {
	if(inputField.value.length == 0) {
		return false;
	}
	else {
		return true;
	}
}

function checkName(inputField) {
	inputField.value = inputField.value.replace(/(^\s*)|(\s*$)/g, "");
	if(checkNonEmpty(inputField)) {
		if(document.getElementById('errorMessage').innerHTML != null) {
			document.getElementById('errorMessage').innerHTML = "";
		}
		return true;
	}
	else {
		inputField.value = "";
		document.getElementById('errorMessage').innerHTML="姓名不能为空！";
		return false;
	}
}

function checkContent(inputField) {
	content = inputField;
	content.value = content.value.replace(/(^\s*)|(\s*$)/g, "");
	content.value = content.value.replace(/&/g, "&gt");
	content.value = content.value.replace(/</g, "&lt");
	content.value = content.value.replace(/>/g, "&gt");
	content.value = content.value.replace(/ /g, "&nbsp");
	content.value = content.value.replace(/\'/g, "&#39");
	content.value = content.value.replace(/\"/g, "&quot");
	content.value = content.value.replace(/\n/g, "<br>");
	if(content.value.length == 0) {
		content.value = "";
		document.getElementById('errorMessage').innerHTML = '请输入内容';
		return false;
	}
	else {
		return true;
	}
}

function checkContact(inputField) {
	inputField.value = inputField.value.replace(/(^\s*)|(\s*$)/g, "");
	if(checkNonEmpty(inputField)) {
		if(document.getElementById('errorMessage').innerHTML != null) {
			document.getElementById('errorMessage').innerHTML = "";
		}
		return true;
	}
	else {
		inputField.value = "";
		document.getElementById('errorMessage').innerHTML="联系方式不能为空！";
		return false;
	}
}
function check_form(form) {
	if(checkName(form['name']) &&
		checkContent(form['content']) &&
		checkContact(form['contact'])) {
		return true;
	}
	else {
		return false;
	}
}