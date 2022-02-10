<template>
    <div id="app">
        <Header></Header>
        <Breadcrumb
            name="家具大全"
            slug="funiture"
            root="/pvx/funiture"
            :publishEnable="false"
            :adminEnable="false"
            :feedbackEnable="true"
            :crumbEnable="true"
        >
            <img slot="logo" svg-inline :src="getAppIcon('funiture')" />
        </Breadcrumb>
        <LeftSidebar><Nav></Nav></LeftSidebar>
        <Main :withoutRight="true" class="m-furniture" v-loading="loading">
            <div class="m-furniture-container">
                <furnitureHeader></furnitureHeader>
                <div class="m-furniture-list">
                    <furnitureCard></furnitureCard>
                </div>
            </div>
            <Footer></Footer>
        </Main>
    </div>
</template>

<script>
import Nav from "@/components/Nav.vue";
import FurnitureHeader from "@/components/house/furniture_header.vue";
import FurnitureCard from "@/components/house/furniture_card.vue";
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
        FurnitureHeader,
        FurnitureCard,
    },
};
</script>

<style lang="less">
@import "~@/assets/css/house/furniture.less";
</style>
