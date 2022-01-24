<template>
    <div id="app">
        <Header></Header>
        <Breadcrumb name="奇遇大全" slug="adventure" root="/adventure" :publishEnable="true" :adminEnable="true" :feedbackEnable="true" :crumbEnable="true">
            <img slot="logo" svg-inline :src="getAppIcon('qiyu')" />
        </Breadcrumb>
        <LeftSidebar><Nav></Nav></LeftSidebar>
        <Main :withoutRight="true">
            <div class="m-main"> 
                <AdventureSingle v-if="id"></AdventureSingle>
                <AdventureList v-else></AdventureList>
            </div>
            <Footer></Footer>
        </Main>
    </div>
</template>

<script>
import Nav from "@/components/Nav.vue";
import { getAppIcon } from "@jx3box/jx3box-common/js/utils";
import { getAppId } from "@/utils/common";
import AdventureList from "./AdventureList.vue";
import AdventureSingle from "./AdventureSingle.vue";
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
    components: { Nav, AdventureList, AdventureSingle },
};
</script>

<style lang="less">
@import "~@/assets/css/app.less";
</style>
