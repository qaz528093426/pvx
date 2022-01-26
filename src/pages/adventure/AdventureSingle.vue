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
        <h1 class="m-adventure-title">{{ title }}</h1>
        <div class="m-adventure-content">
            <task :id="id" />
        </div>
        <div class="m-adventure-wiki">
            <detail :achievement_id="achieve_id" title="奇遇攻略"></detail>
        </div>
        <!-- <div class="m-adventure-serendipity">
            <Serendipity :title="title" />
        </div> -->
    </div>
</template>

<script>
import { getLink } from "@jx3box/jx3box-common/js/utils";
import Detail from "@/components/wiki/Detail.vue";
import { getAdventure, getSerendipityAchievementIds } from "@/service/adventure";
import task from "@/components/adventure/task.vue";
// import Serendipity from "@/components/common/serendipity.vue";
export default {
    name: "adventureSingle",
    props: [],
    components: {
        Detail,
        task,
        // Serendipity,
    },
    data: function () {
        return {
            achieve_id: "",
            data: "",
            task: [],
            isPet: true,
        };
    },
    computed: {
        id: function () {
            return this.$route.params.id;
        },
        title: function () {
            return this.data?.szName;
        },
    },
    watch: {},
    methods: {
        getLink,
        goBack() {
            this.$router.push({ name: "list" });
        },
        gerData() {
            getAdventure(this.id).then(res => {
                this.isPet = false;
                this.data = res.data;
            });
            getSerendipityAchievementIds().then(res => {
                this.achieve_id = res.data[this.id];
            });
        },
    },
    filters: {},
    created: function () {
        this.gerData();
    },
    mounted: function () {},
};
</script>

<style lang="less">
@import "~@/assets/css/adventure/single.less";
</style>
