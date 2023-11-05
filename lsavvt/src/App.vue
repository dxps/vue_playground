<script setup lang="ts">
import ItemsListComp from './components/ItemsList.comp.vue'

// Mocking some data.
const items: any[] = [
	{ id: 1, name: 'Item 1' },
	{ id: 2, name: 'Item 2' },
	{ id: 3, name: 'Item 3' },
]
</script>

<template>
	<div class="home">
		<ItemsListComp :items="items" />
	</div>
</template>

<style scoped></style>
