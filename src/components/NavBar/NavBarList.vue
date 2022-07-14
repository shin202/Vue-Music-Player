<template>
    <ul class="header-menu__list flex justify-between items-center gap-[2rem]">
        <li class="header-menu__item">
            <!-- Icon -->
            <ion-icon name="settings-outline" class="text-3xl align-middle cursor-pointer" @click="showAlert(alertMessage)" />
        </li>
        <li class="header-menu__item">
            <Button @click="showAlert(alertMessage)">
                <span>Nâng cấp tài khoản</span>
            </Button>
        </li>
    </ul>
</template>

<script setup lang="ts">
import Button from '../Button/Button.vue';
import { showAlert } from '../../composables/Alert';

const alertMessage = 'Nút này được tạo ra chỉ để bấm cho vui 😎';
</script>

<style lang="scss" scoped>

</style>