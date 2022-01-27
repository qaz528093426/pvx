import Vue from "vue";
import VueRouter from "vue-router";

const List = () => import("../pages/pet/PetList.vue");
const Single = () => import("../pages/pet/PetSingle.vue");

Vue.use(VueRouter);

const routes = [
    { name: "index", path: "/", component: List },
    { name: "list", path: "/pet", component: List },
    { name: "single", path: "/pet/:id", component: Single },
];

const router = new VueRouter({
    mode: "history",
    // base: '/pvx',
    routes,
});

export default router;
