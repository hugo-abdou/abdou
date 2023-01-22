import { SnackBar } from "@/store/modules/snackBar";

export default function useSnackBar() {
    const store = useStore();

    const bar = computed(() => store.getters["snackBar/bar"]);

    function setBar(bar: SnackBar | null) {
        store.dispatch("snackBar/setBar", bar);
    }
    function success(bar: SnackBar) {
        store.dispatch("snackBar/success", bar);
    }
    function error(bar: SnackBar) {
        store.dispatch("snackBar/error", bar);
    }

    return { success, error, setBar, bar };
}
