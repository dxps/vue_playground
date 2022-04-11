import { defineStore } from "pinia";
import { groupBy } from "lodash";
import { useAuthUserStore } from "./AuthUserStore";

export const useCartStore = defineStore("CartStore", {

  state: () => {
    return {
      items: [],
    }
  },

  getters: {
    count: (state) => state.items.length,
    isEmpty: (state) => state.count === 0,
    grouped: (state) => {
      const grouped = groupBy(state.items, (item) => item.name)
      const sorted = Object.keys(grouped).sort()
      let inOrder = {}
      sorted.forEach(key => inOrder[key] = grouped[key])
      return inOrder
    },
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
      this.items = this.items.filter((item) => item.name !== itemName)
    },
    setItemCount(item, count) {
      this.removeItem(item.name)
      this.addItems(count, item)
    },
    checkout() {
      const authUserStore = useAuthUserStore()
      alert(`${authUserStore.username} bought ${this.count} items at a total of $${this.totalPrice}`)
    }
  }

});
