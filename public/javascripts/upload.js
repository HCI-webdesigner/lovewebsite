function checkComment(form) {
	content = form['content'];
	content.value = content.value.replace(/(^\s*)|(\s*$)/g, "");
	content.value = content.value.replace(/&/g, "&gt");
	content.value = content.value.replace(/</g, "&lt");
	content.value = content.value.replace(/>/g, "&gt");
	content.value = content.value.replace(/ /g, "&nbsp");
	content.value = content.value.replace(/\'/g, "&#39");
	content.value = content.value.replace(/\"/g, "&quot");
	content.value = content.value.replace(/\n/g, "<br>");
	if(content.value.length == 0) {
		document.getElementById('errorMessage').innerHTML = '请输入内容';
		return false;
	}
	else {
		return true;
	}
}