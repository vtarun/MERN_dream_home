import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token
        },
        setLogout: () => {
            return initialState;
        }
    }
});

export const {setLogin, setLogout} = userSlice.actions;
export default userSlice.reducer;