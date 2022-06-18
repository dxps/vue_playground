<script lang="ts" setup>
import EmojiField from "@/components/EmojiField.vue"
import ArrowCircleRight from "@/assets/icons/arrow-circle-right.svg"
import type Emoji from "@/types/Emoji"
import { computed, ref } from "vue"
import type Entry from "@/types/Entry"

// Data

const body = ref("")
const emoji = ref<Emoji | null>(null)
const charCount = computed(() => body.value.length)
const maxChars = 280

// Events

// Instead of using a runtime declaration specified as defineEmits(["@create"])
// we use a type declaration to define our custom events.
// <> means we're using the type assertion.
// {} means we're passing a type literal as the type argument.
// Within the literal, we're passing a call signature.
// After the event name, the event payload can have any arbitrary name like `entry`.
const emit = defineEmits<{
  (e: "@create", entry: Entry): void
}>()

// Methods

const handleTextInput = (ev: Event) => {
  const textarea = ev.target as HTMLTextAreaElement
  if (textarea.value.length <= maxChars) {
    body.value = textarea.value
  } else {
    body.value = textarea.value = textarea.value.substring(0, 280)
  }
}

const handleSubmit = () => {
  const entry: Entry = {
    id: Math.random(),
    userId: 1,
    createdAt: new Date(),
    body: body.value,
    emoji: emoji.value,
  }
  emit("@create", entry)
  body.value = ""
  emoji.value = null
}
</script>
<template>
  <form class="entry-form" @submit.prevent="handleSubmit">
    <textarea
      :value="body"
      @keyup="handleTextInput"
      placeholder="New Journal Entry"
    ></textarea>
    <EmojiField v-model="emoji" />
    <div class="entry-form-footer">
      <span>{{ charCount }} / {{ maxChars }}}</span>
      <button>Remember <ArrowCircleRight width="20" /></button>
    </div>
  </form>
</template>
