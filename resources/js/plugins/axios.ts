import store from "@/store";
import axios, { AxiosError, AxiosInstance } from "axios";
const axiosIns: AxiosInstance = axios.create({
    withCredentials: true,
    baseURL: '/api/',
    headers: {
        common: {
            "X-Requested-With": "XMLHttpRequest"
        },
        Accept: "application/vnd.api+json"
    }
});


axiosIns.interceptors.response.use(
    res => res,
    (error: AxiosError) => {
        if (error.response?.status == 401) store.dispatch("logout");
        throw error;
    }
);
export default axiosIns;
