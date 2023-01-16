<script setup>
import avatar1 from "@/assets/images/avatars/avatar-14.png";
import useAuth from "@/store/useAuth";
import { accountData } from "@/utils/data";

const store = useAuth();

const form = ref({
    avatarImg: avatar1,
    name: null,
    email: null
});

const errors = ref({});

const refInputEl = ref();
const isConfirmDialogOpen = ref(false);
const isAccountDeactivated = ref(false);
const validateAccountDeactivation = [v => !!v || "Please confirm account deactivation"];

onMounted(async () => {
    await store.getAuth();
    form.value.email = store.user.email;
    form.value.name = store.user.name;
    form.value.avatarImg = store.user.avatar;
});

const resetForm = () => {
    form.value.email = store.user.email;
    form.value.name = store.user.name;
};

const changeAvatar = file => {
    const fileReader = new FileReader();
    const { files } = file.target;
    if (files && files.length) {
        fileReader.readAsDataURL(files[0]);
        fileReader.onload = () => {
            if (typeof fileReader.result === "string") form.value.avatarImg = fileReader.result;
        };
    }
};
// reset avatar image
const resetAvatar = () => {
    form.value.avatarImg = accountData.avatarImg;
};
// update the user information
const updateUser = async () => {
    errors.value = {};
    try {
        await store.updateUserInfo(form.value);
        await store.getAuth();
    } catch (e) {
        if (e.response) {
            errors.value = e.response.data.errors;
            return;
        }
        throw e;
    }
};
</script>

<template>
    <VRow>
        <VCol cols="12">
            <VCard title="Profile Details">
                <VCardText class="d-flex">
                    <!-- 👉 Avatar -->
                    <VAvatar rounded size="100" class="me-6" :image="form.avatarImg" />
                    <!-- 👉 Upload Photo -->
                    <form ref="refForm" class="d-flex flex-column justify-center gap-4">
                        <div class="d-flex flex-wrap gap-2">
                            <VBtn color="primary" @click="refInputEl?.click()">
                                <VIcon icon="tabler-cloud-upload" class="d-sm-none" />
                                <span class="d-none d-sm-block">Upload new photo</span>
                            </VBtn>

                            <input ref="refInputEl" type="file" name="file" accept=".jpeg,.png,.jpg,GIF" hidden @input="changeAvatar" />

                            <VBtn type="reset" color="secondary" variant="tonal" @click="resetAvatar">
                                <span class="d-none d-sm-block">Reset</span>
                                <VIcon icon="tabler-refresh" class="d-sm-none" />
                            </VBtn>
                        </div>

                        <p class="text-body-1 mb-0">Allowed JPG, GIF or PNG. Max size of 800K</p>
                    </form>
                </VCardText>

                <VDivider />

                <VCardText class="pt-2">
                    <!-- 👉 Form -->
                    <VForm @submit.prevent="updateUser" class="mt-6">
                        <VRow>
                            <!-- 👉 First Name -->
                            <VCol md="6" cols="12">
                                <VTextField :error-messages="errors.name" v-model="form.name" label="First Name" />
                            </VCol>

                            <!-- 👉 Email -->
                            <VCol cols="12" md="6">
                                <VTextField :error-messages="errors.email" v-model="form.email" label="E-mail" type="email" />
                            </VCol>
                            <!-- 👉 Form Actions -->
                            <VCol cols="12" class="d-flex flex-wrap gap-4">
                                <VBtn type="submit">Save changes</VBtn>
                                <VBtn color="secondary" variant="tonal" type="reset" @click.prevent="resetForm"> Reset </VBtn>
                            </VCol>
                        </VRow>
                    </VForm>
                </VCardText>
            </VCard>
        </VCol>

        <VCol cols="12">
            <!-- 👉 Delete Account -->
            <VCard title="Delete Account">
                <VCardText>
                    <!-- 👉 Checkbox and Button  -->
                    <VAlert color="warning" variant="tonal" class="mb-4">
                        <VAlertTitle class="mb-1"> Are you sure you want to delete your account? </VAlertTitle>
                        <p class="mb-0">Once you delete your account, there is no going back. Please be certain.</p>
                    </VAlert>
                    <div>
                        <VCheckbox
                            v-model="isAccountDeactivated"
                            :rules="validateAccountDeactivation"
                            label="I confirm my account deactivation"
                        />
                    </div>

                    <VBtn :disabled="!isAccountDeactivated" color="error" class="mt-3" @click="isConfirmDialogOpen = true">
                        Deactivate Account
                    </VBtn>
                </VCardText>
            </VCard>
        </VCol>
    </VRow>

    <!-- Confirm Dialog -->
    <ConfirmDialog v-model:isDialogVisible="isConfirmDialogOpen" confirmation-msg="Are you sure you want to deactivate your account?" />
</template>
