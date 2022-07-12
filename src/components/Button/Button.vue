<template>
    <button class="btn bg-green-500 min-w-[5rem] h-[3.5rem] rounded p-2 hover:bg-green-400 focus:bg-green-400 text-white text-xl"
            :class="className"
    >
        <slot>
            Button
        </slot>
    </button>
</template>

<script setup lang="ts">
const props = defineProps({
    className: String,
})
</script>

<style lang="scss" scoped>
.btn {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>