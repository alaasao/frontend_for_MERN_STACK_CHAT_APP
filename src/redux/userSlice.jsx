import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  name: "",
  email: "",
  profilePic: "",
  token: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      (state._id = action.payload._id),
        (state.name = action.payload.name),
        (state.email = action.payload.email),
        (state.profilePic = action.payload.profilePic);
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logout: (state) => {
      (state._id = ""),
        (state.name = ""),
        (state.email = ""),
        (state.profilePic = ""),
        (state.token = "");
    },
  },
});

// Action creators are generated for each case reducer function
export const { setToken,setUser,logout} = userSlice.actions;

export default userSlice.reducer;
