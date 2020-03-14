var app = new Vue({
  el: '#app',
  data: {
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
    ],
    cart: 0
  },
  methods: {
    addToCart: function() {
      this.cart += 1
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
    }
  }
})
