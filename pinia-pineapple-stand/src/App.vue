<script setup>
import TheHeader from "@/components/TheHeader.vue"
import ProductCard from "@/components/ProductCard.vue"
import { useProductStore } from "./stores/ProductStore"

// Destructuring, but having references to reactive props
// in the pinia store state. Useful for just accessing
// data from the state, but not calling any action.
// import { storeToRefs } from "pinia"
// const { products } = storeToRefs(useProductStore())

const productStore = useProductStore()
productStore.fill()
</script>

<template>
	<div class="container">
		<TheHeader />
		<ul class="sm:flex flex-wrap lg:flex-nowrap gap-5">
			<ProductCard v-for="product in productStore.products" :key="product.name" :product="product" />
		</ul>
	</div>
</template>
