import {
	CheckoutItemContainer,
	CheckoutItemImageContainer,
	CheckoutItemImage,
	CheckoutItemName,
	CheckoutItemQuantity,
	CheckoutItemArrow,
	CheckoutItemValue,
	CheckoutItemPrice,
	CheckoutItemRemoveButton,
} from "./checkout-item.styles.jsx";

const CheckoutItem = ({ cartItem, increment, decrement, clearItem }) => {
	return (
		<CheckoutItemContainer>
			<CheckoutItemImageContainer>
				<CheckoutItemImage src={cartItem.imageUrl} alt={cartItem.name} />
			</CheckoutItemImageContainer>
			<CheckoutItemName>{cartItem.name}</CheckoutItemName>
			<CheckoutItemQuantity>
				<CheckoutItemArrow
					onClick={() => {
						decrement(cartItem);
					}}
				>
					&#10094;
				</CheckoutItemArrow>
				{cartItem.quantity}
				<CheckoutItemArrow
					onClick={() => {
						increment(cartItem);
					}}
				>
					&#10095;
				</CheckoutItemArrow>
			</CheckoutItemQuantity>
			<CheckoutItemPrice>{cartItem.price}</CheckoutItemPrice>
			<CheckoutItemRemoveButton
				onClick={() => {
					clearItem(cartItem);
				}}
			>
				&#10005;
			</CheckoutItemRemoveButton>
		</CheckoutItemContainer>
	);
};

export default CheckoutItem;
