import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import { fileURLToPath } from "url";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import DefineOptions from "unplugin-vue-define-options/vite";
import Pages from "vite-plugin-pages";
import Layouts from "vite-plugin-vue-layouts";
import vuetify from "vite-plugin-vuetify";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/js/main.ts"],
            refresh: true
        }),
        vue(),
        vueJsx(),
        // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
        vuetify({
            styles: {
                configFile: "resources/js/styles/variables/_vuetify.scss"
            }
        }),
        Pages({
            dirs: ["resources/js/pages"]
        }),
        Layouts({ layoutsDirs: ["resources/js/layouts"] }),
        Components({
            dirs: ["resources/js/@core/components", "resources/js/views/demos"],
            dts: true
        }),
        AutoImport({
            imports: ["vue", "vue-router", "@vueuse/core", "@vueuse/math", "vuex"],
            vueTemplate: true
        }),

        DefineOptions()
    ],
    define: { "process.env": {} },
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./resources/js", import.meta.url)),
            "@themeConfig": fileURLToPath(new URL("./themeConfig.ts", import.meta.url)),
            "@core": fileURLToPath(new URL("./resources/js/@core", import.meta.url)),
            "@layouts": fileURLToPath(new URL("./resources/js/@layouts", import.meta.url)),
            "@configured-variables": fileURLToPath(new URL("./resources/js/styles/variables/_template.scss", import.meta.url)),
            "@axios": fileURLToPath(new URL("./resources/js/plugins/axios", import.meta.url)),
            "@store": fileURLToPath(new URL("./resources/js/store", import.meta.url)),
            "@validators": fileURLToPath(new URL("./resources/js/@core/utils/validators", import.meta.url)),
            apexcharts: fileURLToPath(new URL("node_modules/apexcharts-clevision", import.meta.url))
        }
    },
    build: {
        chunkSizeWarningLimit: 5000
    },
    optimizeDeps: {
        exclude: ["vuetify"],
        entries: ["./resources/js/**/*.vue", "./resources/js/**/*.ts"]
    }
});
