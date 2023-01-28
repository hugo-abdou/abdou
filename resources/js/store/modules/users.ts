import { Module } from "vuex";
import axiosIns from "@/plugins/axios";
import router from "@/router";

interface State {
}
const Users: Module<State, {}> = {
    namespaced: true,
    state: () => ({
        users: []
    }),
    getters: {},
    actions: {
        // 👉 Fetch users data
        fetchUsers(store, params) {
            return axiosIns.get("/users", { params });
        },

        // 👉 Add User
        addUser(store, userData) {
            return new Promise((resolve, reject) => {
                axiosIns.post('api/users/store', userData)
                    .then(response => resolve(response))
                    .catch(error => reject(error));
            });
        },

        // 👉 fetch single user
        updateUserInfo(store, { id, form: newInfo }) {
            return new Promise((resolve, reject) => {
                const form = new FormData();
                form.append("name", newInfo.name);
                form.append("email", newInfo.email);
                form.append("_method", "PUT");
                if (newInfo.avatar instanceof File) {
                    form.append("avatar", newInfo.avatar);
                }
                axiosIns.post(`/users/${id}/update`, form, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Accept: "application/json"
                    }
                }).then(response => resolve(response))
                    .catch(error => reject(error));
            });
        },
        // 👉 fetch single user
        fetchUser(store, id) {
            return new Promise((resolve, reject) => {
                axiosIns.get(`users/${id}`)
                    .then(response => resolve(response))
                    .catch(error => reject(error));
            });
        }
    }
};
export default Users;
