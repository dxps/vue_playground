<template>
	<p>message: {{ $t('message') }}</p>
	<p>goodbye: {{ $t('goodbye') }}</p>
	<button @click="setLocale('en')" class="button">English</button>
	<button @click="setLocale('es')" class="button">Spanish</button>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'HelloI18n',
	methods: {
		setLocale(locale) {
			this.$i18n.locale = locale
		},
	},
})
</script>
