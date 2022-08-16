<template>
  <Header/>
  <Transition name="fade-slide">
      <Credential v-show="isShowForm"/>
  </Transition>
  <RouterView v-slot="{ Component }">
    <KeepAlive>
        <component :is="Component"/>
    </KeepAlive>
  </RouterView>
  <NavigationMenu/>
</template>

<script setup lang="ts">
import Header from './components/Header/Header.vue';
import NavigationMenu from './components/Navigation/NavigationMenu.vue';
import Credential from "./components/Form/Credential.vue";
import { toRefs, watch } from 'vue';
import { useGlobal } from './stores/Global';

const { isShowForm } = toRefs(useGlobal());
const { handleClickOutsideFormModal } = useGlobal();

watch(isShowForm, (newValue, oldValue) => {
  newValue !== oldValue && handleClickOutsideFormModal();
})
</script>

<style lang="scss" scoped>

.fade-slide-enter-active {
    transition: transform 0.9s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.9s cubic-bezier(0.19, 1, 0.22, 1);
}
.fade-slide-leave-active {
    transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.5s cubic-bezier(0.19, 1, 0.22, 1);
}

.fade-enter-to {
    opacity: 1;
    transform: translate(-50%, -50%);
}

.fade-leave-from {
    opacity: 1;
    transform: translate(-50%, -50%);
}

.fade-slide-enter-from {
    opacity: 0;
    transform: translate(-50%, -100%);
}
.fade-slide-leave-to {
    opacity: 0;
    transform: translate(-50%, 50%);
}
</style>
