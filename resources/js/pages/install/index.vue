<script setup lang="ts">
import miscMaskDark from "@/assets/images/pages/misc-mask-dark.png";
import miscMaskLight from "@/assets/images/pages/misc-mask-light.png";
import { useGenerateImageVariant } from "@core/composable/useGenerateImageVariant";
const authThemeMask = useGenerateImageVariant(miscMaskLight, miscMaskDark);
const init = () => {};
</script>

<template>
    <VContainer>
        <div class="misc-wrapper">
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
                    During the installation process, we will check if the files that are needed to be written (<strong>.env file</strong>)
                    have <strong>write permission</strong>. We will also check if some php extensions are enabled on your server or not.
                </p>
                <p class="mt-5 mb-5">
                    Gather the information mentioned above before hitting the <strong>Next Step</strong> button. If you are ready....
                </p>
            </div>
            <VBtn to="/install/pre_installation" class="mt-12">Next Step >></VBtn>

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
