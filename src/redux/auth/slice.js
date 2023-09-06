import {createSlice} from '@reduxjs/toolkit';
//import {localPreference} from "../../data/preference";

const initialState = {
    user: null,
    authToken: ''
};

export const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, {payload}) => {
            state.user = payload;
        },
        /*setPreferences: (state, {payload}) => {
            if (!state.user.settings || !state.user.settings.preferences) {
                state.user.settings = {...state.user.settings, preferences: localPreference}
            }
            state.user.settings.preferences = payload
        },*/
        setToken: (state, {payload}) => {
            state.authToken = payload.token;
        },
        logout: (state) => initialState
    }
});

export const {
    setUser,
    setToken,
    logout,
    //setPreferences
} = auth.actions;
export default auth.reducer;
