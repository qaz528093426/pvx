import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const faceList = () => import("@/views/face/list.vue");
const faceSingle = () => import("@/views/face/single.vue");

const routes = [
    { name: "list", path: "/", component: faceList },
    { name: "single", path: "/single/:id(\\d+)", component: faceSingle },
];

const router = new VueRouter({
    mode: "history",
    base: "/face",
    routes,
});

export default router;
