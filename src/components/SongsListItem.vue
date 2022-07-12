<template>
    <li class="songs__item sticky bottom-0 flex justify-around items-center gap-[1rem] bg-white m-4 p-4 h-[6rem] max-h-[6rem] shadow-md rounded-lg"
        :class="{ 'favorited': is_fav }">
        <slot />
        <span class="songs__order font-bold max-w-[3rem] w-[3rem]">
            <slot name="order" />
        </span>
        <div class="songs__image w-[4rem] h-[4rem] overflow-hidden rounded">
            <slot name="image" />
        </div>
        <div class="songs__play text-gr text-3xl cursor-pointer">
            <slot name="play-button">

            </slot>
        </div>
        <span class="songs__name font-bold max-w-[10rem] w-[10rem] text-center">
            <slot name="name" />
        </span>
        <span class="songs__artists text-gr max-w-[12rem] w-[12rem]">
            <slot name="artist" />
        </span>
        <span class="songs__duration text-gr max-w-[4.5rem] w-[4.5rem] hidden lg:inline md:inline sm:inline">
            <slot name="duration" />
        </span>
        <div class="songs__fav text-gr text-3xl cursor-pointer" @click="toggle_fav">
            <slot name="fav">
            </slot>
        </div>
    </li>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const is_fav = ref<boolean>(false);

const toggle_fav = (): void => {
    is_fav.value = !is_fav.value;
}
</script>

<style lang="scss" scoped>
.songs {

    &__order,
    &__duration {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    &__name,
    &__artists {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    &__fav {
        transition: all 0.2s cubic-bezier(.49, .26, .19, .37);
    }

    &__item.favorited>&__fav {
        @apply text-red-400;
    }

    &__item.playing {
        @apply border-2 border-green-400;
        box-shadow: 0 0 1rem rgb(74, 222, 128, 1),
            0 0 2rem rgba(74, 222, 128, 1),
            0 0 4rem rgba(74, 222, 128, 1);
        backdrop-filter: blur(1rem);
        animation: hue 5s cubic-bezier(.49, .26, .19, .37) infinite alternate;

        @keyframes hue {
            0% {
                filter: hue-rotate(0deg);
            }

            100% {
                filter: hue-rotate(360deg);
            }
        }
    }
}
</style>