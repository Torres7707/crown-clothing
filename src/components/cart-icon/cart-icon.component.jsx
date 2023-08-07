import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

import {
	CartIconContainer,
	ShoppingIconContainer,
	ItemCountContainer,
} from "./cart-icon.styles";

const CartIcon = ({ handleClick, cartCount }) => {
	return (
		<CartIconContainer onClick={handleClick}>
			<ShoppingIconContainer as={ShoppingIcon} />
			<ItemCountContainer>{cartCount}</ItemCountContainer>
		</CartIconContainer>
	);
};

export default CartIcon;
