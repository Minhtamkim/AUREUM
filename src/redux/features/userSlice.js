import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, actions) => {
      return actions.payload;
    },
    logout: () => {
      return initialState;
    },
    updateUserInfo: (state, action) => {
      return { ...state, ...action.payload }; // Cập nhật thông tin mới mà vẫn giữ các dữ liệu cũ
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, updateUserInfo } = userSlice.actions;

export default userSlice.reducer;
