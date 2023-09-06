import {createRefresh} from 'react-auth-kit';
import axios from 'axios';

export const refreshApi = createRefresh({
    interval: 15,
    refreshApiCallback: ({authToken}) => {
        return axios.post(process.env.REACT_APP_BASE_URL + "/api/auth/refresh",
            {}, {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        ).then(({data}) => {
            const expiredAt = parseInt(data.expires_in / 60, 10);
            return {
                isSuccess: true,
                newAuthToken: data.token,
                newRefreshToken: data.token,
                newAuthTokenExpireIn: expiredAt,
                newRefreshTokenExpiresIn: expiredAt
            };
        }).catch((e) => {
            return {
                isSuccess: false
            };
        });
    }
});

