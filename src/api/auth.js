import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQuery} from '../helpers/baseQuery';

export const authApi = createApi({
    reducerPath: "auth_user",
    baseQuery,
    endpoints: (builder) => ({
        me: builder.query({
            query: () => ({url: "api/auth/me"})
        }),
        auth: builder.mutation({
            query: (token) => ({
                url: `/api/auth/auth?api_key=${token}`,
                method: 'POST'
            })
        }),
        updateProfile: builder.mutation({
            query: (body) => ({
                url: '/api/auth/me',
                method: 'PUT',
                body
            })
        }),
        login: builder.mutation({
            query: ({email, password}) => ({
                url: "/api/auth/login",
                method: "POST",
                body: {email, password}
            })
        }),
        recoveryPassword: builder.mutation({
            query: ({email}) => ({
                url: "/api/auth/recovery",
                method: "POST",
                body: {email}
            })
        }),
        resetPassword: builder.mutation({
            query: ({email, password, password_confirmation, token}) => ({
                url: "/api/auth/reset",
                method: "POST",
                body: {email, password, password_confirmation, token}
            })
        }),
        registration: builder.mutation({
            query: (credentials) => ({
                url: "/api/auth/signup",
                method: "POST",
                body: credentials
            })
        }),
        logOut: builder.mutation({
            query: () => ({
                url: "/api/auth/logout",
                method: "POST"
            })
        }),
        impersonate: builder.mutation({
            query: (id) => ({
                url: `/api/auth/impersonate/${id}`,
                method: "POST"
            })
        }),
        leaveImpersonate: builder.mutation({
            query: (id) => ({
                url: '/api/auth/impersonate',
                method: 'DELETE'
            })
        })
    })
});

export const {
    useLoginMutation,
    useUpdateProfileMutation,
    useRegistrationMutation,
    useRecoveryPasswordMutation,
    useResetPasswordMutation,
    useLogOutMutation,
    useMeQuery,
    useImpersonateMutation,
    useLeaveImpersonateMutation,
    useAuthMutation
} = authApi;
