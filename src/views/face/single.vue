<template>
    <div class="v-face-single" v-loading="loading">
        <!-- 搜索 -->
        <div class="m-navigation">
            <el-button class="u-goback" size="medium" icon="el-icon-arrow-left" @click="goBack" plain
                >返回列表</el-button
            >
            <el-input placeholder="请输入搜索内容" v-model="search" class="input-with-select">
                <span slot="prepend">关键词</span>
                <el-button slot="append" icon="el-icon-search" @click="getFaceList"></el-button>
            </el-input>
        </div>

        <!-- 海报banner -->
        <div class="m-banner" v-if="post.banner">
            <img :src="showThumbnail(post.banner)" />
        </div>

        <!-- 基本信息 -->
        <div class="m-header">
            <img :src="showAvatar(post.user_avatar)" class="u-avatar" v-if="post.original" />
            <h2 class="u-title">{{ post.title || "未命名" }}</h2>
            <div class="u-info">
                <div class="u-author u-info-margin">
                    By
                    <a class="u-name" :href="authorLink(post.user_id)" target="_blank" v-if="!!~~post.original">{{
                        post.display_name
                    }}</a>
                    <a class="u-name" :href="post.author_link" target="_blank">{{ post.author_name }}</a>
                    <time class="u-time">{{ post.updated_at }}</time>
                </div>

                <div class="u-info">
                    <i class="u-mark" v-if="post.star">★ 编辑推荐</i>
                    <i class="u-client" :class="post.client || 'std'">{{ showClientLabel(post.client) }}</i>
                    <i class="u-bodytype" :class="body_type_info.class" v-if="body_type_info">{{
                        body_type_info.name
                    }}</i>
                </div>
            </div>
            <div class="u-desc" v-if="post.remark">{{ post.remark }}</div>
        </div>

        <!-- 预览区 -->
        <div class="m-face-preview" v-if="previewSrcList && previewSrcList.length > 0">
            <el-divider content-position="left"> <i class="el-icon-pie-chart"></i> 预览</el-divider>
            <div class="m-face-images">
                <el-carousel class="m-carousel" :interval="4000" type="card" arrow="always">
                    <el-carousel-item v-for="(item, i) in previewSrcList" :key="i">
                        <div class="m-face-pic">
                            <el-image
                                fit="contain"
                                :src="item"
                                class="u-pic"
                                :preview-src-list="previewSrcList"
                            ></el-image>
                        </div>
                    </el-carousel-item>
                </el-carousel>
            </div>
        </div>

        <!-- 购买区 -->
        <div class="m-face-pay">
            <div class="m-face-pay-info">
                <span class="u-label">价格：</span>
                <el-tag effect="plain" type="success" v-if="post.price_type == 0">免费</el-tag>
                <el-tag effect="plain" type="warning" v-if="post.price_type != 0">
                    <span v-if="post.price_type == 1">{{ post.price_count }} 盒币</span>
                    <span v-if="post.price_type == 2">{{ post.price_count }} 金箔</span>
                </el-tag>
            </div>
            <div class="m-face-pay-btn" v-if="post.price_type != 0 && !has_buy">
                <el-button type="primary" size="small" icon="el-icon-shopping-cart-2">购买</el-button>
            </div>
        </div>

        <!-- 下载区 -->
        <div class="m-face-files" v-if="has_buy && downFileList.length">
            <el-divider content-position="left">下载列表</el-divider>
            <ul class="m-face-files-list">
                <li v-for="item in downFileList" :key="item.id">
                    <i class="el-icon-document"></i>
                    <span class="u-desc">
                        {{ item.describe ? item.describe : "暂无描述" }}
                    </span>
                    <div class="u-time">
                        <i class="el-icon-date"></i>
                        上传于 {{ item.created_at }}
                    </div>
                    <div class="u-action">
                        <el-button icon="el-icon-download" size="small" round @click="getDownUrl(item.uuid)"
                            >下载</el-button
                        >
                    </div>
                </li>
            </ul>
        </div>

        <!-- 数据分析 -->
        <div class="m-single-data" v-if="has_buy && facedata">
            <el-divider content-position="left">独家数据分析</el-divider>
            <facedata :data="facedata" />
        </div>

        <!-- 点赞 -->
        <Thx
            class="m-thx"
            :postId="id"
            postType="face"
            :postTitle="post.title"
            :userId="post.user_id"
            :adminBoxcoinEnable="true"
            :userBoxcoinEnable="true"
        />

        <!-- 评论 -->
        <div class="m-face-comment">
            <el-divider content-position="left">讨论</el-divider>
            <Comment :id="id" category="face" />
        </div>
    </div>
</template>

<script>
import { getOneFaceInfo, payFace, loopPayStatus, getAccessoryList, getDownUrl } from "@/service/face.js";
import { getStat, postStat } from "@jx3box/jx3box-common/js/stat";
import facedata from "@jx3box/jx3box-facedat/src/Facedat.vue";
import Comment from "@jx3box/jx3box-comment-ui/src/Comment.vue";
// import { editLink, authorLink } from '@jx3box/jx3box-common/js/utils.js';
import {
    editLink,
    showMinibanner,
    showBanner,
    showAvatar,
    authorLink,
    getThumbnail,
    resolveImagePath,
} from "@jx3box/jx3box-common/js/utils";
import User from "@jx3box/jx3box-common/js/user";
export default {
    name: "single",
    components: { facedata, Comment },
    data: function () {
        return {
            loading: false,
            search: "", //搜索值
            post: {},
            stat: {},
            has_buy: false, //是否购买
            client_map: {
                std: "重制",
                origin: "缘起",
                all: "双端",
            },
            body_type_info: null,
            body_type_arr: [
                {
                    name: "成男",
                    class: "u-man",
                    type: 1,
                },
                {
                    name: "成女",
                    class: "u-woman",
                    type: 2,
                },
                {
                    name: "萝莉",
                    class: "u-girl",
                    type: 6,
                },
                {
                    name: "正太",
                    class: "u-boy",
                    type: 5,
                },
            ],
            downFileList: [],
            downloadParams: {
                pageIndex: 1,
                pageSize: 15,
                total: 0,
            },
        };
    },
    computed: {
        id: function () {
            return this.$route.params.id;
        },
        facedata: function () {
            return this.post?.data || "";
        },
        previewSrcList: function () {
            return this.post?.images || [];
        },
    },
    watch: {},
    created: function () {
        this.getData();
    },
    methods: {
        showAvatar(url) {
            return showAvatar(url, "l");
        },
        authorLink,
        showThumbnail(url) {
            return resolveImagePath(url);
        },
        getFaceList() {
            this.$router.push({ name: "list", params: { title: this.search } });
        },
        getData() {
            if (this.id) {
                this.loading = true;
                getOneFaceInfo(this.id)
                    .then((res) => {
                        this.post = this.$store.state.faceSingle = res.data.data;
                        document.title = this.post.title;
                        for (let i = 0; i < this.body_type_arr.length; i++) {
                            if (this.body_type_arr[i].type == this.post.body_type) {
                                this.body_type_info = this.body_type_arr[i];
                            }
                        }
                        this.getAccessoryList();
                        this.triggerStat();
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            }
        },
        triggerStat() {
            getStat("face", this.id).then((res) => {
                this.stat = res.data;
            });
            postStat("face", this.id);
        },
        getAccessoryList() {
            getAccessoryList(this.id, this.downloadParams).then((res) => {
                // console.log(res)
                let data = res.data.data;
                this.has_buy = data.has_buy;
                if (data.has_buy) {
                    this.downFileList = data.list;
                    this.downloadParams.total = data.page.total;
                }
            });
        },
        getDownUrl(uuid) {
            getDownUrl(this.id, uuid).then((res) => {
                window.location.href = res.data.data.url;
            });
        },
        goBack() {
            this.$router.push({ name: "list" });
        },
        showClientLabel: function (val) {
            return this.client_map[val];
        },
    },
};
</script>

<style lang="less">
@import "~@/assets/css/face/single.less";
</style>
