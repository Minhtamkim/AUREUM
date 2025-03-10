import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  totalQuantity: 0,
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    //them product vao cart
    addToCart: (state, actions) => {
      const product = actions.payload;
      // check xem san pham product da ton tai chua
      const exitstingProduct = state.cart.find((item) => item.id === product.id);

      if (exitstingProduct) {
        //neu da ton tai thi tang so luong
        exitstingProduct.quantity += 1;
      } else {
        //neu chua ton tai thi them vao cart
        state.cart.push({ ...product, quantity: 1 });
      }

      state.totalQuantity += 1;
      state.totalPrice += product.price;
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
        product.quantity -= 1;
        state.totalQuantity -= 1;
        state.totalPrice -= product.price;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;

export default cartSlice.reducer;
