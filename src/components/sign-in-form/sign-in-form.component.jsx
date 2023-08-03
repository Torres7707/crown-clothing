import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { signInWithGooglePopup } from "../../utils/firebase/firebase.utils";

import {
	createUserDocumentFromAuth,
	signInAuthUserWithEmailAndPasswordFromAuth,
} from "../../utils/firebase/firebase.utils";

import "./sign-in-form.styles.scss";

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
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const user = await signInAuthUserWithEmailAndPasswordFromAuth(
				email,
				password
			);
			// setCurrentUser(user);
			setFormFields(defaultFormFields);
		} catch (error) {
			switch (error.code) {
				case "auth/invalid-email":
					alert("Invalid email. Please try again.");
					break;
				case "auth/user-disabled":
					alert("User disabled. Please contact support.");
					break;
				case "auth/user-not-found":
					alert("User not found. Please sign up first.");
					break;
				case "auth/wrong-password":
					alert("Incorrect password. Please try again.");
					break;
				default:
					alert("Something went wrong. Please try again.");
					console.log(error);
			}
		}
	};

	const signInWithGoogleUser = async () => {
		try {
			await signInWithGooglePopup();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="sign-up-container">
			<h2>Already have an account?</h2>
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
				<div className="buttons-container">
					<Button type="submit">Sign In</Button>
					<Button
						type="button"
						buttonType={"google"}
						onClick={signInWithGoogleUser}
					>
						GOOGLE SIGN IN
					</Button>
				</div>
			</form>
		</div>
	);
};

export default SignInForm;
