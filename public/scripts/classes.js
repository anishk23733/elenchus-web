var db = firebase.firestore();
function getUserName() {
	return firebase.auth().currentUser.displayName;
}
String.prototype.replaceAll = function(search, replacement) {
	var target = this;
	return target.replace(new RegExp(search, "g"), replacement);
};

let createButton = document.querySelector(".createClassButton");
createButton.addEventListener("click", event => {
	event.preventDefault();
	document.getElementById("modal2").style.display = "none";
	var classesRef = db.collection("classes");
	let classCode = document
		.getElementById("classname")
		.value.toLowerCase()
		.replaceAll(" ", "_");

	classesRef.doc(classCode).set({
		class: document.getElementById("classname").value,
		joincode: document.getElementById("joincode").value
	});

	var usersRef = db.collection("users");
	let usernameData = getUserName()
		.toLowerCase()
		.replaceAll(" ", "_");
	var docRef = db.collection("users").doc(usernameData);
	let joinedClasses = [];
	docRef
		.get()
		.then(function(doc) {
			if (!doc.exists) {
				db.collection("users")
					.doc(usernameData)
					.set({ name: getUserName() });
			}
			if (doc.exists) {
				console.log("Document data:", doc.data());
				if (doc.data().joinedClasses == undefined) {
					console.log(classCode);
					docRef.set({
						name: getUserName(),
						joinedClasses: [classCode]
					});
				} else {
					joinedClasses = doc.data().joinedClasses;
					joinedClasses.push(classCode);
					docRef.set({
						name: getUserName(),
						joinedClasses: joinedClasses
					});
				}
				document.getElementById("classname").value = "";
				document.getElementById("joincode").value = "";
				clearTable();
				createClassesTable();
			} else {
				// doc.data() will be undefined in this case
				console.log("No such document!");
			}
		})
		.catch(function(error) {
			console.log("Error getting document:", error);
		});
});

let clearTable = () => {
	document.getElementById("table").innerHTML = "";
};

let createClassesTable = () => {
	setTimeout(() => {
		let usernameData = getUserName()
			.toLowerCase()
			.replaceAll(" ", "_");

		var docRef = db.collection("users").doc(usernameData);

		let joinedClasses = [];
		docRef
			.get()
			.then(function(doc) {
				if (doc.exists) {
					joinedClasses = doc.data().joinedClasses;
					// console.log("Joined classes:", joinedClasses);
					for (let i in joinedClasses) {
						db.collection("classes")
							.doc(joinedClasses[i])
							.get()
							.then(doc => {
								document.getElementById(
									"table"
								).innerHTML += `<a href="#" class="classLink"><span class="class-card" id=${
									joinedClasses[i]
								}>${doc.data().class}</span></a>`;
								// console.log(doc.data().class);
							});
					}
					// console.log("Document data:", doc.data());
				} else {
					// doc.data() will be undefined in this case
					console.log("No such document!");
				}
			})
			.catch(function(error) {
				console.log("Error getting document:", error);
			});
	}, 1000);
};

function checkVariable() {
	if (firebase.auth().currentUser != null) {
		createClassesTable();
	}
}
window.onload = setTimeout(checkVariable, 2000);

let joinButton = document.querySelector(".joinClassButton");
joinButton.addEventListener("click", event => {
	event.preventDefault();
	let className = document.getElementById("joinClassname").value;
	let joinCode = document.getElementById("joincodeEnter").value;

	console.log(className, joinCode);
	let usernameData = getUserName()
		.toLowerCase()
		.replaceAll(" ", "_");

	var docRef = db.collection("users").doc(usernameData);

	let joinedClasses = [];
	var classesRef = db.collection("classes");
	let classCode = className.toLowerCase().replaceAll(" ", "_");
	db.collection("classes")
		.get()
		.then(function(querySnapshot) {
			querySnapshot.forEach(function(doc) {
				// doc.data() is never undefined for query doc snapshots
				// console.log(doc.data().class, className);
				// console.log(doc.data().joincode, joinCode);
				let singleSuccess = false;
				if (
					doc.data().class == className &&
					doc.data().joincode == joinCode
				) {
					console.log("successful!");
					singleSuccess = true;
				} else {
					console.log("unsuccessful");
				}

				if (singleSuccess) {
					docRef.get().then(function(doc) {
						if (!doc.exists) {
							db.collection("users")
								.doc(usernameData)
								.set({
									name: getUserName()
								});
						}
						if (doc.exists) {
							console.log("Document data:", doc.data());
							if (doc.data().joinedClasses == undefined) {
								console.log(classCode);
								docRef.set({
									name: getUserName(),
									joinedClasses: [classCode]
								});
							} else {
								joinedClasses = doc.data().joinedClasses;
								joinedClasses.push(classCode);
								docRef.set({
									name: getUserName(),
									joinedClasses: joinedClasses
								});
							}
							document.getElementById("classname").value = "";
							document.getElementById("joincode").value = "";
						} else {
							// doc.data() will be undefined in this case
							console.log("No such document!");
						}
					});
				} else {
					console.log("Class does not exist");
				}
			});
		});
	clearTable();
	createClassesTable();
});

window.onload = setTimeout(() => {
	let allAElements = document.querySelectorAll("a");
	allAElements.forEach(element => {
		element.addEventListener("click", () => {
			window.location.href = `../classboard.html?id=${
				element.firstChild.id
			}`;
		});
	});
}, 5000);
