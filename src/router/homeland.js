import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const Flower = () => import("@/views/homeland/Flower.vue");
const Maps = () => import("@/views/homeland/Maps.vue");

const routes = [
    // { name: "flower", path: "/", component: Flower },
    { name: "flower", path: "/flower", component: Flower },
    { name: "maps", path: "/maps", component: Maps },
];

const router = new VueRouter({
    mode: "history",
    base: '/homeland',
    routes,
});

export default router;
