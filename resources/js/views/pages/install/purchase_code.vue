<script setup>
import miscMaskDark from "@/assets/images/pages/misc-mask-dark.png";
import miscMaskLight from "@/assets/images/pages/misc-mask-light.png";
import useSnackBar from "@/composables/useSnackBar";
import axiosIns from "@/plugins/axios";
import router from "@/router";
import { useGenerateImageVariant } from "@core/composable/useGenerateImageVariant";

const snackBar = useSnackBar();
const code = ref(null);

const emit = defineEmits(["next"]);

const verify = async () => {
    try {
        await axiosIns.post("/api/install/purchase_code/verify", { code: code.value });
        emit("next", "database_setup");
    } catch (e) {
        if (e.response) {
            snackBar.error({ message: e.response.data.message });
            return;
        }
        throw e;
    }
};
</script>

<template>
    <div>
        <div class="text-center">
            <!-- 👉 Title and subtitle -->
            <h4 class="text-h4 font-weight-medium mb-3">Purchase Code</h4>
            <p>Provide your CodeCanyon purchase code.<a href="#">Where to get purchase code?</a></p>
            <VTextField name="purchase_code" type="text" v-model="code" label="Purchase code." clearable />
        </div>
        <VBtn @click="verify" class="mt-12">Next Step >></VBtn>
    </div>
</template>
