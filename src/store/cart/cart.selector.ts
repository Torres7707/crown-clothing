import { createSelector } from "reselect";
import { CartState } from "./cart.reducer";
import { CartItem } from "./cart.types";

const selectCartReducer = (state: { cart: CartState }): CartState => state.cart;

export const selectCartItems = createSelector(
	[selectCartReducer],
	(cart: CartState): CartItem[] => cart.cartItems
);

export const selectIsCartOpen = createSelector(
	[selectCartReducer],
	(cart: CartState): boolean => cart.isCartOpen
);

export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
	cartItems.reduce((total, item) => total + item.quantity, 0)
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
	cartItems.reduce((total, item) => total + item.quantity * item.price, 0)
);
