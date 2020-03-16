<template>
  <h1>Showing Event #{{ id }}</h1>
</template>

// tell the component that it expects a single prop named `id`
<script>
export default {
  props: ['id']
}
</script>
