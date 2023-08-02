// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyASH0-0c5aat9FwQ_Q4bmsy5TU6m5epmys",
	authDomain: "crown-clothing-db-c3aac.firebaseapp.com",
	projectId: "crown-clothing-db-c3aac",
	storageBucket: "crown-clothing-db-c3aac.appspot.com",
	messagingSenderId: "494342950390",
	appId: "1:494342950390:web:16da9b3825500e1a128bd7",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({ prompt: "select_account" });

export const auth = getAuth();
export const signInWithGooglePopup = () =>
	signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
	signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalData) => {
	if (!userAuth) return;

	const userDocRef = doc(db, "users", userAuth.uid);

	const userSnap = await getDoc(userDocRef);

	if (!userSnap.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				...additionalData,
			});
		} catch (error) {
			console.log("error creating the user", error);
		}
	}

	return userDocRef;
};

export const createAuthUserWithEmailAndPasswordFromAuth = async (
	email,
	password
) => {
	if (!email || !password) return;
	try {
		const { user } = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		return user;
	} catch (error) {
		console.log(error);
	}
};

export const signInAuthUserWithEmailAndPasswordFromAuth = async (
	email,
	password
) => {
	if (!email || !password) return;
	try {
		const { user } = await signInWithEmailAndPassword(auth, email, password);
		return user;
	} catch (error) {
		console.log(error);
	}
};

export const signOutUser = async () => await signOut(auth);
