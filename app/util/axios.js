import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.response.use((response) => {
    return response;
}, async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        // access token 재발급
        try {
            const token = document.cookie
                .split('; ')
                .find(row => row.startsWith('refreshToken'))
                ?.split('=')[1];
            const response = await api.get(`/auth/refresh/${token}`);
            const responseData = response.data;
            // 쿠키에 토큰 저장
        
            const accessToken = responseData.accessToken;
            const refreshToken = responseData.refreshToken;
            const accessTokenExpiry = responseData.accessTokenExpiredAt;
            const refreshTokenExpiry = responseData.refreshTokenExpiredAt;
    
            const currentTime = Date.now();
            // 밀리초를 초로 변환하고 현재 시간과의 차이를 계산
            const accessTokenMaxAge = Math.floor(Math.max((accessTokenExpiry - currentTime) / 1000, 0));
            const refreshTokenMaxAge = Math.floor(Math.max((refreshTokenExpiry - currentTime) / 1000, 0));
    
            // 쿠키에 토큰 저장
            document.cookie = `access_token=${accessToken}; max-age=${accessTokenMaxAge}; path=/; Secure; SameSite=Lax`;
            document.cookie = `refresh_token=${refreshToken}; max-age=${refreshTokenMaxAge}; path=/; Secure; SameSite=Lax`;

            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return api(originalRequest);
        } catch (refreshError) {
            window.location.href = "/login";
        }
    }
});

export default api;