<script setup lang="ts">
import { useTheme } from "vuetify";
import { useThemeConfig } from "@core/composable/useThemeConfig";
import { hexToRgb } from "@layouts/utils";

const { syncInitialLoaderTheme, syncVuetifyThemeWithTheme: syncConfigThemeWithVuetifyTheme, isAppRtl } = useThemeConfig();

const { global } = useTheme();

// ℹ️ Sync current theme with initial loader theme
syncInitialLoaderTheme();
syncConfigThemeWithVuetifyTheme();
const store = useStore();
</script>

<template>
    <VLocaleProvider :rtl="isAppRtl">
        <VSnackbar
            @update:model-value="store.dispatch('snackBar/setBar', null)"
            v-if="!!store.getters['snackBar/bar']"
            :model-value="!!store.getters['snackBar/bar']"
            v-bind="store.getters['snackBar/bar']"
        >
            {{ store.getters["snackBar/bar"]?.message }}
        </VSnackbar>
        <!-- ℹ️ This is required to set the background color of active nav link based on currently active global theme's primary -->
        <VApp :style="`--v-global-theme-primary: ${hexToRgb(global.current.value.colors.primary)}`">
            <RouterView />
        </VApp>
    </VLocaleProvider>
</template>
