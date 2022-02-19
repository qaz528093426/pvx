import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const Flower = () => import("@/views/homeland/Flower.vue");
const Maps = () => import("@/views/homeland/Maps.vue");
const Tutorial = () => import("@/views/homeland/Tutorial.vue");
const FurnitureList = () => import("@/views/homeland/FurnitureList.vue");
const FurnitureSingle = () => import("@/views/homeland/FurnitureSingle.vue");

const routes = [
    { name: "index", path: "/", component: FurnitureList },
    { name: "flower", path: "/flower", component: Flower },
    { name: "maps", path: "/maps", component: Maps },
    { name: "tutorial", path: "/tutorial", component: Tutorial },
    { name: "furniture_list", path: "/furniture", component: FurnitureList },
    { name: "furniture_single", path: "/furniture/:id(\\d+)", component: FurnitureSingle },
];

const router = new VueRouter({
    mode: "history",
    base: '/homeland',
    routes,
});

export default router;
