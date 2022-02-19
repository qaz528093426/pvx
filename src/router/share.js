import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const ShareList = () => import("@/views/share/ShareList.vue");
const ShareSingle = () => import("@/views/share/ShareSingle.vue");
const FaceParse = () => import("@/views/share/Parse.vue");

const routes = [
    { name: "index", path: "/", component: ShareList },
    { name: "list", path: "/share", component: ShareList },
    { name: "single", path: "/share/:id(\\d+)", component: ShareSingle },
    { name: "parse", path: "/facedata", component: FaceParse },
];

const router = new VueRouter({
    mode: "history",
    routes,
});

export default router;
