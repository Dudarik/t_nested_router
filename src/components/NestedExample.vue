<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import DynamicRouter from './DynamicRouter.vue';

const route = useRoute();

const pathSegments = computed(() =>
  route.path
    .replace(/^\/|\/$/g, '')
    .split('/')
    .filter((segment) => segment)
);

const isProductPage = computed(
  () => pathSegments.value.includes('product') && pathSegments.value.length >= 2
);

const isCategoryPage = computed(
  () =>
    pathSegments.value.includes('category') && pathSegments.value.length >= 1
);

const productId = computed(() => {
  if (isProductPage.value) {
    const productIndex = pathSegments.value.indexOf('product');
    return pathSegments.value[productIndex + 1] || null;
  }
  return null;
});

const category = computed(() => {
  if (isProductPage.value || isCategoryPage.value) {
    const targetIndex = isProductPage.value
      ? pathSegments.value.indexOf('product') - 1
      : pathSegments.value.indexOf('category') + 1;
    return pathSegments.value[targetIndex] || null;
  }
  return null;
});

const segmentCount = computed(() => pathSegments.value.length);
</script>

<template>
  <dynamic-router>
    <template #content1>
      <div class="nested-example">
        <h3>Вложенный контент для пути: {{ $route.path }}</h3>

        <div v-if="isProductPage">
          <h4>Страница продукта</h4>
          <p>ID продукта: {{ productId }}</p>
          <p>Категория: {{ category }}</p>
        </div>

        <div v-else-if="isCategoryPage">
          <h4>Страница категории</h4>
          <p>Категория: {{ category }}</p>
        </div>

        <div v-else>
          <h4>Общая страница</h4>
          <p>Количество сегментов: {{ segmentCount }}</p>
        </div>
      </div>
    </template>
  </dynamic-router>
</template>
