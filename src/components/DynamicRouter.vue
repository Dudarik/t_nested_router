<script lang="ts" setup>
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
// const router = useRouter();

const currentPath = computed(() => route.path);

const pathSegments = computed(() => {
  const path = route.path;

  return path
    .replace(/^\/|\/$/g, '')
    .split('/')
    .filter((segment) => segment);
});

const queryParams = computed(() => route.query);
const hasQueryParams = computed(() => Object.keys(route.query).length > 0);

const generatePath = (index: any) =>
  `/${pathSegments.value.slice(0, index + 1).join('/')}`;

watch(currentPath, (newPath) => {
  console.log('Путь изменился:', newPath);
});

// const navigateToPath = (path: any) => {
//   router.push(path);
// };

// const getSegment = (index: number) => pathSegments.value[index] || null;

// const hasSegment = (segment: string) => pathSegments.value.includes(segment);

// const getSegmentIndex = (segment: string) =>
//   pathSegments.value.indexOf(segment);
</script>

<template>
  <div class="dynamic-router">
    <div class="breadcrumbs">
      <span
        v-for="(segment, index) in pathSegments"
        :key="index"
        class="breadcrumb-item"
      >
        <router-link
          v-if="index < pathSegments.length - 1"
          :to="generatePath(index)"
        >
          {{ segment }}
        </router-link>
        <span v-else class="current">
          {{ segment }}
        </span>
        <span v-if="index < pathSegments.length - 1" class="separator">/</span>
      </span>
    </div>

    <div class="content">
      <h2>Текущий путь: {{ currentPath }}</h2>
      <div class="path-info">
        <h3>Сегменты пути:</h3>
        <ul>
          <li v-for="(segment, index) in pathSegments" :key="index">
            {{ index }}: {{ segment }}
          </li>
        </ul>
      </div>

      <div class="query-params" v-if="hasQueryParams">
        <h3>Query параметры:</h3>
        <ul>
          <li v-for="(value, key) in queryParams" :key="key">
            {{ key }}: {{ value }}
          </li>
        </ul>
      </div>

      <!-- Место для вложенного контента -->
      <div class="nested-content">
        <slot name="content1">
          <p>Слот для контента</p>
        </slot>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.dynamic-router {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;

  .breadcrumbs {
    margin-bottom: 20px;
    padding: 10px;
    background-color: #f5f5f5;
    border-radius: 4px;
    .breadcrumb-item {
      display: inline-flex;
      align-items: center;
      a {
        color: #007bff;
        text-decoration: none;
        padding: 4px 8px;
        border-radius: 4px;
        transition: background-color 0.2s;
      }

      a:hover {
        background-color: #e9ecef;
      }

      .current {
        font-weight: bold;
        color: #495057;
        padding: 4px 8px;
      }
    }
  }

  .separator {
    margin: 0 8px;
    color: #6c757d;
  }

  .content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    .path-info,
    .query-params {
      ul {
        list-style: none;
        padding: 0;
      }
    }

    .path-info,
    .query-params {
      li {
        padding: 4px 0;
        border-bottom: 1px solid #eee;
      }
    }

    .nested-content {
      margin-top: 30px;
      padding: 20px;
      border: 2px dashed #dee2e6;
      border-radius: 8px;
    }
  }
}
</style>
