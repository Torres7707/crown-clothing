import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {},
	carItems: [],
	addItemToCart: () => {},
	cartCount: 0,
});

export const CartProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [cartCount, setCartCount] = useState(0);

	useEffect(() => {
		setCartCount(cartItems.reduce((acc, item) => acc + item.quantity, 0));
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

	const value = {
		isCartOpen,
		setIsCartOpen,
		cartItems,
		addItemToCart,
		cartCount,
	};

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
