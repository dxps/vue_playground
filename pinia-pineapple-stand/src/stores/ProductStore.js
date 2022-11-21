import { defineStore } from "pinia";

export const useProductStore = defineStore("ProductStore", {

  // state
  // -----

  state: () => {
    return { products: [] }
  },

  // actions - meant to mutate the data in the store
  // -------

  actions: {
    async fill() {
      // Simulating a real world case when data is fetched from an external API.
      // In this case, we use a dynamic import to fetch it from the JSON file.
      // We can even see this as a request in the DevTools, Network tab.
      this.products = (await import("@/data/products.json")).default
    }
  }

  // getters
  // -------


})
