import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const List = () => import("@/views/pet/PetList.vue");
const Single = () => import("@/views/pet/PetSingle.vue");

const routes = [
    { name: "index", path: "/", component: List },
    { name: "list", path: "/pet", component: List },
    { name: "single", path: "/pet/:id(\\d+)", component: Single },
];

const router = new VueRouter({
    mode: "history",
    routes,
});

export default router;
