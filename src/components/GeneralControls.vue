<script setup>
import { computed, watch } from 'vue';
import router from '@/router/index';

const routerName = computed(() => {
  return String(router.currentRoute.value.name);
});

const oops = () => {
  console.log(routerName.value);
};

watch(routerName, oops);
</script>

<template>
  <p>{{ routerName }}</p>
</template>
