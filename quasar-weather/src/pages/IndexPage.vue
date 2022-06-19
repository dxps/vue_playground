<template>
  <q-page class="row items-center justify-evenly">
    <example-component
      title="Example Component"
      active
      :todos="todos"
      :meta="meta"
    ></example-component>
  </q-page>
</template>

<script setup lang="ts">
import { Todo, Meta } from 'components/models';
import ExampleComponent from 'components/ExampleComponent.vue';
import { ref } from 'vue';

const todos = ref<Todo[]>([
  {
    id: 1,
    content: 'todo 1',
  },
  {
    id: 2,
    content: 'todo 2',
  },
  {
    id: 3,
    content: 'todo 3',
  },
  {
    id: 4,
    content: 'todo 4',
  },
  {
    id: 5,
    content: 'todo 5',
  },
]);

const meta = ref<Meta>({
  totalCount: 1000,
});
</script>
