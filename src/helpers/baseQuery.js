import {fetchBaseQuery} from '@reduxjs/toolkit/query';

export const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers, {getState, endpoint}) => {
        if (endpoint === 'login') {
            return headers;
        }
        const {authToken} = getState().auth;
        //console.log(authToken);

        if (authToken) {
            headers.set('authorization', authToken);
        }

        return headers;
    }
});