<script setup>
import { useStore } from "vuex";

const store = useStore();
const user = computed(() => store.getters["user"]);
</script>

<template>
    <VBadge dot location="bottom right" offset-x="3" offset-y="3" bordered color="success">
        <VAvatar class="cursor-pointer" color="primary" variant="tonal">
            <VImg :src="user?.avatar" />

            <!-- SECTION Menu -->
            <VMenu activator="parent" width="230" location="bottom end" offset="14px">
                <VList>
                    <!-- 👉 User Avatar & Name -->
                    <VListItem>
                        <template #prepend>
                            <VListItemAction start>
                                <VBadge dot location="bottom right" offset-x="3" offset-y="3" color="success">
                                    <VAvatar color="primary" variant="tonal">
                                        <VImg :src="user?.avatar" />
                                    </VAvatar>
                                </VBadge>
                            </VListItemAction>
                        </template>

                        <VListItemTitle class="font-weight-semibold"> {{ user.name }} </VListItemTitle>
                        <VListItemSubtitle>{{ user.email }}</VListItemSubtitle>
                    </VListItem>

                    <VDivider class="my-2" />

                    <!-- 👉 Profile -->
                    <VListItem link>
                        <template #prepend>
                            <VIcon class="me-2" icon="tabler-user" size="22" />
                        </template>

                        <VListItemTitle>Profile</VListItemTitle>
                    </VListItem>

                    <!-- 👉 Settings -->
                    <VListItem link :to="{ name: 'account-settings-tab', params: { tab: 'account' } }">
                        <template #prepend>
                            <VIcon class="me-2" icon="tabler-settings" size="22" />
                        </template>

                        <VListItemTitle>Settings</VListItemTitle>
                    </VListItem>

                    <!-- 👉 Pricing -->
                    <VListItem link>
                        <template #prepend>
                            <VIcon class="me-2" icon="tabler-currency-dollar" size="22" />
                        </template>

                        <VListItemTitle>Pricing</VListItemTitle>
                    </VListItem>

                    <!-- 👉 FAQ -->
                    <VListItem link>
                        <template #prepend>
                            <VIcon class="me-2" icon="tabler-help" size="22" />
                        </template>

                        <VListItemTitle>FAQ</VListItemTitle>
                    </VListItem>

                    <!-- Divider -->
                    <VDivider class="my-2" />

                    <!-- 👉 Logout -->
                    <VListItem link @click="store.dispatch('logout')">
                        <template #prepend>
                            <VIcon class="me-2" icon="tabler-logout" size="22" />
                        </template>

                        <VListItemTitle>Logout</VListItemTitle>
                    </VListItem>
                </VList>
            </VMenu>
            <!-- !SECTION -->
        </VAvatar>
    </VBadge>
</template>
