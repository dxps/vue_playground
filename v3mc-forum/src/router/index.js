import { createRouter, createWebHistory } from "vue-router"
import PageHome from "@/pages/Home"
import PageThreadShow from "@/pages/ThreadShow"
import PageNotFound from "@/pages/NotFound"
import srcData from "@/data.json"

const routes = [
    { path: "/", name: "Home", component: PageHome },
    {
        path: "/thread/:id",
        name: "ThreadShow",
        component: PageThreadShow,
        props: true,
        beforeEnter(to, from, next) {
            const threadExists = srcData.threads.find(thread => thread.id === to.params.id)
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
    // will match everything and put it under `$route.params.pathMatch`
    { path: "/:pathMatch(.*)*", name: "NotFound", component: PageNotFound }
]

export default createRouter({
    history: createWebHistory(),
    routes
})
