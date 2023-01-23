<script setup>
import miscMaskDark from "@/assets/images/pages/misc-mask-dark.png";
import miscMaskLight from "@/assets/images/pages/misc-mask-light.png";
import useSnackBar from "@/composables/useSnackBar";
import axiosIns from "@/plugins/axios";
import { useGenerateImageVariant } from "@core/composable/useGenerateImageVariant";

const authThemeMask = useGenerateImageVariant(miscMaskLight, miscMaskDark);
const snackBar = useSnackBar();
const directories = ref();
const extensions = ref();
const satisfied = ref();
onMounted(async () => {
    try {
        const res = await axiosIns.get("/api/install/pre_installation");
        directories.value = res.data.directories;
        extensions.value = res.data.extensions;
        satisfied.value = res.data.satisfied;
    } catch (e) {
        if (e.response) {
            snackBar.error({ message: e.response.data.message });
            return;
        }
        throw e;
    }
});
</script>

<template>
    <div>
        <div class="text-center">
            <!-- 👉 Title and subtitle -->
            <h4 class="text-h4 font-weight-medium mb-3">Pre-Installation</h4>
            <p>
                We ran diagnosis on your server. Review the items that have a red mark on it. If everything is green, you are good to go to
                the next step.
            </p>
        </div>
        <VList class="mb-3" lines="two">
            <VListItem
                border="b"
                v-for="(value, extension, i) in extensions"
                :key="i"
                prepend-icon="tabler:puzzle"
                lines="two"
                :title="extension"
            >
                <template #append>
                    <VIcon v-if="value" :size="26" color="success" icon="tabler:discount-check" />
                    <VIcon v-else :size="26" color="error" icon="tabler:alert-triangle" />
                </template>
            </VListItem>

            <VListItem border="b" v-for="(value, directory, i) in directories" :key="i" :title="directory">
                <template #prepend>
                    <VAvatar color="secondary" variant="tonal">
                        <VIcon :size="26" icon="tabler:file-code" />
                    </VAvatar>
                </template>

                <template #append>
                    <VIcon v-if="value" :size="26" color="success" icon="tabler:discount-check" />
                    <VIcon v-else :size="26" color="error" icon="tabler:alert-triangle" />
                </template>
            </VListItem>
        </VList>
        <VBtn :disabled="!satisfied" @click="$emit('next', 'purchase_code')" class="mt-12">Next Step >></VBtn>
    </div>
</template>
