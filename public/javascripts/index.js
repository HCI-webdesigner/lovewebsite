window.onload = function() {
	var newDom = document.getElementById("new-info");
	var inter=setInterval(function() {
		var fromFirstChild = newDom.removeChild(newDom.firstChild);
		newDom.appendChild(fromFirstChild);
	}, 1500);
}