<template>
    <div>PageHome</div>

    <div v-for="thread in threads" :key="thread.id">
        <h2>{{ thread.title }}</h2>
        <div v-for="postId in thread.posts" :key="postId">
            <p>
                {{ userById(postById(postId).userId).name }}
            </p>
            <p>{{ postById(postId).text }}</p>
        </div>
    </div>
</template>

<script>
import srcData from "@/data.json";

export default {
    data() {
        return {
            threads: srcData.threads,
            posts: srcData.posts,
            users: srcData.users,
        };
    },
    methods: {
        postById(postId) {
            return this.posts.find((p) => p.id === postId);
        },
        userById(userId) {
            return this.users.find((u) => u.id === userId);
        },
    },
};
</script>

<style scoped>
</style>
