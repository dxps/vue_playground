import { defineStore } from "pinia";

export const useCartStore = defineStore("CartStore", {
  state: () => {
    return {
      items: [],
    }
  },
  actions: {
    addItems(count, item) {
      count = parseInt(count)
      for (let idx = 0; idx < count; idx++) {
        // Note that we use this '{... item}' construct to clone the item,
        // instead of passing it by reference.
        this.items.push({ ...item })
      }
    }
  }
});

