import {isRejectedWithValue} from '@reduxjs/toolkit';
import {notifications} from '@mantine/notifications';
import {IconX} from '@tabler/icons-react';
import {logout} from "../redux/auth/slice";
import storage from "../helpers/storage";

/**
 * Log a warning and show a notification!
 */
export const ErrorHandlerMiddleware = (api) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
        if (action.payload.data.error.status_code === 401) {
            if (action.meta.arg.endpointName === 'auth') {
                notifications.show({
                    color: 'red',
                    icon: <IconX size="1rem" />,
                    message: 'Please provide correct "api_key" param.',
                });
                return next(action);
            } else if (action.meta.arg.endpointName.toLowerCase().includes('monitor')) {
                notifications.show({
                    color: 'red',
                    icon: <IconX size="1rem" />,
                    message: action.payload.data.error.message,
                });
                return next(action);
            } else {
                storage.rm('_auth', {noPrefix: true});
                storage.rm('_auth_state', {noPrefix: true});
                api.dispatch(logout());
                document.location.href = '/login';
                return;
            }
        }
        if (![404, 422].includes(action.payload.data.error.status_code)) {
            notifications.show({
                color: 'red',
                icon: <IconX size="1rem" />,
                message: action.payload.data.error.message,
            });
        }
    }

    return next(action);
};
