<script setup lang="ts">
import { Dish } from '@/types'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import DishCard from '../components/DishCard.vue'
import NewDishForm from '../components/NewDishForm.vue'
import EditDishForm from '../components/EditDishForm.vue'
import SideMenu from '../components/SideMenu.vue'
import { useDishStore } from '@/store/DishStore'

// -----------
// Dish module
// -----------

const dishStore = useDishStore()
// TODO: Is there a better way? Maybe a store getter?
const dishList = computed(() => dishStore.list)

const filterText = ref('')

const filteredDishList = computed((): Dish[] => {
  return dishList.value.filter((dish) => {
    if (dish.name) {
      return dish.name.toLowerCase().includes(filterText.value.toLowerCase())
    } else {
      return dishList
    }
  })
})

const numberOfDishes = computed((): number => {
  return filteredDishList.value.length
})

// ---------------
// New Form module
// ---------------

type ShowFormState = '' | 'new' | 'edit'

const showForm = ref<ShowFormState>('')

const addDish = (payload: Dish) => {
  dishStore.addDish(payload)
  hideForm()
}

const editDish = ref<Dish>(new Dish())

const editDishForm = (payload: Dish) => {
  editDish.value = payload
  showForm.value = 'edit'
}

const updateDish = (payload: Dish) => {
  dishStore.updateDish(payload)
  hideForm()
}

const hideForm = () => {
  showForm.value = ''
}

onMounted(() => {
  const route = useRoute()
  if (route.query.new) {
    showForm.value = 'new'
  } else if (route.query.edit) {
    showForm.value = 'edit'
  }
})

const updateFilterText = (event: KeyboardEvent) => {
  filterText.value = (event.target as HTMLInputElement).value
}
</script>

<template>
  <main class="section">
    <div class="columns">
      <!-- Side Menu -->
      <SideMenu />

      <!-- Main Content -->
      <div class="column">
        <h1 class="title">Dishes</h1>

        <!-- CTA Bar -->
        <nav v-if="!showForm" class="level">
          <div class="level-left">
            <div class="level-item">
              <p class="subtitle is-5">
                <strong>{{ numberOfDishes }}</strong> dishes
              </p>
            </div>

            <p class="level-item">
              <button @click="showForm = 'new'" class="button is-success">New</button>
            </p>

            <div class="level-item is-hidden-tablet-only">
              <div class="field has-addons">
                <p class="control">
                  <input
                    class="input"
                    type="text"
                    placeholder="Dish name"
                    :value="filterText"
                    @keyup.enter="updateFilterText"
                  />
                </p>
                <p class="control">
                  <button class="button">Search</button>
                </p>
              </div>
            </div>
          </div>
        </nav>

        <!-- New Dish Form -->
        <NewDishForm v-if="showForm === 'new'" @add-new-dish="addDish" @cancel-new-dish="hideForm" />

        <!-- Edit Dish Form -->
        <EditDishForm
          v-else-if="showForm === 'edit'"
          :dish="editDish"
          @cancel-edit-dish="hideForm"
          @update-dish="updateDish"
        />

        <!-- Display Results -->
        <div v-else class="columns is-multiline">
          <div v-for="item in filteredDishList" class="column is-full" :key="`item-${item}`">
            <DishCard :dish="item" @delete-dish="dishStore.deleteDish" @edit-dish="editDishForm" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style></style>
