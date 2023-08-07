import { GroupContainer, Input, FormInputLabel } from "./form-input.styles.jsx";

const FormInput = ({ label, ...otherProps }) => (
	<GroupContainer>
		<Input {...otherProps} />
		{label ? (
			<FormInputLabel shrink={otherProps.value.length}>{label}</FormInputLabel>
		) : null}
	</GroupContainer>
);

export default FormInput;
