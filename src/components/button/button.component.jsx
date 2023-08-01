import "./button.styles.scss";

const BUTTON_TYPE_CLASSES = {
	inverted: "inverted",
	google: "google-sign-in",
};

const Button = ({ children, buttonType, ...otherProps }) => (
	<button
		className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
		{...otherProps}
	>
		{children}
	</button>
);

export default Button;
