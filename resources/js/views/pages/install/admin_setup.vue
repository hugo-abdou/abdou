<script setup>
import miscMaskDark from "@/assets/images/pages/misc-mask-dark.png";
import miscMaskLight from "@/assets/images/pages/misc-mask-light.png";
import useSnackBar from "@/composables/useSnackBar";
import axiosIns from "@/plugins/axios";
import router from "@/router";
import { useGenerateImageVariant } from "@core/composable/useGenerateImageVariant";
const authThemeMask = useGenerateImageVariant(miscMaskLight, miscMaskDark);
const snackBar = useSnackBar();

const isPasswordVisible = ref(false);
const form = ref({
    username: null,
    email: null,
    password: null
});
const errors = ref({});

const submit = async () => {
    errors.value = {};
    try {
        const res = await axiosIns.post("/install/system_settings", form.value);
        router.push("/");
    } catch (e) {
        if (e.response) {
            errors.value = e.response.data.errors;
            snackBar.error({ message: e.response.data.message });
            return;
        }
        throw e;
    }
};
</script>

<template>
    <div class="w-100">
        <div class="text-center">
            <!-- 👉 Title and subtitle -->
            <h4 class="text-h4 font-weight-medium mb-3">Login Credentials</h4>
            <p>Fill this form with basic information & admin login credentials</p>
            <!-- 👉 Form -->
        </div>
        <VForm @submit.prevent="submit" class="mt-6">
            <VRow>
                <VCol md="6" cols="12">
                    <VTextField :error-messages="errors.username" v-model="form.username" label="Admin Name" />
                </VCol>
                <VCol md="6" cols="12">
                    <VTextField :error-messages="errors.email" v-model="form.email" label="Admin Email" />
                </VCol>
                <VCol md="6" cols="12">
                    <VTextField
                        v-model="form.password"
                        label="Password"
                        :error-messages="errors.password"
                        :type="isPasswordVisible ? 'text' : 'password'"
                        :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                        @click:append-inner="isPasswordVisible = !isPasswordVisible"
                    />
                </VCol>
                <VCol cols="12">
                    <VBtn type="submit" class="mt-12">Next Step >></VBtn>
                </VCol>
            </VRow>
        </VForm>
    </div>
</template>
