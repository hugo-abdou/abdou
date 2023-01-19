<script setup lang="ts">
import { useTheme } from "vuetify";
import { useThemeConfig } from "@core/composable/useThemeConfig";
import { hexToRgb } from "@layouts/utils";
import useSnackBar from "./store/useSnackBar";

const { syncInitialLoaderTheme, syncVuetifyThemeWithTheme: syncConfigThemeWithVuetifyTheme, isAppRtl } = useThemeConfig();

const { global } = useTheme();

const store = useSnackBar();

// ℹ️ Sync current theme with initial loader theme
syncInitialLoaderTheme();
syncConfigThemeWithVuetifyTheme();
</script>

<template>
    <VLocaleProvider :rtl="isAppRtl">
        <VSnackbar @update:model-value="store.setBar(null)" v-if="!!store.bar" :model-value="!!store.bar" v-bind="store.bar">
            {{ store.bar?.message }}
        </VSnackbar>
        <!-- ℹ️ This is required to set the background color of active nav link based on currently active global theme's primary -->
        <VApp :style="`--v-global-theme-primary: ${hexToRgb(global.current.value.colors.primary)}`">
            <RouterView />
        </VApp>
    </VLocaleProvider>
</template>
