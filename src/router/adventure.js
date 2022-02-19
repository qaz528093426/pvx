import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const List = () => import("@/views/adventure/AdventureList.vue");
const Single = () => import("@/views/adventure/AdventureSingle.vue");

const routes = [
    { name: "index", path: "/", component: List },
    { name: "list", path: "/adventure", component: List },
    { name: "single", path: "/adventure/:id(\\d+)", component: Single },
];

const router = new VueRouter({
    mode: "history",
    routes,
});

export default router;