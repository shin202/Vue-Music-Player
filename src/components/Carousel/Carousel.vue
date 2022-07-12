<template>
  <swiper
    :slidesPerView="4"
    :spaceBetween="30"
    :modules="[Navigation, Autoplay, Lazy]"
    :navigation="{
      nextEl: '.swiper__button--next',
      prevEl: '.swiper__button--prev'
    }"
    :autoplay="{
      delay: 2500,
      disableOnInteraction: false,
    }"
    :lazy="true"
    :loop="true"
    class="carousel w-full mt-[2rem] h-[30rem]"
    :breakpoints="{
      '640': {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      '768': {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      '1024': {
        slidesPerView: 4,
        spaceBetween: 30,
      }
    }"
    v-if="!is_loading"
  >
    <swiper-slide v-for="item in items" class="bg-white rounded-[1rem] p-6 shadow-lg cursor-pointer">
      <router-link :to="`/playlist/${item.encodeId}`">
        <div class="slide__image w-full h-[70%] overflow-hidden mb-[1rem] relative">
          <img :data-src="item.thumbnailM" class="w-full h-full object-contain rounded-lg swiper-lazy relative z-10">
          <div class="absolute w-full h-full top-0 left-0 blur-xl" :style="{'backgroundImage': `url(${item.thumbnailM})`}"></div>
        </div>
        <div class="slide__content flex flex-col">
          <span class="slide__title text-primary font-bold truncate">{{ item.title }}</span>
          <span class="slide__desc text-[1.4rem] text-gr">{{ item.sortDescription }}</span>
        </div>  
      </router-link>
    </swiper-slide>
  </swiper>
  <!-- Skeleton Loading -->
  <swiper
    :slidesPerView="4"
    :spaceBetween="30"
    class="carousel w-full mt-[2rem] h-[30rem]"
    v-else
  >
    <swiper-slide v-for="i in 5" class="bg-white rounded-[1rem] shadow-lg cursor-pointer">
      <skeleton-loading/>
    </swiper-slide>
  </swiper>
  <!-- Skeleton Loading -->
  <!-- Navigation -->
  <div class="swiper__button absolute top-[10%] right-[7%] m-4 flex w-[3rem] h-[3rem] justify-between items-center">
    <div class="swiper__button--prev m-2 p-2 bg-white rounded text-gr hover:text-secondary cursor-pointer shadow-md leading-3">
      <ion-icon name="chevron-back-outline"></ion-icon>
    </div>
    <div class="swiper__button--next m-2 p-2 bg-white rounded text-gr hover:text-secondary cursor-pointer shadow-md leading-3">
      <ion-icon name="chevron-forward-outline"></ion-icon>
    </div>
  </div>
  <!-- Navigation -->
</template>
<script lang="ts" setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Autoplay, Lazy } from "swiper";
import "swiper/css/lazy";
import "swiper/css";
import SkeletonLoading from "../Skeleton/SkeletonLoading.vue";

interface playlist_type {
  encodeId: string,
  title: string,
  thumbnailM: string,
  releaseDate: string,
  sortDescription: string,
  artistsNames: string,
  contentLastUpdate: number,
  song: {
      items: [],
      total: number,
  }
}

const props = defineProps<{
  items: playlist_type[],
  is_loading?: boolean,
}>();

</script>
<style lang="scss" scoped>
.slide {
  &__image {
    > img {
      box-shadow: inset 0.2rem 0.2rem 0.5rem rgba(0, 0, 0, 0.25),
                  inset -0.2rem -0.2rem 0.5rem rgba(0, 0, 0, 0.1);
      border-right: 0.1rem solid rgba(0, 0, 0, 0.25);
      border-bottom: 0.1rem solid rgba(0, 0, 0, 0.25);
    }
  }

  &__desc {
    max-width: 100%;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}
</style>
