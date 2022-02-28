import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const List = () => import("@/views/homeland/FurnitureList.vue");
const Single = () => import("@/views/homeland/FurnitureSingle.vue");

const routes = [
    { name: "list", path: "/", component: List },
    { name: "single", path: "/:id(\\d+)", component: Single },
];

const router = new VueRouter({
    mode: "history",
    base : '/furniture',
    routes,
});

export default router;
