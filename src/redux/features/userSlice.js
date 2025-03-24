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
    setSkin: (state, action) => {
      state.skin = action.payload; // Cập nhật thông tin loại da
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, updateUserInfo, setSkin } = userSlice.actions;

export default userSlice.reducer;
