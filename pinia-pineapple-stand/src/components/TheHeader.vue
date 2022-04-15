<!--
  Using the Vue 3's Composition API
-->
<!-- <script setup>
import CartWidget from "./CartWidget.vue"
</script> -->

<!--
  Using the Vue 3's Options API
  - to declare the component
  - use Pinia's state
 -->
<script>
import CartWidget from "@/components/CartWidget.vue"
import { useAuthUserStore } from "../stores/AuthUserStore"
import { mapState } from "pinia"

export default {
	components: { CartWidget },
	computed: {
		// Standard mapping:
		// ...mapState(useAuthUserStore, ["username"]),
		// Mapping to a local (custom) variable:
		...mapState(useAuthUserStore, {
			currUser: "username",
		}),
		// Mapping locally could also use a function, such as:
		// currUser: store => `Hello ${store.username}`
	},
}
</script>

<template>
	<header
		class="flex justify-between p-6 mb-10 items-center"
		style="background-image: url('/images/double-bubble-outline.png')"
	>
		<h1 class="text-4xl text-gray-700 font-bold">The Pineapple Stand</h1>
		<div>
			<span class="mr-5">{{ currUser }}</span>
			<CartWidget class="inline-block" />
		</div>
	</header>
</template>
