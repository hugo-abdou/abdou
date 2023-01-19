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

const useSnackBar = defineStore("useSnackBar", {
    state() {
        return {
            snackBar: null as SnackBar | null
        }
    },
    getters: {
        bar: (state) => state.snackBar
    },
    actions: {
        setBar(bar: SnackBar | null) {
            this.snackBar = null;
            this.snackBar = bar
        },
        success(bar: SnackBar) {
            this.setBar({
                location: "top",
                variant: "tonal",
                color: "success",
                transition: "top end",
                vertical: false,
                "multi-line": true,
                ...bar
            })
        },
        error(bar: SnackBar) {
            this.setBar({
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
});

export default useSnackBar;

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useSnackBar, import.meta.hot));
}
