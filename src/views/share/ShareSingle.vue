<template>
    <div class="v-share-single" v-loading="loading">
        <div class="m-navigation">
            <el-button class="u-goback" size="medium" icon="el-icon-arrow-left" @click="goBack" plain
                >返回列表</el-button
            >
        </div>
        <div class="m-header">
            <h2>{{ title }}</h2>
            <div class="u-info">
                <div class="u-info-margin">
                    <i class="el-icon-user-solid"></i>
                    <a class="u-name" target="_blank" :href="author_link">{{ author_name }}</a>
                </div>
                <div class="u-info-margin">
                    <i class="u-label-client">适用客户端</i>
                    <span class="u-client" :class="client">{{ showClientLabel(client) }}</span>
                </div>
                <span class="u-info-margin">
                    <i class="el-icon-date"> </i>
                    <time>{{ post_date }}</time>
                </span>
                <span class="u-info-margin">
                    <i class="el-icon-date"> </i>
                    <time>{{ update_date }}</time>
                </span>
                <span class="u-info-margin">
                    <i class="el-icon-view"></i>
                    {{ views }}
                </span>
                <a class="u-info-margin" :href="edit_link" v-if="canEdit">
                    <i class="u-icon-edit el-icon-edit-outline"></i>
                    <span>编辑</span>
                </a>
            </div>
            <el-divider content-position="left">JX3BOX</el-divider>
        </div>

        <div class="m-single-pics" v-if="meta.pics && meta.pics.length">
            <el-carousel :interval="4000" type="card" arrow="always" height="600px">
                <el-carousel-item v-for="(item, i) in meta.pics" :key="i">
                    <div class="m-face-pic">
                        <el-image
                            fit="contain"
                            :src="showImage(item.url)"
                            class="u-pic"
                            :preview-src-list="previewSrcList"
                        >
                        </el-image>
                    </div>
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="u-single-author">
            作者：<b>{{ origin_author }}</b>
        </div>
        <div class="m-single-data">
            <el-divider content-position="left"> 独家数据分析 </el-divider>
            <facedata v-if="facedata" :data="facedata" />
        </div>
        <!-- 点赞 -->
        <Thx class="m-thx" :postId="id" :postType="post_type" :adminBoxcoinEnable="false" :userBoxcoinEnable="false" />
        <!-- 评论 -->
        <div>
            <el-divider content-position="left">讨论</el-divider>
            <Comment :id="id" :category="post_type" />
        </div>
    </div>
</template>

<script>
import { resolveImagePath } from "@jx3box/jx3box-common/js/utils";
import { getPost } from "@/service/share.js";
import { getStat, postStat } from "@jx3box/jx3box-common/js/stat";
import facedata from "@jx3box/jx3box-facedat/src/Facedat.vue";
import Comment from "@jx3box/jx3box-comment-ui/src/Comment.vue";
import { __Links } from "@jx3box/jx3box-common/data/jx3box.json";
import { showDate } from "@jx3box/jx3box-common/js/moment";
import { editLink, authorLink } from "@jx3box/jx3box-common/js/utils.js";
import User from "@jx3box/jx3box-common/js/user";
export default {
    name: "single",
    props: [],
    components: { facedata, Comment },
    data: function () {
        return {
            loading: false,
            post: {},
            stat: {},
            client_map: {
                std: "正式服",
                origin: "怀旧服",
                all: "双端",
            },
        };
    },
    computed: {
        id: function () {
            return this.$route.params.id;
        },
        author_id: function () {
            return this.post?.post_author || 0;
        },
        author_name: function () {
            return this.post?.author || "匿名";
        },
        author_link: function () {
            return authorLink(this.post?.post_author);
        },
        edit_link: function () {
            return editLink(this.post?.post_type, this.post?.ID);
        },
        origin_author: function () {
            return this.post?.post_meta?.author || "匿名";
        },
        facedata: function () {
            return this.post?.post_meta?.data || "";
        },
        meta: function () {
            return this.post?.post_meta || "";
        },
        post_type: function () {
            return this.post?.post_type || "share";
        },
        title() {
            return this.post.title || "无标题";
        },
        canEdit: function () {
            return this.post?.post_author == User.getInfo().uid || User.isEditor();
        },
        client() {
            return this.$store.state.client;
        },
        post_date: function () {
            return showDate(new Date(this.post?.post_date));
        },
        update_date: function () {
            return showDate(new Date(this.post?.post_modified));
        },
        views: function () {
            return this.stat?.views || "-";
        },
        previewSrcList: function () {
            return this.meta?.pics.map((item) => resolveImagePath(item.url));
        },
    },
    watch: {},
    methods: {
        getData() {
            if (this.id) {
                this.loading = true;
                getPost(this.id)
                    .then((res) => {
                        this.post = this.$store.state.post = res.data.data;
                        document.title = this.post.post_title;
                    })
                    .finally(() => {
                        this.loading = false;
                    });

                getStat("share", this.id).then((res) => {
                    this.stat = res.data;
                });
                postStat("share", this.id);
            }
        },
        goBack() {
            this.$router.push({ name: "list" });
        },
        showClientLabel: function (val) {
            return this.client_map[val];
        },
        showImage: function (val) {
            return resolveImagePath(val);
        },
    },

    created: function () {
        this.getData();
    },
};
</script>

<style lang="less">
@import "~@/assets/css/share/single.less";
</style>
