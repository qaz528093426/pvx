import Vue from "vue";
import VueRouter from "vue-router";

const Index = () => import("../pages/share/Share.vue");
const Parse = () => import("../pages/share/Parse.vue");


Vue.use(VueRouter);

const routes = [
    { name: "index", path: "/", component: Index },
    { name: "parse", path: "/parse", component: Parse },
];

const router = new VueRouter({
    routes,
});

export default router;
