<template>
  
  <my-button 
    color="white"
    background="darkslateblue"
    :disabled="!valid"
  />

</template>



<script>

import MyButton from './comps/MyButton.vue'

export default {
    components: { MyButton },
    data() {
      return {
        valid: false
      }
    }
  
}

</script>



<style scoped>

</style>
