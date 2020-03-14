Vue.component('product', {
  props: {
    premiumUser: {
      type: Boolean,
      required: true
    }
  },
  template: `
    <div class="product">
        <div class="product-image">
          <img :src="image" />
        </div>

        <div class="product-info">
          <h2>{{ title }}</h2>

          <p v-if="inStock > 10">In Stock</p>
          <p v-else-if="inStock <= 10 && inStock > 0">Almost Sold Out</p>
          <p v-else>Out of Stock</p>

          <p v-show="onSale">On Sale!</p>
          <p>Shipping: {{ shipping }}</p>

          <product-details :details="details"></product-details>

          <div
            v-for="(variant, index) in variants"
            :key="variant.id"
            class="color-box"
            :style="{ backgroundColor: variant.color }"
            @mouseover="updateProductImage(index)"
          ></div>

          <button
            @click="addToCart"
            :disabled="!inStock"
            :class="{ disabledButton: !inStock}"
          >Add to Cart</button>
          <button
            @click="removeFromCart"
          >Remove from Cart</button>
        </div>
      </div>
      `,
  data() {
    return {
      brand: 'Vue Mastery',
      product: 'Socks',
      selectedVariantIndex: 0,
      onSale: true,
      details: ['80% cotton', '20% polyester', 'Gender-neutral'],
      variants: [
        {
          id: 2234,
          color: 'green',
          image: './assets/vmSocks-green-onWhite.jpg',
          quantity: 9
        },
        {
          id: 2235,
          color: 'blue',
          image: './assets/vmSocks-blue-onWhite.jpg',
          quantity: 0
        }
      ]
    }
  },
  methods: {
    addToCart: function() {
      this.$emit('add-to-cart', this.variants[this.selectedVariantIndex].id)
    },
    removeFromCart: function() {
      this.$emit(
        'remove-from-cart',
        this.variants[this.selectedVariantIndex].id
      )
    },
    updateProductImage: function(index) {
      this.selectedVariantIndex = index
    }
  },
  computed: {
    title() {
      return this.brand + ' ' + this.product
    },
    image() {
      return this.variants[this.selectedVariantIndex].image
    },
    inStock() {
      return this.variants[this.selectedVariantIndex].quantity
    },
    shipping() {
      return this.premiumUser ? 'free' : 2.99
    }
  }
})

Vue.component('product-details', {
  props: {
    details: {
      type: Array,
      required: true
    }
  },
  template: `
    <ul>
        <li v-for="detail in details">{{ detail }}</li>
    </ul>
    `
})

var app = new Vue({
  el: '#app',
  data: {
    premiumUser: true,
    cart: []
  },
  methods: {
    updateCart(id) {
      this.cart.push(id)
    },
    removeFromCart(id) {
      for (var i = this.cart.length - 1; i >= 0; i--) {
        if (this.cart[i] === id) {
          this.cart.splice(i, 1)
        }
      }
    }
  }
})
