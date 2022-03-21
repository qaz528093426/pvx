<template>
    <div id="app">
        <Header></Header>
        <Breadcrumb
            :name="name"
            :slug="slug"
            :root="'/pvg/' + slug"
            :publishEnable="false"
            :adminEnable="false"
            :feedbackEnable="true"
            :crumbEnable="false"
        >
        </Breadcrumb>
        <LeftSidebar>
            <Nav></Nav>
        </LeftSidebar>
        <Main :withoutRight="true">
            <router-view></router-view>
            <Footer></Footer>
        </Main>
    </div>
</template>

<script>
import Nav from "@/components/Nav.vue";
export default {
    name: "Index",
    components: {
        Nav,
    },
    data: function () {
        return {};
    },
    computed: {
        slug: function () {
            return this.$route.name;
        },
        name: function () {
            return this.$route.meta.name;
        },
    },
};
</script>

<style lang="less">
@import "~@/assets/css/app.less";
</style>
