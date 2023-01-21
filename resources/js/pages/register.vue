<script setup>
import { VForm } from "vuetify/components";
import authV2RegisterIllustrationBorderedDark from "@/assets/images/pages/auth-v2-register-illustration-bordered-dark.png";
import authV2RegisterIllustrationBorderedLight from "@/assets/images/pages/auth-v2-register-illustration-bordered-light.png";
import authV2RegisterIllustrationDark from "@/assets/images/pages/auth-v2-register-illustration-dark.png";
import authV2RegisterIllustrationLight from "@/assets/images/pages/auth-v2-register-illustration-light.png";
import authV2MaskDark from "@/assets/images/pages/misc-mask-dark.png";
import authV2MaskLight from "@/assets/images/pages/misc-mask-light.png";
import AuthProvider from "@/views/pages/authentication/AuthProvider.vue";
import { useGenerateImageVariant } from "@core/composable/useGenerateImageVariant";
import { VNodeRenderer } from "@layouts/components/VNodeRenderer";
import { themeConfig } from "@themeConfig";
import { alphaDashValidator, emailValidator, requiredValidator } from "@validators";
import { useStore } from "vuex";

const refVForm = ref();
const name = ref("johnDoe");
const email = ref("john@example.com");
const password = ref("john@MATERIO#123");
const password_confirmation = ref("john@MATERIO#123");
const privacyPolicies = ref(true);

// Form Errors
const errors = ref({
    name: undefined,
    email: undefined,
    password: undefined,
    password_confirmation: undefined
});

const imageVariant = useGenerateImageVariant(
    authV2RegisterIllustrationLight,
    authV2RegisterIllustrationDark,
    authV2RegisterIllustrationBorderedLight,
    authV2RegisterIllustrationBorderedDark,
    true
);
const authThemeMask = useGenerateImageVariant(authV2MaskLight, authV2MaskDark);
const isPasswordVisible = ref(false);

const store = useStore();

const onSubmit = async () => {
    try {
        const { valid: isValid } = await refVForm.value?.validate();
        if (isValid)
            await store.dispatch("register", {
                user: {
                    name: name.value,
                    email: email.value,
                    password: password.value,
                    password_confirmation: password.value
                },
                to: "/"
            });
    } catch (e) {
        const { errors: formErrors } = e.response.data;
        errors.value = formErrors;
        console.error(e.response.data);
    }
};
</script>

<template>
    <VRow no-gutters class="auth-wrapper">
        <VCol lg="8" class="d-none d-lg-flex">
            <div class="position-relative auth-bg rounded-lg w-100 ma-8 me-0">
                <div class="d-flex align-center justify-center w-100 h-100">
                    <VImg max-width="441" :src="imageVariant" class="auth-illustration mt-16 mb-2" />
                </div>

                <VImg class="auth-footer-mask" :src="authThemeMask" />
            </div>
        </VCol>

        <VCol cols="12" lg="4" class="d-flex align-center justify-center">
            <VCard flat :max-width="500" class="mt-12 mt-sm-0 pa-4">
                <VCardText>
                    <VNodeRenderer :nodes="themeConfig.app.logo" class="mb-6" />
                    <h5 class="text-h5 font-weight-semibold mb-1">Adventure starts here 🚀</h5>
                    <p class="mb-0">Make your app management easy and fun!</p>
                </VCardText>

                <VCardText>
                    <VForm ref="refVForm" @submit.prevent="onSubmit">
                        <VRow>
                            <!-- name -->
                            <VCol cols="12">
                                <VTextField
                                    :error-messages="errors.name"
                                    v-model="name"
                                    :rules="[requiredValidator, alphaDashValidator]"
                                    label="User Name"
                                />
                            </VCol>

                            <!-- email -->
                            <VCol cols="12">
                                <VTextField
                                    :error-messages="errors.email"
                                    v-model="email"
                                    :rules="[requiredValidator, emailValidator]"
                                    label="Email"
                                    type="email"
                                />
                            </VCol>
                            <!-- password -->
                            <VCol cols="12">
                                <VTextField
                                    v-model="password"
                                    :rules="[requiredValidator]"
                                    label="Password"
                                    :error-messages="errors.password"
                                    :type="isPasswordVisible ? 'text' : 'password'"
                                    :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                                    @click:append-inner="isPasswordVisible = !isPasswordVisible"
                                />
                            </VCol>

                            <!-- password -->
                            <VCol cols="12">
                                <VTextField
                                    v-model="password_confirmation"
                                    :rules="[requiredValidator]"
                                    label="Confirm Password"
                                    :error-messages="errors.password_confirmation"
                                    :type="isPasswordVisible ? 'text' : 'password'"
                                    :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                                    @click:append-inner="isPasswordVisible = !isPasswordVisible"
                                />

                                <div class="d-flex align-center mt-2 mb-4">
                                    <VCheckbox id="privacy-policy" v-model="privacyPolicies" inline />
                                    <VLabel for="privacy-policy" class="pb-1" style="opacity: 1">
                                        <span class="me-1">I agree to</span>
                                        <a href="javascript:void(0)" class="text-primary">privacy policy & terms</a>
                                    </VLabel>
                                </div>

                                <VBtn block type="submit"> Sign up </VBtn>
                            </VCol>

                            <!-- create account -->
                            <VCol cols="12" class="text-center text-base">
                                <span>Already have an account?</span>
                                <RouterLink class="text-primary ms-2" :to="{ name: 'login' }"> Sign in instead </RouterLink>
                            </VCol>

                            <VCol cols="12" class="d-flex align-center">
                                <VDivider />
                                <span class="mx-4">or</span>
                                <VDivider />
                            </VCol>

                            <!-- auth providers -->
                            <VCol cols="12" class="text-center">
                                <AuthProvider />
                            </VCol>
                        </VRow>
                    </VForm>
                </VCardText>
            </VCard>
        </VCol>
    </VRow>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>

<route lang="yaml">
meta:
    layout: blank
    action: read
    subject: Auth
    redirectIfLoggedIn: true
</route>
