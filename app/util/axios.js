import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// 토큰이 필요없는 API 경로들
const publicPaths = [
  '/user/auth/google/url',
  '/user/auth/google',
  '/user/auth/refresh'
];

// 요청 전에 실행되는 interceptor
api.interceptors.request.use(async (config) => {
    // public API인 경우 토큰 추가하지 않음
    if (publicPaths.some(path => config.url?.includes(path))) {
        return config;
    }

    // 쿠키에서 access_token 가져오기
    let accessToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('access_token'))
        ?.split('=')[1];

    // 쿠키에서 refresh_token 가져오기
    let refreshToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('refresh_token'))
        ?.split('=')[1];

    // access_token이 없으면 refresh_token으로 토큰 재발급
    if (!accessToken) {
        const response = await api.get(`/user/auth/refresh/${refreshToken}`);
        const responseData = response.data.data;
        // 쿠키에 토큰 저장

        const newAccessToken = responseData.accessToken;
        const newRefreshToken = responseData.refreshToken;
        const newAccessTokenExpiry = responseData.accessTokenExpiredAt;
        const newRefreshTokenExpiry = responseData.refreshTokenExpiredAt;

        accessToken = newAccessToken;
        refreshToken = newRefreshToken;
        // cookie에 저장
        document.cookie = `access_token=${newAccessToken}; max-age=${newAccessTokenExpiry}; path=/; Secure; SameSite=Lax; domain=simol.iptime.org`;
        document.cookie = `refresh_token=${newRefreshToken}; max-age=${newRefreshTokenExpiry}; path=/; Secure; SameSite=Lax; domain=simol.iptime.org`;
    }

    // access_token이 있으면 헤더에 추가
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});

// 응답 interceptor
api.interceptors.response.use((response) => {
    return response;
}, async (error) => {
    const originalRequest = error.config;

    // public API이거나 이미 재시도한 요청인 경우 처리하지 않음
    if (publicPaths.some(path => originalRequest.url?.includes(path)) || originalRequest._retry) {
        return Promise.reject(error);
    }

    console.log(error.response.status);
    if (error.response.status === 401) {
        originalRequest._retry = true;
        // access token 재발급
        try {
            const token = document.cookie
                .split('; ')
                .find(row => row.startsWith('refresh_token'))
                ?.split('=')[1];
            const response = await api.get(`/user/auth/refresh/${token}`);
            const responseData = response.data.data;
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
            document.cookie = `access_token=${accessToken}; max-age=${accessTokenMaxAge}; path=/; Secure; SameSite=Lax; domain=simol.iptime.org`;
            document.cookie = `refresh_token=${refreshToken}; max-age=${refreshTokenMaxAge}; path=/; Secure; SameSite=Lax; domain=simol.iptime.org`;

            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return api(originalRequest);
        } catch (refreshError) {
            window.location.href = "/login";
        }
    }

    return Promise.reject(error);
});

export default api;