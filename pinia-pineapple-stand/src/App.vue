<script setup>
import TheHeader from "@/components/TheHeader.vue"
import ProductCard from "@/components/ProductCard.vue"
import { useProductStore } from "./stores/ProductStore"
import { useCartStore } from "./stores/CartStore"

// Example of destructuring, but having references to reactive props in the pinia store state.
// This is useful when you're only using state from the store, but not for calling any action.
// import { storeToRefs } from "pinia"
// const { products } = storeToRefs(useProductStore())

const productStore = useProductStore()
productStore.fill()

const cartStore = useCartStore()
</script>

<template>
	<div class="container">
		<TheHeader />
		<ul class="sm:flex flex-wrap lg:flex-nowrap gap-5">
			<ProductCard
				v-for="product in productStore.products"
				:key="product.name"
				:product="product"
				@addToCart="cartStore.addItems($event, product)"
			/>
		</ul>
	</div>
</template>
