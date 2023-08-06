import "./checkout-item.styles.scss";

const CheckoutItem = ({ cartItem, increment, decrement, clearItem }) => {
	return (
		<div className="checkout-item-container">
			<div className="image-container">
				<img src={cartItem.imageUrl} alt={cartItem.name} />
			</div>
			<span className="name">{cartItem.name}</span>
			<span className="quantity">
				<div
					className="arrow"
					onClick={() => {
						decrement(cartItem);
					}}
				>
					&#10094;
				</div>
				{cartItem.quantity}
				<div
					className="arrow"
					onClick={() => {
						increment(cartItem);
					}}
				>
					&#10095;
				</div>
			</span>
			<span className="price">{cartItem.price}</span>
			<div
				className="remove-button"
				onClick={() => {
					clearItem(cartItem);
				}}
			>
				&#10005;
			</div>
		</div>
	);
};

export default CheckoutItem;
