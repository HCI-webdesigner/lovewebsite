window.onload = function() {
	var infoDom = document.getElementById("new-info");
	var listDom = document.getElementById("new-list");
	var inter = setInterval(function() {
		var move = setInterval(function() {
			if (infoDom.scrollTop < 30) {
				infoDom.scrollTop += 3;
			} else {
				firstChildDom=listDom.getElementsByTagName("li")[0];
				listDom.appendChild(listDom.removeChild(firstChildDom));
				infoDom.scrollTop = 0;
				clearInterval(move);
			}
		}, 100);
	}, 3000);
}