<script setup>
import miscMaskDark from "@/assets/images/pages/misc-mask-dark.png";
import miscMaskLight from "@/assets/images/pages/misc-mask-light.png";
import axiosIns from "@/plugins/axios";
import router from "@/router";
import { useGenerateImageVariant } from "@core/composable/useGenerateImageVariant";
const authThemeMask = useGenerateImageVariant(miscMaskLight, miscMaskDark);

const isLoading = ref(false);

const step = ref(null);
const stepComponent = computed(() => {
    switch (step.value) {
        case "pre_installation":
            return defineAsyncComponent(() => import("@/views/pages/install/pre_installation.vue"));
        case "database_setup":
            return defineAsyncComponent(() => import("@/views/pages/install/database_setup.vue"));
        case "purchase_code":
            return defineAsyncComponent(() => import("@/views/pages/install/purchase_code.vue"));
        case "admin_setup":
            return defineAsyncComponent(() => import("@/views/pages/install/admin_setup.vue"));
        default:
            return null;
    }
});
onMounted(async () => {
    // check if the app nead installation
    try {
        isLoading.value = true;
        const res = await axiosIns.get("api/install/init");
        if (res.data.step == "complited") {
            router.push("/");
        }
        step.value = res.data.step;
    } catch (error) {
        console.error(error);
    }
    isLoading.value = false;
});

const next = async _step => {
    try {
        isLoading.value = true;
        const res = await axiosIns.get("/install/set_step/" + _step);
        if (_step !== res.data.step) {
            return next(_step);
        }
        step.value = res.data.step;
    } catch (error) {
        console.error(error);
    }
    isLoading.value = false;
};
</script>

<template>
    <VImg :src="authThemeMask" class="misc-footer-img d-none d-md-block" />
    <div v-if="isLoading" id="loading-bg">
        <div class="loading">
            <div class="effect-1 effects"></div>
            <div class="effect-2 effects"></div>
            <div class="effect-3 effects"></div>
        </div>
    </div>
    <VContainer v-else>
        <VCard class="misc-wrapper">
            <component @next="next" v-if="stepComponent" :is="stepComponent" />
            <template v-else>
                <div class="text-center">
                    <!-- 👉 Title and subtitle -->
                    <h4 class="text-h4 font-weight-medium mb-3">CardGen Installation Steps</h4>
                    <p>You will need to know the following items before proceeding.</p>
                    <VList
                        :items="[
                            '1. CodeCanyon purchase code',
                            '2. You server have installed PHP 7.4 or later',
                            '3. You server have installed PHP SQLite/MySQL extension '
                        ]"
                    />
                    <p class="px-8 mt-6 leading-7 text-center">
                        During the installation process, we will check if the files that are needed to be written (<strong>.env file</strong
                        >) have <strong>write permission</strong>. We will also check if some php extensions are enabled on your server or
                        not.
                    </p>
                    <p class="mt-5 mb-5">
                        Gather the information mentioned above before hitting the <strong>Next Step</strong> button. If you are ready....
                    </p>
                </div>
                <VBtn @click="next('pre_installation')" class="mt-12">Next Step >></VBtn>
            </template>
        </VCard>
    </VContainer>
</template>

<style lang="scss">
@use "@core/scss/template/pages/misc.scss";
</style>

<route lang="yaml">
meta:
    layout: blank
</route>
