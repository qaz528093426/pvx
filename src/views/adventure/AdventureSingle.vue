<template>
    <div class="v-adventure-single" v-if="id" v-loading="loading">
        <div class="m-adventure-navigation">
            <el-button class="u-goback" size="medium" icon="el-icon-arrow-left" @click="goBack" plain>返回列表</el-button>
            <div class="m-trigger-links">
                <a class="u-link u-achievement" :href="getLink('cj', achieve_id)" target="_blank">
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
            <Wiki source_type="achievement" :source_id="achieve_id" :type="type" :id="id" title="奇遇攻略"></Wiki>
        </div>
        <div class="m-adventure-serendipity">
            <Serendipity :title="title" />
        </div>
        <div class="m-pvx-comment">
            <Comment :id="id" :category="type" order="desc" />
        </div>
    </div>
</template>

<script>
import { getLink } from "@jx3box/jx3box-common/js/utils";
import Wiki from "@/components/wiki/Wiki.vue";
import { getAdventure, getSerendipityAchievementIds } from "@/service/adventure";
import task from "@/components/adventure/task.vue";
import Serendipity from "@/components/common/serendipity.vue";
import Comment from "@jx3box/jx3box-comment-ui/src/Comment.vue";
import { postStat } from "@jx3box/jx3box-common/js/stat.js";
export default {
    name: "adventureSingle",
    props: [],
    components: {
        Wiki,
        task,
        Serendipity,
        Comment
    },
    data: function () {
        return {
            type:'adventure',
            achieve_id: "",
            data: "",
            task: [],
            isPet: true,
            loading : false,
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
        getData() {
            this.loading = true
            getAdventure(this.id).then((res) => {
                this.isPet = false;
                this.data = res.data;
                
            }).finally(() => {
                this.loading = false
                postStat(this.type, this.id)
            })
            getSerendipityAchievementIds().then((res) => {
                this.achieve_id = res.data[this.id];
            });
        },
    },
    filters: {},
    created: function () {
        this.getData();
    },
    mounted: function () {},
};
</script>

<style lang="less">
@import "~@/assets/css/adventure/single.less";
</style>
