var joinModal = document.getElementById("modal");
var joinBtn = document.getElementById("joinClassBtn");
var span = document.getElementsByClassName("close")[0];
joinBtn.onclick = function() {
	joinModal.style.display = "block";
};
span.onclick = function() {
	joinModal.style.display = "none";
};
window.onclick = function(event) {
	if (event.target == joinModal) {
		joinModal.style.display = "none";
	}
};
var createModal = document.getElementById("modal2");
var createBtn = document.getElementById("createClassBtn");
var span2 = document.getElementsByClassName("close")[1];
createBtn.onclick = function() {
	createModal.style.display = "block";
};
span2.onclick = function() {
	createModal.style.display = "none";
};
window.onclick = function(event) {
	if (event.target == createModal) {
		createModal.style.display = "none";
	}
};
