import { useState, useContext } from "react";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { UserContext } from "../../contexts/user.context";

import {
	createAuthUserWithEmailAndPasswordFromAuth,
	createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import "./sign-up-form.styles.scss";

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
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { displayName, email, password, confirmPassword } = formFields;
	const { setCurrentUser } = useContext(UserContext);

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
			const user = await createAuthUserWithEmailAndPasswordFromAuth(
				email,
				password
			);
			setCurrentUser(user);
			console.log(user);
			createUserDocumentFromAuth(user, { displayName });
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
		<div className="sign-up-container">
			<h2>Don't have an account?</h2>
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
		</div>
	);
};

export default SignUpForm;
