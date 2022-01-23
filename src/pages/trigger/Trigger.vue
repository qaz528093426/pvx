<template>
    <div id="app">
        <Header></Header>
        <Breadcrumb name="奇遇触发" slug="trigger" root="/trigger" :publishEnable="true" :adminEnable="true" :feedbackEnable="true" :crumbEnable="true">
            <img slot="logo" svg-inline :src="getAppIcon('qiyu')" />
        </Breadcrumb>
        <LeftSidebar><Nav></Nav></LeftSidebar>
        <Main :withoutRight="true">
            <div class="m-main">
                <TriggerSingle v-if="id"></TriggerSingle>
                <TriggerList v-else></TriggerList>
            </div>
            <Footer></Footer>
        </Main>
    </div>
</template>

<script>
import Nav from "@/components/Nav.vue";
import { getAppIcon } from "@jx3box/jx3box-common/js/utils";
import { getAppId } from "@/utils/common";
import TriggerSingle from "./TriggerSingle.vue";
import TriggerList from "./TriggerList.vue";
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
    components: { Nav, TriggerSingle, TriggerList },
};
</script>

<style lang="less">
@import "~@/assets/css/app.less";
</style>
