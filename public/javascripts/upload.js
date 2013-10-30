function checkComment(form) {
	content = form['content'];
	content.value = content.value.replace(/(^\s*)|(\s*$)/g, "");
	content.value = content.value.replace(/<script.*?>.*?<\/script>/ig, "");
	if(content.value.length == 0) {
		document.getElementById('errorMessage').innerHTML = '请输入内容';
		return false;
	}
	else {
		return true;
	}
}