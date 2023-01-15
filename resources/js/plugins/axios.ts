import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import router from "@/router";
import useAuth from "@/store/useAuth";
const axiosIns: AxiosInstance = axios.create({
    withCredentials: true,
    headers: {
        // common: {
        //     "X-Requested-With": "XMLHttpRequest"
        // },
        Accept: "application/json"
    }
});

axiosIns.interceptors.response.use(
    res => res,
    (error: AxiosError) => {
        if (error.response?.status == 401) useAuth().logout();
        throw error;
    }
);
export default axiosIns;
