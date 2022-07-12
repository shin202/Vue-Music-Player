<template>
    <ul class="header-menu__list flex justify-between items-center gap-[2rem]">
        <li class="header-menu__item">
            <!-- Icon -->
            <ion-icon name="settings-outline" class="text-3xl align-middle cursor-pointer" @click="show_alert"></ion-icon>
        </li>
        <li class="header-menu__item">
            <button-vue @click="show_alert">
                Nâng cấp tài khoản
            </button-vue>
        </li>
    </ul>
</template>

<script setup lang="ts">
import Swal from 'sweetalert2';
import ButtonVue from '../Button/Button.vue';

const show_alert = (): void => {
    Swal.fire({
        position: 'top-end',
        padding: '1rem',
        toast: true,
        width: '30rem',
        icon: 'error',
        title: 'Nút này được tạo ra chỉ để bấm cho vui 😎',
        showConfirmButton: false,
        timer: 2500
    })
}
</script>

<style lang="scss" scoped>

</style>