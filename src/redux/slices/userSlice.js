import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  user: null,
}

/**
 * @description create user redux object{actions,name,reducers}
 */
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      return { ...state, user: action.payload }
    },
    logout(state) {
      return { ...state, user: null }
    }
  },
})
export const { login, logout } = userSlice.actions
