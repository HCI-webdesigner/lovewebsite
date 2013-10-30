function checkNonEmpty(inputField) {
	if(inputField.value.length == 0) {
		return false;
	}
	else {
		return true;
	}
}

function checkTitle(inputField) {
	inputField.value = inputField.value.replace(/(^\s*)|(\s*$)/g, "");
	if(checkNonEmpty(inputField)) {
		return true;
	}
	else {
		document.getElementById('errorMessage').innerHTML="标题不能为空！";
		return false;
	}
}

function checkContent(inputField) {
	inputField.value = inputField.value.replace(/(^\s*)|(\s*$)/g, "");
	if(inputField.value == "输入您的求助信息，如说明你的个人情况等。") {
		return false;
	}
	else if(checkNonEmpty(inputField)) {
		return true;
	}
	else {
		document.getElementById('errorMessage').innerHTML = "求助内容不能为空！";
		return false;
	}
}

function checkPhoto(inputField) {
	if(checkNonEmpty(inputField)) {
		return true;
	}
	else {
		document.getElementById('errorMessage').innerHTML = "必需上传必要的材料,如图片等！";
		return false;
	}
}

function check_form(form) {
	if(checkTitle(form['title']) &&
		checkContent(form['content']) &&
		checkPhoto(form['file'])) {
		return true;
	}
	else {
		return false;
	}
}