<script setup>
import AccountSettingsAccount from "@/views/pages/users/settings/AccountSettingsAccount.vue";

import { useRoute } from "vue-router";
const route = useRoute();
const activeTab = ref(route.params.tab);

// tabs
const tabs = [
    {
        title: "Account",
        icon: "tabler-users",
        tab: "account"
    }
];
</script>

<template>
    <div>
        <VTabs v-model="activeTab" show-arrows class="v-tabs-pill">
            <VTab
                v-for="item in tabs"
                :key="item.icon"
                :value="item.tab"
                :to="{ name: 'users-user-settings-tab', params: { user: route.params.user, tab: item.tab } }"
            >
                <VIcon size="20" start :icon="item.icon" />
                {{ item.title }}
            </VTab>
        </VTabs>

        <VWindow v-model="activeTab" class="mt-6 disable-tab-transition" :touch="false">
            <!-- Account -->
            <VWindowItem value="account">
                <AccountSettingsAccount :user-id="route.params.user" />
            </VWindowItem>
        </VWindow>
    </div>
</template>

<route lang="yaml">
meta:
    redirectIfNotLoggedIn: true
</route>
