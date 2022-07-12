<template>
  <div class="profile-card flex flex-col justify-center items-center h-[16rem]">
    <div class="profile-card__avatar relative">
      <div
        class="profile-card__image border-2 border-green-400 w-[5rem] h-[5rem] lg:w-[6.6rem] lg:h-[6.6rem] md:w-[5rem] md:h-[5rem] sm:w-[5rem] sm:h-[5rem] rounded-[50%] overflow-hidden"
      >
        <img :src="avatar" :alt="avatar" class="h-full w-full object-cover" />
      </div>
      <span v-if="vip"
        class="profile-card__badge absolute top-[15%] left-[70%] text-base inline-block w-[3rem] h-[1.5rem] text-center leading-[1.5] text-white rounded-[1rem]"
        >VIP</span
      >
    </div>
    <h3 class="profile-card__name mt-4 lg:text-4xl md:text-2xl sm:text-2xl text-2xl font-bold">
      {{ name }}
    </h3>
    <span class="profile-card__email text-gr text-xl invisible lg:visible md:invisible sm:invisible">
      {{ email }}
    </span>
  </div>
</template>

<script setup lang="ts">
interface profile {
  avatar: string;
  name: string;
  email: string;
  vip: boolean;
}

const props = defineProps<profile>();
</script>

<style lang="scss" scoped>
.profile-card {
  &__badge {
    background-image: linear-gradient(to right, #ff7a84 20%, #ff0723 100%);
  }
}
</style>
