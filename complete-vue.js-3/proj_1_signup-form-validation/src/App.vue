<template>

  <my-input 
    name="Username"
  />

  <my-button 
    color="white"
    background="darkslateblue"
    :disabled="!valid"
  />

</template>



<script>

import MyButton from './comps/MyButton.vue'
import MyInput from './comps/MyInput.vue'

export default {
    components: { 
      MyButton, 
      MyInput },
    data() {
      return {
        valid: false
      }
    }
  
}

</script>



<style>

body {
  font-family: Arial;
}

</style>
