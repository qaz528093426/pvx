import Vue from "vue";
import VueRouter from "vue-router";

const List = () => import("../pages/adventure/AdventureList.vue");
const Single = () => import("../pages/adventure/AdventureSingle.vue");

Vue.use(VueRouter);

const routes = [
    { name: "list", path: "/adventure", component: List },
    { name: "single", path: "/adventure/:id", component: Single },
];

const router = new VueRouter({
    mode: "history",
    // base: '/pvx',
    routes,
});

export default router;