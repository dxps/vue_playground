<template>
    <form class="form" @submit.prevent="submit">
        <my-input
            name="Username"
            type="text"
            :rules="{ required: true, min: 5 }"
            :value="username.value"
            @update="update"
        />

        <my-input
            name="Password"
            type="password"
            :rules="{ required: true, min: 8 }"
            :value="password.value"
            @update="update"
        />

        <my-button
            color="white"
            background="darkslateblue"
            :disabled="!valid"
        />
    </form>
</template>



<script>
import MyButton from "./comps/MyButton.vue";
import MyInput from "./comps/MyInput.vue";

export default {
    components: {
        MyButton,
        MyInput,
    },
    data() {
        return {
            username: {
                value: "",
                valid: false,
            },
            password: {
                value: "",
                valid: false,
            },
        };
    },
    computed: {
        valid() {
            return this.username.valid && this.password.valid;
        },
    },
    methods: {
        update(payload) {
            this[payload.name.toLowerCase()] = {
                value: payload.value,
                valid: payload.valid,
            };
        },
        submit($evt) {
            console.log("Form submitted. Event =", $evt);
        },
    },
};
</script>



<style>
body {
    font-family: Arial;
}

.form {
    max-width: 400px;
    width: 50%;
}
</style>
