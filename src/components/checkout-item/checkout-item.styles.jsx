import styled from "styled-components";

export const CheckoutItemContainer = styled.div`
	width: 100%;
	display: flex;
	min-height: 100px;
	border-bottom: 1px solid darkgrey;
	padding: 15px 0;
	font-size: 20px;
	align-items: center;
`;

export const CheckoutItemImageContainer = styled.div`
	width: 23%;
	padding-right: 15px;
`;

export const CheckoutItemImage = styled.img`
	width: 100%;
	height: 100%;
`;

export const CheckoutItemName = styled.span`
	width: 23%;
`;

export const CheckoutItemQuantity = styled.span`
	width: 23%;
	display: flex;
`;

export const CheckoutItemArrow = styled.div`
	cursor: pointer;
`;

export const CheckoutItemValue = styled.span`
	margin: 0 10px;
`;

export const CheckoutItemPrice = styled.span`
	width: 23%;
`;

export const CheckoutItemRemoveButton = styled.div`
	padding-left: 12px;
	cursor: pointer;
`;

// .checkout-item-container {
//   width: 100%;
//   display: flex;
//   min-height: 100px;
//   border-bottom: 1px solid darkgrey;
//   padding: 15px 0;
//   font-size: 20px;
//   align-items: center;

//   .image-container {
//     width: 23%;
//     padding-right: 15px;

//     img {
//       width: 100%;
//       height: 100%;
//     }
//   }
//   .name,
//   .quantity,
//   .price {
//     width: 23%;
//   }

//   .quantity {
//     display: flex;

//     .arrow {
//       cursor: pointer;
//     }

//     .value {
//       margin: 0 10px;
//     }
//   }

//   .remove-button {
//     padding-left: 12px;
//     cursor: pointer;
//   }
// }
