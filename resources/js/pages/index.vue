<script setup>
import axiosIns from "@/plugins/axios";

const iconsList = ref([]);

onMounted(() => {
    axiosIns.get("http://api.iconify.design/collections").then(({ data }) => {
        // data.slice(0, 10).map(icon => {
        //     iconsList.value.push(`https://api.iconify.design/mdi/${icon}.svg?color=%23ba3329`);
        // });
        // iconsList.value = data.icons;
        console.log(data);
    });
});
</script>

<template>
    <div>
        <div class="d-flex align-center flex-wrap">
            <VCard v-for="icon in iconsList" :key="icon" class="mb-6 me-6">
                <VCardText class="py-3 px-4">
                    <VIcon size="100" :icon="icon" />
                </VCardText>

                <!-- tooltips -->
                <VTooltip location="top" activator="parent">
                    {{ icon }}
                </VTooltip>
            </VCard>
        </div>

        <!-- more icons -->
        <div class="text-center">
            <VBtn href="https://materialdesignicons.com/" rel="noopener noreferrer" color="primary" target="_blank">
                View All Material Design Icons
            </VBtn>
        </div>
    </div>
</template>
