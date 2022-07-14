<template>
  <div class="search-box h-full relative">
    <input
      type="search"
      name="search"
      class="outline-none w-full h-[4rem] rounded-[5rem] px-14 py-8 border-[0.1rem] border-solid border-gray-300"
      placeholder="Tìm kiếm bài hát, ca sĩ, albums..."
      autocomplete="off"
      disabled
    />
    <!-- Icon -->
    <ion-icon
      name="search-outline"
      class="absolute top-[50%] left-[1.5rem] translate-y-[-60%] text-3xl text-gr"
    />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.search-box {
  width: clamp(10rem, 70%, 45rem);
  > input {
    &::placeholder {
      visibility: hidden;

      @media (min-width: 640px) {
        visibility: visible;
      }

      @media (min-width: 768px) {
        visibility: visible;
      }

      @media (min-width: 1024px) {
        visibility: visible;
      }
    }
  }
}
</style>
