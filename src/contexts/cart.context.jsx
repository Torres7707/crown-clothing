import { createContext, useEffect, useReducer } from "react";

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

const cartReducerInitialState = {
	isCartOpen: false,
	cartItems: [],
	cartCount: 0,
	cartTotal: 0,
};

const addItemToCart = (cartItems, productToAdd) => {
	const existingCartItem = cartItems.find(
		(cartItem) => cartItem.id === productToAdd.id
	);
	if (existingCartItem) {
		return cartItems.map((cartItem) =>
			cartItem.id === productToAdd.id
				? { ...cartItem, quantity: cartItem.quantity + 1 }
				: cartItem
		);
	}
	return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeItemFromCart = (cartItems, productToRemove) => {
	const existingCartItem = cartItems.find(
		(cartItem) => cartItem.id === productToRemove.id
	);
	if (existingCartItem.quantity === 1) {
		return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
	}
	return cartItems.map((cartItem) =>
		cartItem.id === productToRemove.id
			? { ...cartItem, quantity: cartItem.quantity - 1 }
			: cartItem
	);
};

const clearItemFromCart = (cartItems, productToClear) => {
	return cartItems.filter((cartItem) => cartItem.id !== productToClear.id);
};

export const CART_ACTION_TYPES = {
	TOGGLE_CART: "TOGGLE_CART",
	ADD_ITEM: "ADD_ITEM",
	REMOVE_ITEM: "REMOVE_ITEM",
	CLEAR_ITEM: "CLEAR_ITEM",
	CLEAR_CART: "CLEAR_CART",
	CART_COUNT: "CART_COUNT",
	CART_TOTAL: "CART_TOTAL",
};

const cartReducer = (state, action) => {
	const { type, payload } = action;
	switch (type) {
		case CART_ACTION_TYPES.TOGGLE_CART:
			return {
				...state,
				isCartOpen: !state.isCartOpen,
			};
		case CART_ACTION_TYPES.ADD_ITEM:
			return {
				...state,
				cartItems: addItemToCart(state.cartItems, payload),
			};
		case CART_ACTION_TYPES.REMOVE_ITEM:
			return {
				...state,
				cartItems: removeItemFromCart(state.cartItems, payload),
			};
		case CART_ACTION_TYPES.CLEAR_ITEM:
			return {
				...state,
				cartItems: clearItemFromCart(state.cartItems, payload),
			};
		case CART_ACTION_TYPES.CLEAR_CART:
			return {
				...state,
				cartItems: [],
			};

		case CART_ACTION_TYPES.CART_COUNT:
			return {
				...state,
				cartCount: state.cartItems.reduce(
					(acc, item) => acc + item.quantity,
					0
				),
			};
		case CART_ACTION_TYPES.CART_TOTAL:
			return {
				...state,
				cartTotal: state.cartItems.reduce(
					(acc, item) => acc + item.quantity * item.price,
					0
				),
			};
		default:
			throw new Error(`Unknown action type: ${type}`);
	}
};

export const CartProvider = ({ children }) => {
	// const [isCartOpen, setIsCartOpen] = useState(false);
	// const [cartItems, setCartItems] = useState([]);
	// const [cartCount, setCartCount] = useState(0);
	// const [cartTotal, setCartTotal] = useState(0);
	const [{ isCartOpen, cartItems, cartCount, cartTotal }, dispatch] =
		useReducer(cartReducer, cartReducerInitialState);

	useEffect(() => {
		// setCartCount(cartItems.reduce((acc, item) => acc + item.quantity, 0));
		dispatch({
			type: CART_ACTION_TYPES.CART_COUNT,
		});
	}, [cartItems]);

	useEffect(() => {
		// setCartTotal(
		// 	cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)
		// );
		dispatch({
			type: CART_ACTION_TYPES.CART_TOTAL,
		});
	}, [cartItems]);

	// const addItemToCart = (productToAdd) => {
	// 	const existingCartItem = cartItems.find(
	// 		(cartItem) => cartItem.id === productToAdd.id
	// 	);
	// 	if (existingCartItem) {
	// 		setCartItems(
	// 			cartItems.map((cartItem) =>
	// 				cartItem.id === productToAdd.id
	// 					? { ...cartItem, quantity: cartItem.quantity + 1 }
	// 					: cartItem
	// 			)
	// 		);
	// 	} else {
	// 		setCartItems([...cartItems, { ...productToAdd, quantity: 1 }]);
	// 	}
	// };

	// const removeItemFromCart = (productToRemove) => {
	// 	const existingCartItem = cartItems.find(
	// 		(cartItem) => cartItem.id === productToRemove.id
	// 	);
	// 	if (existingCartItem.quantity === 1) {
	// 		setCartItems(
	// 			cartItems.filter((cartItem) => cartItem.id !== productToRemove.id)
	// 		);
	// 	} else {
	// 		setCartItems(
	// 			cartItems.map((cartItem) =>
	// 				cartItem.id === productToRemove.id
	// 					? { ...cartItem, quantity: cartItem.quantity - 1 }
	// 					: cartItem
	// 			)
	// 		);
	// 	}
	// };

	// const clearItemFromCart = (productToClear) => {
	// 	setCartItems(
	// 		cartItems.filter((cartItem) => cartItem.id !== productToClear.id)
	// 	);
	// };

	const value = {
		isCartOpen,
		setIsCartOpen: () =>
			dispatch({
				type: CART_ACTION_TYPES.TOGGLE_CART,
			}),
		cartItems,
		addItemToCart: (productToAdd) =>
			dispatch({
				type: CART_ACTION_TYPES.ADD_ITEM,
				payload: productToAdd,
			}),
		removeItemFromCart: (productToRemove) =>
			dispatch({
				type: CART_ACTION_TYPES.REMOVE_ITEM,
				payload: productToRemove,
			}),
		clearItemFromCart: (productToClear) =>
			dispatch({
				type: CART_ACTION_TYPES.CLEAR_ITEM,
				payload: productToClear,
			}),
		cartCount,
		cartTotal,
	};

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
