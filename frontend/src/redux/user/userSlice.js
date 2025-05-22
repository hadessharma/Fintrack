import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: null,
    name: '',
    email: '',
    token: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login(state, action) {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.token = action.payload.token;
        },
        logout(state) {
            state.id = null;
            state.name = '';
            state.email = '';
            state.token = null;
        }
    }
})

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;