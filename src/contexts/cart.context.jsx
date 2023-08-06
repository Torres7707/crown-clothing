import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {},
	carItems: [],
	addItemToCart: () => {},
	removeItemFromCart: () => {},
	clearItemFromCart: () => {},
	cartCount: 0,
	cartTotal: 0,
});

export const CartProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [cartCount, setCartCount] = useState(0);
	const [cartTotal, setCartTotal] = useState(0);

	useEffect(() => {
		setCartCount(cartItems.reduce((acc, item) => acc + item.quantity, 0));
	}, [cartItems]);

	useEffect(() => {
		setCartTotal(
			cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)
		);
	}, [cartItems]);

	const addItemToCart = (productToAdd) => {
		const existingCartItem = cartItems.find(
			(cartItem) => cartItem.id === productToAdd.id
		);
		if (existingCartItem) {
			setCartItems(
				cartItems.map((cartItem) =>
					cartItem.id === productToAdd.id
						? { ...cartItem, quantity: cartItem.quantity + 1 }
						: cartItem
				)
			);
		} else {
			setCartItems([...cartItems, { ...productToAdd, quantity: 1 }]);
		}
	};

	const removeItemFromCart = (productToRemove) => {
		const existingCartItem = cartItems.find(
			(cartItem) => cartItem.id === productToRemove.id
		);
		if (existingCartItem.quantity === 1) {
			setCartItems(
				cartItems.filter((cartItem) => cartItem.id !== productToRemove.id)
			);
		} else {
			setCartItems(
				cartItems.map((cartItem) =>
					cartItem.id === productToRemove.id
						? { ...cartItem, quantity: cartItem.quantity - 1 }
						: cartItem
				)
			);
		}
	};

	const clearItemFromCart = (productToClear) => {
		setCartItems(
			cartItems.filter((cartItem) => cartItem.id !== productToClear.id)
		);
	};

	const value = {
		isCartOpen,
		setIsCartOpen,
		cartItems,
		addItemToCart,
		removeItemFromCart,
		clearItemFromCart,
		cartCount,
		cartTotal,
	};

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
