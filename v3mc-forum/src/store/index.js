import srcData from "@/data.json"
import { createStore } from "vuex"

export default createStore({
    state: {
        ...srcData,
        authId: "ALXhxjwgY9PinwNGHpfai6OWyDu2"
    },
    getters: {
        authUser: state => {
            const user = state.users.find(user => user.id === state.authId)
            if (!user) return null
            return {
                ...user,
                get posts() {
                    return state.posts.filter((post) => post.userId === user.id)
                },
                get postsCount() {
                    return this.posts.length
                },
                get threads() {
                    return state.threads.filter((thread) => thread.userId === user.id)
                },
                get threadsCount() {
                    return this.threads.length
                }
            }
        }
    },
    actions: {
        createPost({ commit, state }, post) {
            post.id = "temp-dev-" + Math.random()
            post.userId = state.authId
            post.publishedAt = Math.floor(Date.now() / 1000)
            commit("addPost", { post })
            commit("addPostRefToThread", { postId: post.id, threadId: post.threadId })
        },
        updateUserProfile({ commit }, user) {
            commit("setUserProfile", { user, userId: user.id })
        }
    },
    mutations: {
        addPost(state, { post }) {
            state.posts.push(post)
        },
        addPostRefToThread(state, { postId, threadId }) {
            const thread = state.threads.find(thread => thread.id === threadId)
            thread.posts.push(postId)
        },
        setUserProfile(state, { user, userId }) {
            const userIdx = state.users.findIndex(user => user.id === userId)
            state.users[userIdx] = user
        }
    }
})
