import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   cart: [],
//   totalQuantity: 0,
//   totalPrice: 0,
// };
const initialState = {
  cart: [],
  totalQuantity: 0,
  totalPrice: 0,
  appliedVoucher: null, // Lưu voucher đang áp dụng
  discountedTotal: 0, // Tổng tiền sau khi trừ voucher
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    //apply voucher
    applyVoucher: (state, action) => {
      const voucher = action.payload;
      state.appliedVoucher = voucher;

      if (voucher.discountTypeEnum === "PERCENT") {
        state.discountedTotal = state.totalPrice * (1 - voucher.discountPrice / 100);
      } else {
        state.discountedTotal = Math.max(state.totalPrice - voucher.discountPrice, 0);
      }
    },

    //them product vao cart
    addToCart: (state, actions) => {
      const product = actions.payload;
      // check xem san pham product da ton tai chua
      console.log(state);
      const exitstingProduct = state.cart.find((item) => item.id === product.id);

      if (exitstingProduct) {
        //neu da ton tai thi tang so luong
        exitstingProduct.quantity += product.quantityPlain;
      } else {
        //neu chua ton tai thi them vao cart
        state.cart.push({
          ...product,
          quantity: product.quantityPlain,
          quantityPlain: product.quantityPlain,
          pricePlain: product.pricePlain,
        });
      }

      state.totalQuantity += product.quantityPlain;
      state.totalPrice += product.pricePlain;
      return state;
    },

    removeFromCart: (state, actions) => {
      const productId = actions.payload;
      const productIndex = state.cart.findIndex((item) => item.id === productId);

      if (productIndex !== -1) {
        const product = state.cart[productIndex];
        state.totalQuantity -= product.quantity;
        state.totalPrice -= product.price * product.quantity;
        //spice(xoa tai vi tri muon xoa(index), so luong phan tu muon xoa)
        state.cart.splice(productIndex, 1);
      }
    },

    clearCart: (state) => {
      state.cart = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      state.appliedVoucher = null;
      state.discountedTotal = 0;
    },

    increaseQuantity: (state, action) => {
      const product = state.cart.find((item) => item.id === action.payload);
      if (product) {
        product.quantity += 1;
        state.totalQuantity += 1;
        state.totalPrice += product.price;
      }
    },

    decreaseQuantity: (state, action) => {
      const product = state.cart.find((item) => item.id === action.payload);
      if (product && product.quantity > 1) {
        console.log(state.totalPrice);
        product.quantity -= 1;
        state.totalQuantity -= 1;
        console.log(product.price);
        state.totalPrice -= product.price;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { applyVoucher, addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;

export default cartSlice;
