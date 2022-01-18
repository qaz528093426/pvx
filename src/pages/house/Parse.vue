<template>
    <div id="app">
        <Header></Header>
        <Breadcrumb name="蓝图解析" slug="blueprint" root="/blueprint" :publishEnable="true" :adminEnable="true" :feedbackEnable="true" :crumbEnable="true">
            <img slot="logo" svg-inline :src="getAppIcon('blueprint')" />
        </Breadcrumb>
        <LeftSidebar><Nav></Nav></LeftSidebar>
        <Main :withoutRight="true">
            <div class="m-main">
                蓝图解析器
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
        return {
        };
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
