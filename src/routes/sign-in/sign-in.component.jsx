import {
	signInWithGooglePopup,
	createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
	const logGoogleUser = async () => {
		try {
			const { user } = await signInWithGooglePopup();
			createUserDocumentFromAuth(user);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="sign-in">
			<h1>Sign In page</h1>
			<button onClick={logGoogleUser}>Sign In with Google</button>
		</div>
	);
};

export default SignIn;
