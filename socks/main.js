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

        <div></div>
            <h2>Reviews</h2>
            <p v-if="!reviews.length">There are no reviews yet.</p>
            <ul>
                <li v-for="review in reviews">
                    <p>Rating: {{ review.rating }} by Name: {{ review.name }}</p>
                    <p>Review: {{ review.review }}</p>
                </li>
            </ul>
        </div>

        <product-review @review-submitted="addReview"></product-review>

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
      ],
      reviews: []
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
    },
    addReview(productReview) {
      this.reviews.push(productReview)
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

Vue.component('product-review', {
  template: `
    <form class="review-form" @submit.prevent="onSubmit">
        <p v-if="errors.length">
            <b>Please correct the following error(s):</b>
            <ul>
                <li v-for="error in errors">{{ error }}</li>
            </ul>
        </p>
        <p>
            <label for="name">Name:</label>
            <input id="name" v-model="name" placeholder="name">
        </p>
        <p>
            <label for="review">Review:</label>
            <textarea id="review" v-model="review"></textarea>
        </p>
        <p>
            <label for="rating">Rating:</label>
            <select id="rating" v-model.number="rating">
                <option>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
                <option>1</option>
            </select>
        </p>
        <p>
        <input type="submit" value="Submit">  
        </p>
    </form>
    `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      errors: []
    }
  },
  methods: {
    onSubmit() {
      if (this.name && this.review && this.rating) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating
        }
        this.$emit('review-submitted', productReview)
        this.name = null
        this.review = null
        this.rating = null
      } else {
        if (!this.name) this.errors.push('Name required.')
        if (!this.review) this.errors.push('Review required.')
        if (!this.rating) this.errors.push('Rating required.')
      }
    }
  }
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
