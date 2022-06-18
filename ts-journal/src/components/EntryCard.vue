<script lang="ts" setup>
import DateDisplay from "./DateDisplay.vue"
import UseEmojis from "@/composables/UseEmojis"
import type Entry from "@/types/Entry"

// We can define the props using the runtime based declaration by passing an object.
// That's similar with the vanilla JavaScript approach: defineProps({ myProp: { type: String }})
// Here we use the type based declaration for our props:
// - using <> (angle brackets) for generic type arguments
// - and passing in an object literal containing the props we want to define.
// Note that the type based declaration is preferred and you cannot use both types within a component.
defineProps<{
  entry: Entry
}>()

const { findEmoji } = UseEmojis()
</script>
<template>
  <div class="entry-card">
    <div class="entry-card-body">
      <component width="75" :is="findEmoji(entry.emoji)"></component>
      <div class="entry-text">{{ entry.body }}</div>
    </div>
    <div class="entry-footer">
      <DateDisplay :date="entry.createdAt" class="mr-2" />
      |
      <span class="ml-2">myself</span>
    </div>
  </div>
</template>
