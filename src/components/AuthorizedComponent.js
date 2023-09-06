import React, {useEffect} from "react";
import {useAuthHeader, useIsAuthenticated} from "react-auth-kit";
import {Navigate, Outlet} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {selectors} from "../redux/auth/selectors";
import {useMeQuery} from "../api/auth";
import {Box, LoadingOverlay} from "@mantine/core";
import {setToken, setUser} from "../redux/auth/slice";

const AuthorizedComponent = () => {
    const isAuthenticated = useIsAuthenticated();
    const authState = useSelector(selectors);
    const dispatch = useDispatch();
    const authorized = isAuthenticated();
    const authHeader = useAuthHeader()();
    const {data: user} = useMeQuery(null, {skip: !authorized || !authState.authToken});

    useEffect(() => {
        dispatch(setToken({token: authHeader, type: 'authToken'}));
    }, [authHeader, dispatch]);

    useEffect(() => {
        if (user && authState.authToken && (!authState.user || authState.user.id !== user.id)) {
            dispatch(setUser(user.data));
        }
    }, [user, authState, dispatch]);

    if (!authorized) {
        return <Navigate to="/login"/>;
    }

    if (!authState.authToken || !authState.user) {
        return (
            <Box sx={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <LoadingOverlay visible={true} />
            </Box>
        );
    }

    return <Outlet/>;
};

export default AuthorizedComponent;
