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
        <div class="m-adventure-header">
            <h1 class="m-adventure-title">{{ title }}</h1>
        </div>
        <div class="m-adventure-content">
            <task :id="id" />
        </div>
        <div class="m-adventure-wiki">
            <detail :achievement_id="achieve_id" title="奇遇攻略"></detail>
        </div>
        <div class="m-adventure-serendipity">
            <Serendipity :title="title" />
        </div>
    </div>
</template>

<script>
import { getLink } from "@jx3box/jx3box-common/js/utils";
import Detail from "@/components/wiki/Detail.vue";
import { getAdventure, getSerendipityAchievementIds } from "@/service/adventure";
import task from "@/components/adventure/task.vue";
import Serendipity from "@/components/common/serendipity.vue";
export default {
    name: "adventureSingle",
    props: [],
    components: {
        Detail,
        task,
        Serendipity,
    },
    data: function () {
        return {
            achieve_id: "",
            data: "",
            task: [],
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
        getAchievementId() {
            getSerendipityAchievementIds().then((res) => {
                this.achieve_id = res.data[this.id];
            });
        },
        getAdventure() {
            getAdventure(this.id).then((res) => {
                this.data = res.data;
            });
        },
    },
    filters: {},
    created: function () {
        this.getAchievementId();
        this.getAdventure();
    },
    mounted: function () {},
};
</script>

<style lang="less">
@import "~@/assets/css/adventure/single.less";
</style>
