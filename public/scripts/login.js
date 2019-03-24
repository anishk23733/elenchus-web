/**
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

// Signs-in Friendly Chat.
function signIn() {
	// Sign in Firebase using popup auth and Google as the identity provider.
	var provider = new firebase.auth.GoogleAuthProvider();
	firebase.auth().signInWithPopup(provider);
}
// Signs-out of Friendly Chat.
function signOut() {
	// Sign out of Firebase.
	firebase.auth().signOut();
}

// Initiate firebase auth.
function initFirebaseAuth() {
	// Listen to auth state changes.
	firebase.auth().onAuthStateChanged(authStateObserver);
}

// Returns the signed-in user's display name.
function getUserName() {
	return firebase.auth().currentUser.displayName;
}
// Returns true if a user is signed-in.
function isUserSignedIn() {
	return !!firebase.auth().currentUser;
}

// Triggers when the auth state change for instance when the user signs-in or signs-out.
function authStateObserver(user) {
	if (user) {
		// User is signed in!
		// Get the signed-in user's profile pic and name.
		var userName = getUserName();
		// document.querySelector(".sign-in-box").innerHTML = "";

		// Hide sign-in button.
		signInButtonElement.setAttribute("hidden", "true");
		var db = firebase.firestore();
		let usernameData = getUserName()
			.toLowerCase()
			.replace(" ", "_");
		var docRef = db.collection("users").doc(usernameData);
		window.location.href = "./dashboard.html";
	} else {
		signInButtonElement.removeAttribute("hidden");
		document.querySelector(".username").innerHTML = "";
	}
}

var signInButtonElement = document.getElementById("sign-in");
signInButtonElement.addEventListener("click", signIn);

// Checks that the Firebase SDK has been correctly setup and configured.
function checkSetup() {
	if (
		!window.firebase ||
		!(firebase.app instanceof Function) ||
		!firebase.app().options
	) {
		window.alert(
			"You have not configured and imported the Firebase SDK. " +
				"Make sure you go through the codelab setup instructions and make " +
				"sure you are running the codelab using `firebase serve`"
		);
	}
}

// Checks that Firebase has been imported.
checkSetup();
initFirebaseAuth();

var firestore = firebase.firestore();
var settings = { timestampsInSnapshots: true };
firestore.settings(settings);
