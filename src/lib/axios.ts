import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

api.interceptors.request.use((config) => {
    try {
        const authStorage = localStorage.getItem("auth-storage");
        const parsed = authStorage ? JSON.parse(authStorage) : null;
        const token = parsed?.state?.token;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    } catch (err) {
        console.warn("No se pudo cargar el token:", err);
    }

    return config;
});

// 🔁 Interceptor de respuesta para manejar token expirado y refrescarlo
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // si es 401 y no se ha intentado refresh aún
        if (
            (error.response?.status === 401 || error.response?.status === 403) &&
            !originalRequest._retry
        ) {

            try {
                const authStorage = localStorage.getItem("auth-storage");
                const parsed = authStorage ? JSON.parse(authStorage) : null;
                const refreshToken = parsed?.state?.refreshToken;

                if (!refreshToken) {
                    throw new Error("No refresh token available");
                }

                if (isRefreshing) {
                    return new Promise((resolve, reject) => {
                        failedQueue.push({
                            resolve: (token: string) => {
                                originalRequest.headers.Authorization = "Bearer " + token;
                                resolve(api(originalRequest));
                            },
                            reject: (err: any) => reject(err),
                        });
                    });
                }

                isRefreshing = true;

                const res = await axios.post("http://localhost:3000/api/auth/refresh", {
                    token: refreshToken,
                });

                const newToken = res.data.accessToken;

                // 🔁 Actualiza el almacenamiento persistente
                parsed.state.token = newToken;
                localStorage.setItem("auth-storage", JSON.stringify(parsed));

                processQueue(null, newToken);

                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return api(originalRequest);
            } catch (err) {
                processQueue(err, null);
                localStorage.removeItem("auth-storage");
                window.location.href = "/login";
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default api;
