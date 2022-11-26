<script setup lang="ts">
import type { Dish } from '@/types'
import { onMounted, ref } from 'vue'

const props = defineProps<{ dish: Dish }>()

const emit = defineEmits<{
  (e: 'update-dish', dish: Dish): void
  (e: 'cancel-edit-dish'): void
}>()

const updatedDishName = ref(props.dish.name)

const updateDish = () => {
  emit('update-dish', { ...props.dish, name: updatedDishName.value })
}

const cancelEditDish = () => {
  emit('cancel-edit-dish')
}

// Autofocus on name input.
const elNameInput = ref<HTMLInputElement | null>(null)
onMounted(() => {
  elNameInput.value?.focus()
})
</script>

<template>
  <form @submit.prevent>
    <div class="field">
      <div class="field">
        <label for="name" class="label">Name ({{ props.dish.id }}})</label>
        <div class="control">
          <input
            v-model="updatedDishName"
            type="text"
            class="input is-large"
            placeholder="Mystery Flavored Shrimp"
            ref="elNameInput"
          />
        </div>
      </div>
      <div class="field">
        <div class="buttons">
          <button @click="updateDish" class="button is-success">Update</button>
          <button @click="cancelEditDish" class="button is-light">Cancel</button>
        </div>
      </div>
    </div>
  </form>
</template>

<style></style>
