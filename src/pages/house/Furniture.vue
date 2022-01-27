<template>
    <div id="app">
        <Header></Header>
        <Breadcrumb name="家具大全" slug="funiture" root="/pvx/funiture" :publishEnable="false" :adminEnable="false" :feedbackEnable="true" :crumbEnable="true">
            <img slot="logo" svg-inline :src="getAppIcon('funiture')" />
        </Breadcrumb>
        <LeftSidebar><Nav></Nav></LeftSidebar>
        <Main :withoutRight="true">
            <div class="m-main">
                <el-alert title="即将登陆" type="warning" show-icon> </el-alert>
            </div>
            <Footer></Footer>
        </Main>
    </div>
</template>

<script>
import Nav from "@/components/Nav.vue";
import { getAppIcon } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "App",
    props: [],
    data: function () {
        return {};
    },
    computed: {},
    methods: { getAppIcon },
    components: {
        Nav,
    },
};
</script>

<style lang="less">
@import "~@/assets/css/app.less";
</style>
