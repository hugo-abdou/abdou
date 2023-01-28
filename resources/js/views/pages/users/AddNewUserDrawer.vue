<script setup>
import { PerfectScrollbar } from "vue3-perfect-scrollbar";
import { emailValidator, requiredValidator } from "@validators";

const props = defineProps({
    isDrawerOpen: {
        type: Boolean,
        required: true
    }
});

const emit = defineEmits(["update:isDrawerOpen", "userData"]);

const isFormValid = ref(false);
const refForm = ref();
const name = ref("");
const email = ref("");
const password = ref("");
const role = ref();
const plan = ref();
const status = ref();

const isPasswordVisible = ref(false);

// 👉 drawer close
const closeNavigationDrawer = () => {
    emit("update:isDrawerOpen", false);
    nextTick(() => {
        refForm.value?.reset();
        refForm.value?.resetValidation();
    });
};

const onSubmit = () => {
    refForm.value?.validate().then(({ valid }) => {
        if (valid) {
            emit("userData", {
                name: name.value,
                role: role.value,
                email: email.value,
                password: password.value,
                password_confirmation: password.value,
                currentPlan: plan.value,
                status: status.value,
                billing: "Auto Debit"
            });
            emit("update:isDrawerOpen", false);
            nextTick(() => {
                refForm.value?.reset();
                refForm.value?.resetValidation();
            });
        }
    });
};

const handleDrawerModelValueUpdate = val => {
    emit("update:isDrawerOpen", val);
};
</script>

<template>
    <VNavigationDrawer
        temporary
        :width="400"
        location="end"
        class="scrollable-content"
        :model-value="props.isDrawerOpen"
        @update:model-value="handleDrawerModelValueUpdate"
    >
        <!-- 👉 Title -->
        <div class="d-flex align-center pa-6 pb-1">
            <h6 class="text-h6">Add User</h6>

            <VSpacer />

            <!-- 👉 Close btn -->
            <VBtn variant="tonal" color="default" icon size="32" class="rounded" @click="closeNavigationDrawer">
                <VIcon size="18" icon="tabler-x" />
            </VBtn>
        </div>

        <PerfectScrollbar :options="{ wheelPropagation: false }">
            <VCard flat>
                <VCardText>
                    <!-- 👉 Form -->
                    <VForm ref="refForm" v-model="isFormValid" @submit.prevent="onSubmit">
                        <VRow>
                            <!-- 👉 Full name -->
                            <VCol cols="12">
                                <VTextField v-model="name" :rules="[requiredValidator]" label="Full Name" />
                            </VCol>

                            <!-- 👉 Email -->
                            <VCol cols="12">
                                <VTextField v-model="email" :rules="[requiredValidator, emailValidator]" label="Email" />
                            </VCol>
                            <!-- password -->
                            <VCol cols="12">
                                <VTextField
                                    v-model="password"
                                    :rules="[requiredValidator]"
                                    label="Password"
                                    :type="isPasswordVisible ? 'text' : 'password'"
                                    :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                                    @click:append-inner="isPasswordVisible = !isPasswordVisible"
                                />
                            </VCol>

                            <!-- 👉 Role -->
                            <!-- <VCol cols="12">
                                <VSelect
                                    v-model="role"
                                    label="Select Role"
                                    :rules="[requiredValidator]"
                                    :items="['Admin', 'Author', 'Editor', 'Maintainer', 'Subscriber']"
                                />
                            </VCol> -->

                            <!-- 👉 Plan -->
                            <!-- <VCol cols="12">
                                <VSelect
                                    v-model="plan"
                                    label="Select Plan"
                                    :rules="[requiredValidator]"
                                    :items="['Basic', 'Company', 'Enterprise', 'Team']"
                                />
                            </VCol> -->

                            <!-- 👉 Status -->
                            <!-- <VCol cols="12">
                                <VSelect
                                    v-model="status"
                                    label="Select Status"
                                    :rules="[requiredValidator]"
                                    :items="[
                                        { title: 'Active', value: 'active' },
                                        { title: 'Inactive', value: 'inactive' },
                                        { title: 'Pending', value: 'pending' }
                                    ]"
                                />
                            </VCol> -->

                            <!-- 👉 Submit and Cancel -->
                            <VCol cols="12">
                                <VBtn type="submit" class="me-3"> Submit </VBtn>
                                <VBtn type="reset" variant="tonal" color="secondary" @click="closeNavigationDrawer"> Cancel </VBtn>
                            </VCol>
                        </VRow>
                    </VForm>
                </VCardText>
            </VCard>
        </PerfectScrollbar>
    </VNavigationDrawer>
</template>
