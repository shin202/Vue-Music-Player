<template>
  <div class="heading relative pl-[1rem] pr-[1rem] mb-1">
    <div class="heading__content flex flex-col gap-2">
      <h2 class="heading__title text-[2.5rem] font-bold h-[3.5rem] max-h-[3.5rem] truncate">
        <slot name="title"> Sample Title </slot>
      </h2>
      <span class="heading__desc text-xl text-gr h-[2rem] max-h-[2rem] truncate">
        <slot name="desc"> Sample Desc </slot>
      </span>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
