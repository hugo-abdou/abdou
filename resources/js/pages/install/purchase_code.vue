<script setup>
import miscMaskDark from "@/assets/images/pages/misc-mask-dark.png";
import miscMaskLight from "@/assets/images/pages/misc-mask-light.png";
import useSnackBar from "@/composables/useSnackBar";
import axiosIns from "@/plugins/axios";
import router from "@/router";
import { useGenerateImageVariant } from "@core/composable/useGenerateImageVariant";

const authThemeMask = useGenerateImageVariant(miscMaskLight, miscMaskDark);

const snackBar = useSnackBar();
const code = ref(null);

const verify = async () => {
    try {
        // await axiosIns.post("/api/install/purchase_code/verify", { code: code.value });
        router.push("/install/database_setup");
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
    <VContainer>
        <div class="misc-wrapper">
            <div class="text-center">
                <!-- 👉 Title and subtitle -->
                <h4 class="text-h4 font-weight-medium mb-3">Purchase Code</h4>
                <p>Provide your CodeCanyon purchase code.<a href="#">Where to get purchase code?</a></p>
                <VTextField name="purchase_code" type="text" v-model="code" label="Purchase code." clearable />
            </div>
            <VBtn @click="verify" class="mt-12">Next Step >></VBtn>
            <VImg :src="authThemeMask" class="misc-footer-img d-none d-md-block" />
        </div>
    </VContainer>
</template>

<style lang="scss">
@use "@core/scss/template/pages/misc.scss";
</style>

<route lang="yaml">
meta:
    layout: blank
</route>
