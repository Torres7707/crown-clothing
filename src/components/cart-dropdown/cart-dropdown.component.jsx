import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";

import { CartContext } from "../../contexts/cart.context";

import {
	CartDropdownContainer,
	CartItems,
	CartEmptyMessage,
} from "./cart-dropdown.styles.jsx";

const CartDropdown = () => {
	const { cartItems } = useContext(CartContext);
	const navigate = useNavigate();

	const goToCheckout = () => {
		navigate("/checkout");
	};

	return (
		<CartDropdownContainer>
			<CartItems>
				{cartItems.length ? (
					cartItems.map((cartItem) => (
						<CartItem key={cartItem.id} item={cartItem} />
					))
				) : (
					<CartEmptyMessage>Your cart is empty</CartEmptyMessage>
				)}
			</CartItems>
			<Button
				style={{
					padding: "0 1rem",
				}}
				onClick={goToCheckout}
			>
				GO TO CHECKOUT
			</Button>
		</CartDropdownContainer>
	);
};

export default CartDropdown;
