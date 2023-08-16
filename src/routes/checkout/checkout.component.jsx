// import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

// import { CartContext } from "../../contexts/cart.context";

import {
	selectCartItems,
	selectCartTotal,
} from "../../store/cart/cart.selector";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";

import {
	CheckoutContainer,
	CheckoutHeader,
	HeaderBlock,
	Total,
} from "./checkout.styles.jsx";

const Checkout = () => {
	// const {
	// 	cartItems,
	// 	removeItemFromCart,
	// 	addItemToCart,
	// 	clearItemFromCart,
	// 	cartTotal,
	// } = useContext(CartContext);
	const dispatch = useDispatch();
	const cartItems = useSelector(selectCartItems);
	const cartTotal = useSelector(selectCartTotal);

	return (
		<CheckoutContainer>
			<CheckoutHeader>
				<HeaderBlock>
					<span>Product</span>
				</HeaderBlock>
				<HeaderBlock>
					<span>Description</span>
				</HeaderBlock>
				<HeaderBlock>
					<span>Quantity</span>
				</HeaderBlock>
				<HeaderBlock>
					<span>Price</span>
				</HeaderBlock>
				<HeaderBlock>
					<span>Remove</span>
				</HeaderBlock>
			</CheckoutHeader>

			{cartItems.map((cartItem) => (
				<CheckoutItem key={cartItem.id} cartItem={cartItem} />
			))}

			<Total>TOTAL: ${cartTotal}</Total>
		</CheckoutContainer>
	);
};

export default Checkout;
