import { useState } from "react";
import { useDispatch } from "react-redux";

import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

// import {
// 	signInWithGooglePopup,
// 	createUserDocumentFromAuth,
// 	signInAuthUserWithEmailAndPassword,
// } from "../../utils/firebase/firebase.utils";

import {
	googleSignInStart,
	emailSignInStart,
} from "../../store/user/user.action";

import {
	SignInContainer,
	SignInTitle,
	SignInButtonsContainer,
} from "./sign-in-form.styles.jsx";

const defaultFormFields = {
	email: "",
	password: "",
};

const FORM_INPUT_ARRAY = [
	{
		name: "email",
		type: "email",
		label: "Email",
	},
	{
		name: "password",
		type: "password",
		label: "Password",
	},
];

const SignInForm = () => {
	const dispatch = useDispatch();
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			// const user = await signInAuthUserWithEmailAndPassword(email, password);
			// setCurrentUser(user);
			dispatch(emailSignInStart(email, password));
			setFormFields(defaultFormFields);
		} catch (error) {
			console.log("user sign in failed", error);
		}
	};

	const signInWithGoogleUser = async () => {
		// try {
		// 	await signInWithGooglePopup();
		// } catch (error) {
		// 	console.log(error);
		// }
		dispatch(googleSignInStart());
	};

	return (
		<SignInContainer>
			<SignInTitle>Already have an account?</SignInTitle>
			<span>Sign In with your email and password</span>
			<form onSubmit={handleSubmit}>
				{FORM_INPUT_ARRAY.map(({ name, type, label }) => (
					<FormInput
						key={name}
						label={label}
						name={name}
						type={type}
						required
						onChange={handleChange}
						value={formFields[name]}
					/>
				))}
				<SignInButtonsContainer>
					<Button type="submit">Sign In</Button>
					<Button
						type="button"
						buttonType={BUTTON_TYPE_CLASSES.google}
						onClick={signInWithGoogleUser}
					>
						GOOGLE SIGN IN
					</Button>
				</SignInButtonsContainer>
			</form>
		</SignInContainer>
	);
};

export default SignInForm;
