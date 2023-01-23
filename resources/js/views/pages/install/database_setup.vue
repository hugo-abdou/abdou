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
    host: "127.0.0.1",
    port: "3306",
    database: null,
    username: "root",
    password: null
});
const errors = ref({});

const emit = defineEmits(["next"]);
const submit = async () => {
    errors.value = {};
    try {
        // const res = await axiosIns.post("/api/install/database_installation", form.value);
        emit("next", "admin_setup");
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
    <div>
        <div class="text-center">
            <!-- 👉 Title and subtitle -->
            <h4 class="text-h4 font-weight-medium mb-3">Database setup</h4>
            <p>
                Fill this form with your database connection details. If you didn't create a database yet please create a new one and fill
                the following form.
            </p>
            <!-- 👉 Form -->
            <VForm @submit.prevent="submit" class="mt-10">
                <VRow>
                    <VCol md="6" cols="12">
                        <VTextField :error-messages="errors.host" v-model="form.host" label="Host" />
                    </VCol>
                    <VCol md="6" cols="12">
                        <VTextField :error-messages="errors.port" v-model="form.port" label="Port" />
                    </VCol>
                    <VCol md="6" cols="12">
                        <VTextField :error-messages="errors.database" v-model="form.database" label="Database" />
                    </VCol>
                    <VCol md="6" cols="12">
                        <VTextField :error-messages="errors.username" v-model="form.username" label="Database username" />
                    </VCol>
                    <VCol md="6" cols="12">
                        <VTextField :error-messages="errors.password" v-model="form.password" label="Database password" />
                    </VCol>
                    <VCol cols="12">
                        <VBtn type="submit" class="mt-12">Next Step >></VBtn>
                    </VCol>
                </VRow>
            </VForm>
        </div>
    </div>
</template>
