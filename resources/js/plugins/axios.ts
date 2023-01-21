import axios, { AxiosError, AxiosInstance } from "axios";
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
        if (error.response?.status == 401) useStore().dispatch('logout');
        throw error;
    }
);
export default axiosIns;
