<template>
    <div class="coll-full">
        <form @submit.prevent="save">
            <div class="form-group">
                <textarea v-model="postText" name="" id="" cols="30" rows="10" class="form-input" />
            </div>
            <div class="form-actions">
                <button class="btn-blue">Submit post</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            postText: ""
        }
    },
    methods: {
        save() {
            const post = {
                text: this.postText
            }
            this.$emit("save", { post })
            this.postText = ""
        }
    }
}
</script>

<style>
</style>
