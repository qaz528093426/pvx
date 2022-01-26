import Vue from "vue";
import VueRouter from "vue-router";

const List = () => import("../pages/adventure/AdventureList.vue");
const Single = () => import("../pages/adventure/AdventureSingle.vue");
const PetSingle = () => import("../pages/pet/PetSingle.vue");

Vue.use(VueRouter);

const routes = [
    { name: "list", path: "/adventure", component: List },
    { name: "single", path: "/adventure/:id", component: Single },
    { name: "pet", path: "/pet/:id", component: PetSingle },
];

const router = new VueRouter({
    mode: "history",
    // base: '/pvx',
    routes,
});

export default router;