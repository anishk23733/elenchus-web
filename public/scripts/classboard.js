var urlParams = new URLSearchParams(location.search);
let id = urlParams.get("id");
var db = firebase.firestore();
function getUserName() {
	return firebase.auth().currentUser.displayName;
}
db.collection("classes")
	.doc(id)
	.get()
	.then(doc => {
		document.querySelector(".Title").innerHTML = doc.data().class;

		// console.log(doc.data().class);
	});

function getProfilePicUrl() {
	return (
		firebase.auth().currentUser.photoURL ||
		"/images/profile_placeholder.png"
	);
}
window.onload = setTimeout(() => {
	document.querySelector(".username").innerHTML = getUserName();
	document.querySelector(
		".profile-pic"
	).innerHTML = `<img src="${getProfilePicUrl()}" height="42" width="42">
`;
}, 2000);

db.collection("users")
	.get()
	.then(querySnapshot => {
		querySnapshot.forEach(element => {
			console.log(element);
		});
	});

let goToWelcome = () => {
	window.location.href = `../classboard.html?id=${id}`;
};
let goToDiscussion = () => {
	window.location.href = `../message.html?id=${id}`;
};
let goToCalendar = () => {
	window.location.href = `../calendar.html?id=${id}`;
};
let goToHWHelp = () => {
	window.location.href = `../hwhelp.html?id=${id}`;
};
document.getElementById("discussion").addEventListener("click", event => {
	event.preventDefault();
	goToDiscussion();
});
document.getElementById("calendar").addEventListener("click", event => {
	event.preventDefault();
	goToCalendar();
});
document.getElementById("welcome").addEventListener("click", event => {
	event.preventDefault();
	goToWelcome();
});
document.getElementById("hwhelp").addEventListener("click", event => {
	event.preventDefault();
	goToHWHelp();
});
