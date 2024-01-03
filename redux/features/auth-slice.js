import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = {
    isAuthenticated: false,
    user: {
        id: null,
        email: null,
        name: null
    },
    isLoaded: false
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.isAuthenticated = false;
            state.isLoaded = true;
            state.user.id = null;
            state.user.name = null;
            state.user.email = null;
        },
        loginUser: (state, action) => {
            // console.log(action.payload);
            state.isAuthenticated = true;
            state.user.id = action.payload.id;
            state.user.name = action.payload.name;
            state.user.email = action.payload.email;
            state.isLoaded = true;

        },
        toggleauth: (state) => {
            state.isAuthenticated = !state.isAuthenticated;
        }
    }
})

export const { logoutUser, loginUser, toggleauth } = authSlice.actions

export default authSlice.reducer