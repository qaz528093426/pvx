<template>
    <div id="app">
        <Header></Header>
        <Breadcrumb name="技艺助手" slug="cooking" root="/pvx/cooking" :publishEnable="false" :adminEnable="false" :feedbackEnable="true" :crumbEnable="false">
            <img slot="logo" svg-inline :src="getAppIcon('cooking')" />
        </Breadcrumb>
        <LeftSidebar><Nav></Nav></LeftSidebar>
        <Main :withoutRight="true">
            <div class="m-cooking m-main">
                <!-- 头部 -->
                <div class="m-cooking-header">
                    <h1 class="u-title">技艺助手</h1>
                    tab
                </div>

                <!-- 中央 -->
                <!-- <keep-alive include="PetList">
                    <router-view></router-view>
                </keep-alive> -->
                <div class="m-cooking-main">
                    <!-- 左侧边 -->
                    <div class="m-cooking-side">1</div>

                    <!-- 内容 -->
                    <div class="m-cooking-content">2</div>

                    <!-- 购物车 -->
                    <div class="m-cooking-panel">3</div>
                </div>

                <!-- 底部 -->
                <div class="m-cooking-footer"></div>
            </div>
            <Footer></Footer>
        </Main>
    </div>
</template>

<script>
import Nav from "@/components/Nav.vue";
import { getAppIcon } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "Cooking",
    props: [],
    components: { Nav },
    data: function () {
        return {};
    },
    methods: { getAppIcon },
};
</script>

<style scoped lang="less">
@import "~@/assets/css/cooking/index.less";
</style>
