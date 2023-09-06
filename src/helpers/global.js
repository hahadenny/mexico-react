export const transformErrors = (error) => {
    if (error.status !== 422) {
        return {};
    }
    return error.data.error.errors;
};

export const prepareAuthData = (data) => {
    const expiresAt = parseInt(data.expires_in / 60, 10);
    return {
        token: data.token,
        expiresIn: expiresAt,
        refreshToken: data.token,
        tokenType: data.tokenType || 'Bearer',
        authState: 'ok',
        refreshTokenExpireIn: expiresAt
    };
}