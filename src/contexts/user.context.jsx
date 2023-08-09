import { createContext, useEffect, useReducer } from "react";

import {
	onAuthStateChangedListener,
	createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

// as the actual value you want to access
export const UserContext = createContext({
	currentUser: null,
	setCurrentUser: () => null,
});

export const userReducerInitialState = {
	currentUser: null,
};

export const USER_ACTION_TYPES = {
	SET_CURRENT_USER: "SET_CURRENT_USER",
};

const userReducer = (state, action) => {
	const { type, payload } = action;
	switch (type) {
		case USER_ACTION_TYPES.SET_CURRENT_USER:
			return {
				...state,
				currentUser: payload,
			};
		default:
			throw new Error(`Unknown action type: ${type}`);
	}
};

export const UserProvider = ({ children }) => {
	// const [currentUser, setCurrentUser] = useState(null);
	const [{ currentUser }, dispatch] = useReducer(
		userReducer,
		userReducerInitialState
	);
	const setCurrentUser = (user) => {
		dispatch({
			type: USER_ACTION_TYPES.SET_CURRENT_USER,
			payload: user,
		});
	};

	const value = { currentUser, setCurrentUser };

	useEffect(() => {
		// onAuthStateChangedListener is a function can listen to the auth state change,when the auth state change,
		// it will call the callback function you pass in
		// and it return a function that you can call to unsubscribe from the listener
		const unsubscribe = onAuthStateChangedListener((user) => {
			if (user) {
				createUserDocumentFromAuth(user);
			}
			setCurrentUser(user);
		});
		return unsubscribe;
	}, []);

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
