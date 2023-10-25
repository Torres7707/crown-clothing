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
	onAuthStateChanged,
	User,
	NextOrObserver,
} from "firebase/auth";

import {
	getFirestore,
	doc,
	getDoc,
	setDoc,
	collection,
	writeBatch,
	query,
	getDocs,
	QueryDocumentSnapshot,
} from "firebase/firestore";
import { Category } from "../../store/categories/categories.types";

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

// Export the auth and firestore libraries
const googleProvider = new GoogleAuthProvider();

// Always trigger the google popup whenever we use the google auth provider for authentication and sign in
googleProvider.setCustomParameters({ prompt: "select_account" });

export const auth = getAuth();
export const signInWithGooglePopup = () =>
	signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
	signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export type ObjectToAdd = {
	title: string;
};
/**
 * 	This function is used to create a document in the firestore database
 * @param {*} collectionKey  The name of the collection to add the documents to
 * @param {*} objectsToAdd  The array of objects to add to the collection
 * @returns
 */
export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
	collectionKey: string,
	objectsToAdd: T[]
): Promise<void> => {
	if (!collectionKey || !objectsToAdd) return;
	const collectionRef = collection(db, collectionKey);
	const batch = writeBatch(db);

	objectsToAdd.forEach((obj) => {
		const newDocRef = doc(collectionRef, obj.title.toLowerCase());
		batch.set(newDocRef, obj);
	});

	return await batch.commit();
};

/**
 *
 * @returns
 */
export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
	const collectionRef = collection(db, "categories");
	const q = query(collectionRef);

	const querySnapshot = await getDocs(q);
	return querySnapshot.docs.map(
		(docSnapshot) => docSnapshot.data() as Category
	);
	// const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
	// 	const { title, items } = docSnapshot.data();
	// 	acc[title.toLowerCase()] = items;
	// 	return acc;
	// }, {});

	// return categoryMap;
};

export type AdditionalInformation = {
	displayName?: string;
};

export type UserData = {
	createAt: Date;
	displayName: string;
	email: string;
};

/**
 *  This function is used to create a user document in the firestore database
 * @param {*} userAuth  The user object returned from the auth library
 * @param {*} additionalData  Any additional data that needs to be stored in the user document
 * @returns
 */
export const createUserDocumentFromAuth = async (
	userAuth: User,
	additionalData = {} as AdditionalInformation
): Promise<void | QueryDocumentSnapshot<UserData>> => {
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

	return userSnap as QueryDocumentSnapshot<UserData>;
};

/**
 * 	This function is used to create a user document in the firestore database with the user's email and password
 * @param {*} email
 * @param {*} password
 * @returns
 */
export const createAuthUserWithEmailAndPasswordFromAuth = async (
	email: string,
	password: string
) => {
	if (!email || !password) return;
	try {
		return await createUserWithEmailAndPassword(auth, email, password);
	} catch (error) {
		console.log(error);
	}
};

/**
 * 	This function is used to sign in a user with their email and password
 * @param {*} email
 * @param {*} password
 * @returns
 */
export const signInAuthUserWithEmailAndPassword = async (
	email: string,
	password: string
) => {
	if (!email || !password) return;
	try {
		const user = await signInWithEmailAndPassword(auth, email, password);
		return user;
	} catch (error) {
		console.log(error);
	}
};

/**
 * 	This function is used to sign out a user
 * @returns
 */
export const signOutUser = async () => await signOut(auth);

/**
 * 	This function is used to listen for changes in the user's authentication state
 * @param {*} callback
 * @returns
 */
export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
	onAuthStateChanged(auth, callback);

/**
 * 	This function is used to get the current user
 * @returns
 */
export const getCurrentUser = (): Promise<User | null> => {
	return new Promise((resolve, reject) => {
		const unsubscribe = onAuthStateChanged(
			auth,
			(userAuth) => {
				unsubscribe();
				resolve(userAuth);
			},
			reject
		);
	});
};
