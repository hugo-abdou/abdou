import { Module } from "vuex"
import axiosIns from '@/plugins/axios';
import router from "@/router";
import image1 from '@/assets/images/avatars/avatar-1.png'
interface User {
    name: string;
    email: string;
    avatar: string;
    password?: string;
    [key: string]: any;
}
interface Events {
    [key: string]: Function;
}
interface State {
    user?: User | null,
    events: Events
}
const auth: Module<State, {}> = {
    state: () => ({
        user: {
            name: '',
            email: '',
            avatar: image1,
        },
        events: {}
    }),
    getters: {
        userForm: (state) => state.user,
        user: (state) => state.user,
    },
    actions: {
        async isUserLoggedIn() {
            const res = await axiosIns.get('/api/is_loged_in');
            return res.data == 1
        },
        async login({ dispatch }, { user, to = "/" }) {
            try {
                await axiosIns.get("/sanctum/csrf-cookie");
                await axiosIns.post("/login", user);
                await dispatch('getAuth')
                router.push(to);
            } catch (error) {
                throw error;
            }
        },
        async register({ dispatch }, { user, to = "/" }) {
            try {
                await axiosIns.get("/sanctum/csrf-cookie");
                await axiosIns.post("/register", user);
                await dispatch('getAuth')
                router.push(to);
            } catch (error) {
                throw error;
            }
        },
        async logout() {
            await axiosIns.post("/logout");
            router.push("/login");
        },
        // TODO: create reset password page and logic
        async resetPassword() { },
        async getAuth({ state }) {
            try {
                const res = await axiosIns.get("/api/user");
                state.user = res.data;
            } catch (error) {
                console.error(error);
            }
        },
        async updateUserInfo(store, newInfo: User) {
            const form = new FormData();
            form.append('name', newInfo.name)
            form.append('email', newInfo.email)
            form.append('_method', 'PUT')
            if (newInfo.avatar?.startsWith('data:image')) {
                form.append('avatar', newInfo.file)
            }
            return await axiosIns({
                url: '/user/profile-information',
                method: 'POST',
                data: form,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
        },
        async resetUserPassword(store, newInfo: any) {
            return await axiosIns.put('/user/password', newInfo)
        },
    }
}
export default auth
