import Vue from "vue";
import VueRouter from "vue-router";

const List = () => import("@/views/adventure/AdventureList.vue");
const Single = () => import("@/views/adventure/AdventureSingle.vue");

Vue.use(VueRouter);

const routes = [
    { name: "index", path: "/", component: List },
    { name: "list", path: "/adventure", component: List },
    { name: "single", path: "/adventure/:id", component: Single },
];

const router = new VueRouter({
    mode: "history",
    // base: '/pvx',
    routes,
});

export default router;