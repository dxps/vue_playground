<template>

    <div class="input">
        <div class="label">
            <label :for="name">{{ name }}</label>
            <div class="error">{{ error }}</div>
        </div>
        <input 
            :id="name"
            type="text"
            v-model="value"
        />
    </div>
  
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            required: true
        },
        rules: {
            type: Object // includes: min, required
        }
    },
    data() {
        return {
            value: ''
        }
    },
    computed: {
        error() {
            if (this.rules.required && !this.value) {
                return 'Required'
            }
            if (this.rules.min && this.value.length < this.rules.min) {
                return `Minimum length is ${this.rules.min}`
            }
        }
    }
}
</script>

<style scoped>

.input {
    display: flex;
    flex-direction: column;
}

.error {
    color: red;
}

.label {
    display: flex;
    justify-content: space-between;
}

input {
  background: none;
  border: 1px solid silver;
  border-radius: 8px;
  box-sizing: border-box;
  color: black;
  font-size: 16px;
  margin: 5px 0;
  padding: 10px;
  width: 100%;
}

</style>