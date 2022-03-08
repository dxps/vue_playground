import { createRouter, createWebHistory } from "vue-router"
import Home from "@/pages/Home"
import ThreadShow from "@/pages/ThreadShow"
import Category from "@/pages/Category"
import Forum from "@/pages/Forum"
import Profile from "@/pages/Profile"
import NotFound from "@/pages/NotFound"
import store from "@/store"

const routes = [
    { path: "/", name: "Home", component: Home },
    {
        path: "/thread/:id",
        name: "ThreadShow",
        component: ThreadShow,
        props: true,
        beforeEnter(to, from, next) {
            const threadExists = store.state.threads.find(thread => thread.id === to.params.id)
            if (threadExists) {
                return next()
            } else {
                // Show the Not Found, but keep the initial URL.
                // It uses the pathMatch parameter for the route object passed to next().
                // substring(1) removes the first character from the string.
                // Provided query and hash are for preserving any query param and/or hash.
                next({
                    name: "NotFound",
                    params: { pathMatch: to.path.substring(1).split("/") },
                    query: to.query,
                    hash: to.hash
                })
            }
        }
    },
    {
        path: "/category/:id",
        props: true,
        name: "Category",
        component: Category
    },
    {
        path: "/forum/:id",
        props: true, // To set the route (path) param as a component prop.
        name: "Forum",
        component: Forum
    },
    {
        path: "/me",
        name: "Profile",
        component: Profile,
        meta: { toTop: true, smoothScroll: true }
    },
    {
        path: "/me/edit",
        name: "ProfileEdit",
        component: Profile,
        props: { edit: true }
    },

    // This matches everything and put it under `$route.params.pathMatch`.
    { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound }
]

export default createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to) {
        const scroll = {}
        if (to.meta.toTop) scroll.top = 0
        if (to.meta.smoothScroll) scroll.behavior = "smooth"
        return scroll
    }
})
