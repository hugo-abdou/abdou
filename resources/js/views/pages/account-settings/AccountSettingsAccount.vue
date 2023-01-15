<script setup>
import useAuth from "@/store/useAuth";
import { accountData } from "@/utils/data";

const store = useAuth();

const { getAuth } = store;
(async function () {
    await getAuth();
    console.log(store.user);
})();

const refInputEl = ref();
const isConfirmDialogOpen = ref(false);
const form = ref(structuredClone(accountData));
const isAccountDeactivated = ref(false);
const validateAccountDeactivation = [v => !!v || "Please confirm account deactivation"];

const resetForm = () => {
    form.value = structuredClone(accountData);
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
const updateUser = () => {};
</script>

<template>
    <VRow>
        <pre> {{ user }}</pre>
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
                    <VForm class="mt-6">
                        <VRow>
                            <!-- 👉 First Name -->
                            <VCol md="6" cols="12">
                                <VTextField v-model="form.name" label="First Name" />
                            </VCol>

                            <!-- 👉 Email -->
                            <VCol cols="12" md="6">
                                <VTextField v-model="form.email" label="E-mail" type="email" />
                            </VCol>
                            <!-- 👉 Form Actions -->
                            <VCol cols="12" class="d-flex flex-wrap gap-4">
                                <VBtn @click.prevent="updateUser">Save changes</VBtn>
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
