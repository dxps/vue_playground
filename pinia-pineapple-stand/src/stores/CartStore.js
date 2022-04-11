import { defineStore } from "pinia";
import { groupBy } from "lodash";

export const useCartStore = defineStore("CartStore", {
  state: () => {
    return {
      items: [],
    }
  },
  getters: {
    count: (state) => state.items.length,
    isEmpty: (state) => state.count === 0,
    grouped: (state) => groupBy(state.items, (item) => item.name),
    // This 'groupCount' is like a "dynamic getter".
    groupCount: (state) => (name) => state.grouped[name].length,
    totalPrice: (state) => state.items.reduce((prev, curr) => prev + curr.price, 0)
  },
  actions: {
    addItems(count, item) {
      count = parseInt(count)
      for (let idx = 0; idx < count; idx++) {
        // Note that we use this '{... item}' construct to clone the item,
        // instead of passing it by reference.
        this.items.push({ ...item })
      }
    },
    removeItem(itemName) {
      this.items = this.items.filter((elem) => item.name !== itemName)
    }
  }
});
