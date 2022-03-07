<template>
    <h1>{{ category.name }}</h1>
    <forum-list :title="category.name" :forums="getForumsForCategory(category)" />
</template>

<script>
import srcDate from "@/data.json"
import ForumList from "@/components/ForumList"

export default {
    props: {
        id: { required: true, type: String }
    },
    computed: {
        category() {
            return srcDate.categories.find((category) => category.id === this.id)
        }
    },
    components: { ForumList },
    methods: {
        getForumsForCategory(category) {
            return srcDate.forums.filter((forum) => forum.categoryId === category.id)
        }
    }
}
</script>

<style>
</style>
