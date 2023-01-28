import { Module } from "vuex";
import axiosIns from "@/plugins/axios";
import router from "@/router";
interface User {
    name: string;
    email: string;
    avatar: string | File;
    password?: string;
}
interface Events {
    [key: string]: Function;
}
interface State {
    user: User | null
}
const auth: Module<State, {}> = {
    state: () => ({
        user: null,
    }),
    getters: {
        user: state => state.user
    },
    actions: {
        async isUserLoggedIn() {
            const res = await axiosIns.get("/is_loged_in");
            return res.data == 1;
        },
        async login({ dispatch }, { user, to = "/" }) {
            try {
                await axiosIns.get("/sanctum/csrf-cookie");
                await axiosIns.post("/login", user);
                await dispatch("getAuth");
                router.push(to);
            } catch (error) {
                throw error;
            }
        },
        async register({ dispatch }, { user, to = "/" }) {
            try {
                await axiosIns.get("/sanctum/csrf-cookie");
                await axiosIns.post("/register", user);
                await dispatch("getAuth");
                router.push(to);
            } catch (error) {
                throw error;
            }
        },
        async logout() {
            await axiosIns.post("/logout");
            router.push("/login");
        },
        async resetPassword() { },
        async getAuth({ state }) {
            try {
                const res = await axiosIns.get("/user");
                state.user = res.data;
            } catch (error) {
                console.error(error);
            }
        },
        async updateUserInfo(store, newInfo: User) {
            const form = new FormData();
            form.append("name", newInfo.name);
            form.append("email", newInfo.email);
            form.append("_method", "PUT");
            if (newInfo.avatar instanceof File) {
                form.append("avatar", newInfo.avatar);
            }
            return axiosIns.post("/user/profile-information", form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json"
                }
            });
        },
        async resetUserPassword(store, newInfo: any) {
            return await axiosIns.put("/user/password", newInfo);
        }
    }
};
export default auth;
