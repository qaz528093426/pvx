<template>
    <div id="app">
        <Header></Header>
        <Breadcrumb name="奇遇大全" slug="adventure" root="/adventure" :publishEnable="false" :adminEnable="false" :feedbackEnable="true" :crumbEnable="true">
            <img slot="logo" svg-inline :src="getAppIcon('qiyu')" />
        </Breadcrumb>
        <LeftSidebar><Nav></Nav></LeftSidebar>
        <Main :withoutRight="true">
            <div class="m-main">
                <keep-alive include="adventureList">
                    <router-view></router-view>
                </keep-alive>
            </div>
            <Footer></Footer>
        </Main>
    </div>
</template>

<script>
import Nav from "@/components/Nav.vue";
import { getAppIcon } from "@jx3box/jx3box-common/js/utils";
import { __imgPath,__dataPath } from "@jx3box/jx3box-common/data/jx3box.json";
export default {
    name: "App",
    provide : {
        __imgRoot : __imgPath + 'adventure/',
        __dataRoot : __dataPath + 'pet/'
    },
    data: function () {
        return {};
    },
    computed: {},
    methods: { getAppIcon },
    components: { Nav },
};
</script>

<style lang="less">
@import "~@/assets/css/app.less";
</style>
