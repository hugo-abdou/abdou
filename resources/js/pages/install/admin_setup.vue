<script setup>
import miscMaskDark from "@/assets/images/pages/misc-mask-dark.png";
import miscMaskLight from "@/assets/images/pages/misc-mask-light.png";
import useSnackBar from "@/composables/useSnackBar";
import axiosIns from "@/plugins/axios";
import router from "@/router";
import { useGenerateImageVariant } from "@core/composable/useGenerateImageVariant";
const authThemeMask = useGenerateImageVariant(miscMaskLight, miscMaskDark);
const snackBar = useSnackBar();

const form = ref({
    username: null,
    email: null,
    password: null
});
const errors = ref({});

const submit = async () => {
    try {
        const res = await axiosIns.post("/api/install/database_installation", form.value);
        router.push("/");
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
                <h4 class="text-h4 font-weight-medium mb-3">Database setup</h4>
                <p>
                    Fill this form with your database connection details. If you didn't create a database yet please create a new one and
                    fill the following form.
                </p>
                <!-- 👉 Form -->
                <VForm @submit.prevent="submit" class="mt-6">
                    <VRow>
                        <VCol md="6" cols="12">
                            <VTextField :error-messages="errors.username" v-model="form.username" label="User Name" />
                        </VCol>
                        <VCol md="6" cols="12">
                            <VTextField :error-messages="errors.password" v-model="form.password" label="Password" />
                        </VCol>
                        <VCol cols="12">
                            <VBtn type="submit" class="mt-12">Next Step >></VBtn>
                        </VCol>
                    </VRow>
                </VForm>
            </div>
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
