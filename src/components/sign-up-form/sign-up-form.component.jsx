import { useState } from "react";
import { useDispatch } from "react-redux";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import {
	createAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import { signUpStart } from "../../store/user/user.action";

import { SignUpContainer, SignUpTitle } from "./sign-up-form.styles.jsx";

const defaultFormFields = {
	displayName: "",
	email: "",
	password: "",
	confirmPassword: "",
};

const FORM_INPUT_ARRAY = [
	{
		name: "displayName",
		type: "text",
		label: "Display Name",
	},
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
	{
		name: "confirmPassword",
		type: "password",
		label: "Confirm Password",
	},
];

const SignUpForm = () => {
	const dispatch = useDispatch();
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { displayName, email, password, confirmPassword } = formFields;

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (password !== confirmPassword) {
			alert("passwords don't match");
			return;
		}
		try {
			// const user = await createAuthUserWithEmailAndPasswordFromAuth(
			// 	email,
			// 	password
			// );
			// createUserDocumentFromAuth(user, { displayName });

			dispatch(signUpStart(email, password, displayName));
			setFormFields(defaultFormFields);
		} catch (error) {
			if (error?.code === "auth/email-already-in-use") {
				alert("Cannot create user, email already in use");
			} else {
				console.log("user creation encountered an error", error);
			}
		}
	};

	return (
		<SignUpContainer>
			<SignUpTitle>Don't have an account?</SignUpTitle>
			<span>Sign Up with your email and password</span>
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
				<Button type="submit">Sign Up</Button>
			</form>
		</SignUpContainer>
	);
};

export default SignUpForm;
