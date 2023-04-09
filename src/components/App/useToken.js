import { useState } from 'react';

export default function useToken() {
    const getToken = () => {
        var tokenString = localStorage.getItem('token');
        if (!tokenString) {
            return;
        }
        var userToken = JSON.parse(tokenString);
        return userToken && userToken.accessToken;
    };

    const [token, setToken] = useState(getToken());

    const saveToken = userToken => {
        localStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken.token);
    };

    return {
        setToken: saveToken,
        token
    }
}