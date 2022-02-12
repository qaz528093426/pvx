<template>
    <div id="app">
        <Header></Header>
        <Breadcrumb name="捏脸妆容" slug="share" root="/share" :publishEnable="true" :adminEnable="true" :feedbackEnable="true" :crumbEnable="true">
            <img slot="logo" svg-inline :src="getAppIcon('share')" />
        </Breadcrumb>
        <LeftSidebar><Nav></Nav></LeftSidebar>
        <Main :withoutRight="true">
            <div class="m-main">
                <ShareSingle v-if="id"></ShareSingle>
                <ShareList v-else></ShareList>
            </div>
            <Footer></Footer>
        </Main>
    </div>
</template>

<script>
import Nav from "@/components/Nav.vue";
import { getAppIcon } from "@jx3box/jx3box-common/js/utils";
import { getAppId } from "@/utils/common";
import ShareList from "./ShareList.vue";
import ShareSingle from "./ShareSingle.vue";
export default {
    name: "App",
    props: [],
    data: function () {
        return {
            id: getAppId(),
        };
    },
    computed: {},
    methods: { getAppIcon },
    components: { Nav, ShareList, ShareSingle },
    created() {
        sessionStorage.setItem("jx3_ShareId", this.id);
    },
};
</script>

<style lang="less">
@import "~@/assets/css/app.less";
</style>
