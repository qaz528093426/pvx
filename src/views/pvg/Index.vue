<template>
    <div id="app">
        <Header></Header>
        <Breadcrumb
            name="商贾"
            slug="pvg"
            root="/pvg"
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
    components : {
        Nav
    }
};
</script>

<style lang="less">
@import "~@/assets/css/app.less";
</style>
