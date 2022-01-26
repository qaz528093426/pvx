<template>
    <div class="v-adventure-single" v-if="id">
        <div class="m-adventure-navigation">
            <el-button class="u-goback" size="medium" icon="el-icon-arrow-left" @click="goBack" plain>返回列表</el-button>
            <div class="m-trigger-links">
                <a class="u-link u-achievement" :href="getLink('cj', achieve_id)">
                    <i class="el-icon-trophy"></i>
                    成就信息
                </a>
            </div>
        </div>
        <!-- <TriggerSingle type="adventure" :id="id" /> -->
        <div class="m-adventure-wiki">
            <detail :achievement_id="achieve_id" title="奇遇攻略"></detail>
        </div>
    </div>
</template>

<script>
import { getLink } from "@jx3box/jx3box-common/js/utils";
import Detail from "@/components/wiki/Detail.vue";
import { getAdventureID, getAdventureTask, getSerendipityJson } from "@/service/adventure";
export default {
    name: "adventureSingle",
    props: [],
    components: {
        // TriggerSingle,
        Detail,
    },
    data: function () {
        return {
            achieve_id: "",
        };
    },
    computed: {
        id: function () {
            return this.$route.params.id || 1;
        },
    },
    watch: {},
    methods: {
        getLink,

        getAchievementId() {
            getSerendipityJson().then(res => {
                this.achieve_id = res.data[this.id];
            });
        },
    },
    filters: {},
    created: function () {
        this.getAchievementId();
    },
    mounted: function () {},
};
</script>

<style lang="less">
@import "~@/assets/css/adventure/single.less";
</style>
