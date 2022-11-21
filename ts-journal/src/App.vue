<script setup lang="ts">
import EntryCard from "@/components/EntryCard.vue"
import EntryEditor from "@/components/EntryEditor.vue"
import TheHeader from "@/components/TheHeader.vue"
import { userInjectionKey } from "@/types/injectionKeys"
import { provide, reactive } from "vue"
import type Entry from "@/types/Entry"
import type User from "@/types/User"

const user: User = reactive({
  id: 1,
  username: "dxps",
  settings: [],
})

const entries: Entry[] = reactive([])

// Provide the User, so that any child component could inject it.
provide(userInjectionKey, user)

console.log(`Username is ${user.username}`)

const handleCreateEntry = (entry: Entry) => {
  entries.push(entry)
}
</script>

<template>
  <main class="container m-auto p-10">
    <TheHeader />
    <EntryEditor @@create="handleCreateEntry" />
    <ul>
      <li v-for="entry in entries" :key="entry.id">
        <EntryCard :entry="entry" />
      </li>
    </ul>
  </main>
</template>
