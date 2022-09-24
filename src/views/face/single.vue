<template>
    <div class="v-face-single" v-loading="loading">
        <div class="m-navigation">
            <el-button class="u-goback" size="medium" icon="el-icon-arrow-left" @click="goBack" plain
                >返回列表</el-button
            >
            <el-input
                placeholder="请输入搜索内容"
                v-model="search"
                class="input-with-select"
                @keyup.enter.native="getFaceList"
            >
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
            <h2 class="u-title">{{ post.title || "无标题" }}</h2>
            <div class="u-info">
                <div class="u-author u-info-margin">
                    By
                    <a class="u-name" :href="authorLink(post.user_id)" target="_blank" v-if="!!~~post.original">{{
                        post.display_name
                    }}</a>
                    <a class="u-name" :href="post.author_link" target="_blank" v-else>{{ post.author_name }}</a>
                    <time class="u-time">{{ post.updated_at }}</time>
                </div>

                <div class="u-info-client">
                    <span :class="post.client">
                        <i class="u-mark" v-if="!!post.star">★ 编辑推荐</i>
                        <i class="u-client" :class="post.client || 'std'">{{ showClientLabel(post.client) }}</i>
                        <i class="u-bodytype" :class="'u-bodytype-' + post.body_type" v-if="post.body_type">{{
                            showBodyTypeLabel(post.body_type)
                        }}</i>
                    </span>
                </div>
            </div>
            <div class="u-desc" v-if="post.remark">{{ post.remark }}</div>
            <el-divider content-position="left"> <i class="el-icon-pie-chart"></i> 预览</el-divider>
        </div>

        <div class="m-single-pics" v-if="previewSrcList && previewSrcList.length > 0">
            <el-carousel class="m-carousel" :interval="4000" type="card" arrow="always">
                <el-carousel-item v-for="(item, i) in previewSrcList" :key="i">
                    <div class="m-face-pic">
                        <el-image fit="contain" :src="item" class="u-pic" :preview-src-list="previewSrcList"></el-image>
                    </div>
                </el-carousel-item>
            </el-carousel>
        </div>
        <!-- 购买区 -->
        <div class="m-face-pay" v-if="post.price_type != 0 && !has_buy">
            <div class="m-face-pay-info" >
                价格：
                <el-tag effect="plain" type="warning" >
                    <span v-if="post.price_type == 1">{{ post.price_count }} 盒币</span>
                    <span v-if="post.price_type == 2">{{ post.price_count }} 金箔</span>
                </el-tag>
            </div>
            <div class="m-face-pay-btn">
                <el-button type="primary" size="small" icon="el-icon-shopping-cart-2" @click="facePay">购买</el-button>
            </div>
        </div>
        <!--下载区-->
        <div class="m-face-files" v-if="has_buy && downFileList > 0">
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
                    <div class="el-button-group u-action">
                        <el-button icon="el-icon-download" size="small" round @click="getDownUrl(item.uuid)"
                            >下载</el-button
                        >
                    </div>
                </li>
            </ul>
        </div>
        <div class="m-single-data" v-if="has_buy && facedata">
            <el-divider content-position="left">独家数据分析</el-divider>
            <facedata v-if="facedata" :data="facedata" />
        </div>
        <!--作者随机作品-->
        <div class="m-random-list">
            <el-divider content-position="left">作者其他作品</el-divider>
            <el-row :gutter="20">
                <el-col :span="3" v-for="item in randomList" :key="item.id">
                    <div class="u-random-box" @click="goToOther(item)">
                        <div class="u-random-img">
                            <el-image fit="contain" :src="item.images[0]" :preview-src-list="[item.images[0]]">
                                <div slot="error" class="u-image-slot">
                                    <i class="el-icon-picture-outline"></i>
                                </div>
                            </el-image>
                        </div>
                        <router-link class="u-face" :to="'/single/' + item.id" target="_blank">
                            {{ item.title || "未命名" }}
                        </router-link>
                    </div>
                </el-col>
            </el-row>
        </div>
        <!-- 点赞 -->
        <Thx
            class="m-thx"
            :postId="id"
            postType="face"
            :postTitle="post.title || '无标题'"
            :userId="post.user_id"
            :adminBoxcoinEnable="true"
            :userBoxcoinEnable="true"
        />
        <!-- 评论 -->
        <div>
            <el-divider content-position="left">讨论</el-divider>
            <Comment :id="id" category="face" />
        </div>
    </div>
</template>

<script>
import { getOneFaceInfo, payFace, loopPayStatus, getAccessoryList, getDownUrl, getRandomFace } from "@/service/face.js";
import { getStat, postStat } from "@jx3box/jx3box-common/js/stat";
import facedata from "@jx3box/jx3box-facedat/src/Facedat.vue";
import Comment from "@jx3box/jx3box-comment-ui/src/Comment.vue";
import { editLink, showMinibanner, showBanner, showAvatar, authorLink,resolveImagePath } from "@jx3box/jx3box-common/js/utils";
import User from "@jx3box/jx3box-common/js/user";
import { bodyMap } from "@jx3box/jx3box-data/data/role/body.json";
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
            downFileList: [],
            downloadParams: {
                pageIndex: 1,
                pageSize: 4,
                total: 0,
            },
            randomList: [],
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
        showThumbnail(url){
            return resolveImagePath(url);
        },
        authorLink,
        getFaceList() {
            this.$router.push({ name: "list", params: { title: this.search } });
        },
        goBack() {
            this.$router.push({ name: "list" });
        },
        showClientLabel: function (val) {
            return this.client_map[val];
        },
        showBodyTypeLabel(val) {
            return bodyMap[val];
        },
        getData() {
            if (this.id) {
                this.loading = true;
                getOneFaceInfo(this.id)
                    .then((res) => {
                        this.post = this.$store.state.faceSingle = res.data.data;
                        document.title = this.post.title;
                        this.getAccessoryList();
                        //获取作者作品
                        this.getRandomFaceList();
                    })
                    .finally(() => {
                        this.loading = false;
                    });

                getStat("face", this.id).then((res) => {
                    this.stat = res.data;
                });
                postStat("face", this.id);
            }
        },
        downloadPageQuery(pageIndex) {
            this.downloadParams.pageIndex = pageIndex;
            this.getAccessoryList();
        },
        getAccessoryList() {
            getAccessoryList(this.id, this.downloadParams).then((res) => {
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
        facePay() {
            let res = this.post;
            let params = {
                postType: "face",
                PostId: res.id,
                priceType: res.price_type,
                priceCount: res.price_count,
                accessUserId: res.user_id,
                payUserId: User.getInfo().uid,
            };
            console.log(params);
            // return;
            //支付
            payFace(params).then((res) => {
                let payid = res.data.data.id;
                // 轮询接口
                console.log(res)
                let setIntervalId=setInterval(
                    loopPayStatus(payid).then(d=>{
                        this.getPayFaceStatus(d.data.data.pay_status,setIntervalId)
                    },1000)
                )
            });
        },
        getPayFaceStatus(pay_status, setIntervalId) {
            if (pay_status == 1) {
                this.$notify.success({
                    title: "成功",
                    message: "购买成功",
                });
                clearInterval(setIntervalId);
                //购买成功后需要重载数据，拉取下载列表
                this.getAccessoryList();
            }else if(pay_status==2){
                this.$notify.error({
                    title: "失败",
                    message: "支付失败",
                });
                clearInterval(setIntervalId);
            }
        },
        getRandomFaceList() {
            let post = this.post;
            let params = {
                user_id: post.user_id,
                limit: 8,
            };
            getRandomFace(params).then((res) => {
                console.log(res);
                if (res.data.data.list && res.data.data.list.length > 0) {
                    this.randomList = res.data.data.list;
                }
            });
        },
    },
};
</script>

<style lang="less">
@import "~@/assets/css/face/single.less";
</style>
