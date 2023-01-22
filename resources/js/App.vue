<script setup lang="ts">
import { useTheme } from "vuetify";
import { useThemeConfig } from "@core/composable/useThemeConfig";
import { hexToRgb } from "@layouts/utils";
import useSnackBar from "./composables/useSnackBar";

const { syncInitialLoaderTheme, syncVuetifyThemeWithTheme: syncConfigThemeWithVuetifyTheme, isAppRtl } = useThemeConfig();

const { global } = useTheme();

// ℹ️ Sync current theme with initial loader theme
syncInitialLoaderTheme();
syncConfigThemeWithVuetifyTheme();
const { bar, setBar } = useSnackBar();
</script>

<template>
    <VLocaleProvider :rtl="isAppRtl">
        <VSnackbar @update:model-value="setBar(null)" :model-value="!!bar" v-bind="bar">
            {{ bar?.message }}
        </VSnackbar>
        <!-- ℹ️ This is required to set the background color of active nav link based on currently active global theme's primary -->
        <VApp :style="`--v-global-theme-primary: ${hexToRgb(global.current.value.colors.primary)}`">
            <RouterView />
        </VApp>
    </VLocaleProvider>
</template>
