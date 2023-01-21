import { Module } from "vuex";

interface SnackBar {
    location?: 'top' | "top end" | "top start" | "center" | "end center" | "start center" | "bottom" | "bottom end" | "bottom start" | undefined;
    variant?: "flat" | "text" | "elevated" | "tonal" | "outlined" | "plain" | undefined;
    color?: "error" | "success" | undefined;
    transition?: "top start" | "bottom end" | "top end" | undefined;
    message?: string;
    vertical?: boolean;
    timeout?: number;
    'multi-line'?: boolean
}
interface State {
    snackBar: SnackBar | null
}

const snackBar: Module<State, {}> = {
    namespaced: true,
    state() {
        return {
            snackBar: null as SnackBar | null
        }
    },
    getters: {
        bar: (state) => state.snackBar
    },
    actions: {
        setBar(store, bar: SnackBar | null) {
            store.state.snackBar = null;
            store.state.snackBar = bar
        },
        success({ dispatch }, bar: SnackBar) {
            dispatch('setBar', {
                location: "top",
                variant: "tonal",
                color: "success",
                transition: "top end",
                vertical: false,
                "multi-line": true,
                ...bar
            })
        },
        error({ dispatch }, bar: SnackBar) {
            dispatch('setBar', {
                location: "top",
                transition: "top end",
                variant: "tonal",
                color: "error",
                vertical: false,
                "multi-line": true,
                ...bar
            })
        }
    }
}

export default snackBar;