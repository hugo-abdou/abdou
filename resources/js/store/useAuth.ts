import axiosIns from "@/plugins/axios";
import router from "@/router";
import { storeToRefs } from "pinia";
interface User {
    email: string;
    password: string;
}

const useAuth = defineStore("auth", () => {
    const user = ref(null);

    const login = async (user: User, to: string = "/") => {
        try {
            await axiosIns.get("/sanctum/csrf-cookie");
            await axiosIns.post("/login", user);
            const res = await axiosIns.get("/api/user");
            const userData = res.data;
            localStorage.setItem("userData", JSON.stringify(userData));
            router.push(to);
        } catch (error) {
            throw error;
        }
    };
    const register = async (user: User, to: string = "/") => {
        try {
            await axiosIns.get("/sanctum/csrf-cookie");
            await axiosIns.post("/register", user);
            const res = await axiosIns.get("/api/user");
            const userData = res.data;
            localStorage.setItem("userData", JSON.stringify(userData));
            router.push(to);
        } catch (error) {
            throw error;
        }
    };
    const logout = async () => {
        await axiosIns.post("/logout");
        localStorage.removeItem("userData");
        router.push("/login");
    };
    // TODO: create reset password page and logic
    const resetPassword = async () => {};
    const getAuth = async () => {
        try {
            const res = await axiosIns.get("/api/user");
            user.value = res.data;
        } catch (error) {
            console.error(error);
        }
    };
    const updateUser = async (user: User) => {
        console.log(user);
    };

    return {
        user,
        login,
        register,
        logout,
        resetPassword,
        updateUser,
        getAuth
    };
});

export default useAuth;
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAuth, import.meta.hot));
}
