<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import image1 from "@/assets/images/avatars/avatar-1.png";
import useSnackBar from "@/composables/useSnackBar";

const snackBar = useSnackBar();
const store = useStore();
const props = defineProps(["userId"]);
const user = ref({});

const form = ref({
    name: null,
    email: null,
    avatar: image1
});

const errors = ref({});
const avatar = ref("");
const refInputEl = ref();
const isConfirmDialogOpen = ref(false);
const isAccountDeactivated = ref(false);
const validateAccountDeactivation = [v => !!v || "Please confirm account deactivation"];

const getUser = async () => {
    try {
        const res = await store.dispatch("users/fetchUser", props.userId);
        user.value = res.data;
    } catch (error) {}
};

const setDefaultUser = val => {
    form.value.email = val.email;
    form.value.name = val.name;
    form.value.avatar = val.avatar;
    avatar.value = val.profile_photo_url;
};

const changeAvatar = file => {
    const fileReader = new FileReader();
    const { files } = file.target;
    if (files && files.length) {
        fileReader.readAsDataURL(files[0]);
        fileReader.onload = () => {
            if (typeof fileReader.result === "string") {
                avatar.value = fileReader.result;
                form.value.avatar = files[0];
            }
        };
    }
};
// update the user information
const updateUser = async () => {
    errors.value = {};
    try {
        await store.dispatch("users/updateUserInfo", { id: user.value.id, form: form.value });
        await getUser();

        snackBar.success({
            message: "User informations has ben updated succesfuly"
        });
    } catch (e) {
        if (e.response) {
            console.log(e.response);
            errors.value = e.response.data.errors;
            snackBar.error({ message: e.response.data.message });
            return;
        }
        throw e;
    }
};

const resetForm = () => setDefaultUser(user.value);
const resetAvatar = () => setDefaultUser(user.value);
watch(user, () => setDefaultUser(user.value));
onMounted(getUser);
</script>

<template>
    <VRow>
        <VCol cols="12">
            <VCard title="Profile Details">
                <VCardText class="d-flex">
                    <!-- 👉 Avatar -->
                    <VAvatar rounded size="100" class="me-6" :image="avatar || form.avatar" />
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
                <template #append><VChip size="x-large" color="warning"> Not supported </VChip></template>
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
