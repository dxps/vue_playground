import srcData from "@/data.json"
import { createStore } from "vuex"

export default createStore({
    state: srcData,
    actions: {
        createPost(context, post) {
            post.id = "temp-dev-" + Math.random()
            context.commit("addPost", { post })
            context.commit("addPostRefToThread", { postId: post.id, threadId: post.threadId })
        }
    },
    mutations: {
        addPost(state, { post }) {
            state.posts.push(post)
        },
        addPostRefToThread(state, { postId, threadId }) {
            const thread = state.threads.find(thread => thread.id === threadId)
            thread.posts.push(postId)
        }
    }
})
