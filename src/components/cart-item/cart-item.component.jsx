import {
	CartItemContainer,
	CartItemImage,
	ItemDetailsContainer,
	CartItemName,
	CartItemPrice,
} from "./cart-item.styles";

const CartItem = ({ item: { imageUrl, price, name, quantity } }) => (
	<CartItemContainer>
		<CartItemImage src={imageUrl} alt={name} />
		<ItemDetailsContainer>
			<CartItemName>{name}</CartItemName>
			<CartItemPrice>
				{quantity} x ${price}
			</CartItemPrice>
		</ItemDetailsContainer>
	</CartItemContainer>
);

export default CartItem;
