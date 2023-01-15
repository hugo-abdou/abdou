import axiosIns from "@/plugins/axios";
import router from "@/router";

export default defineStore("auth", {
    state: () => ({}),
    getters: {},
    actions: {
        login: async (user: { email: string, password: string }, to: string = '/') => {
            try {
                await axiosIns.get("/sanctum/csrf-cookie");
                await axiosIns.post("/login", user);
                const res = await axiosIns.get("/api/user");
                const userData = res.data;
                localStorage.setItem("userData", JSON.stringify(userData));
                router.push(to)
            } catch (error) {
                throw error;
            }
        },
        register: async (user: { email: string, password: string }, to: string = '/') => {
            try {
                await axiosIns.get("/sanctum/csrf-cookie");
                await axiosIns.post("/register", user);
                const res = await axiosIns.get("/api/user");
                const userData = res.data;
                localStorage.setItem("userData", JSON.stringify(userData));
                router.push(to)
            } catch (error) {
                throw error;
            }
        },
        logout: async () => {
            await axiosIns.post("/logout");
            localStorage.removeItem("userData");
            router.push("/login");
        },
        // panding
        resetPassword: async () => { }
    }
});
