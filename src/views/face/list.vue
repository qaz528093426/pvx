<template>
    <div class="v-share-list m-face" v-loading="loading">
        <div class="m-share-search">
            <a :href="publish_link" class="u-publish el-button el-button--primary">+ 分享捏脸</a>
            <el-input placeholder="请输入搜索内容" v-model="title" class="input-with-select">
                <span slot="prepend">关键词</span>
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
        </div>
        <faceTabs @change="handleFaceTabChange" />

        <template v-if="list.length > 0">
            <div class="m-share-list">
                <faceItem v-for="(item) in list" :key="item.id" :item="item" />
            </div>
            <el-button
                class="m-archive-more"
                v-show="hasNextPage"
                type="primary"
                @click="appendPage"
                :loading="loading"
                icon="el-icon-arrow-down"
                >加载更多</el-button
            >
            <el-pagination
                class="m-archive-pages"
                background
                layout="total, prev, pager, next, jumper"
                :hide-on-single-page="true"
                :page-size="per_page"
                :total="total"
                :current-page.sync="page"
            ></el-pagination>
        </template>
        <el-alert v-else class="m-archive-null" :title="alertTitle" type="info" center show-icon></el-alert>
    </div>
</template>

<script>
import { publishLink } from "@jx3box/jx3box-common/js/utils";
import { getFaceList } from "@/service/face";

import faceTabs from "@/components/face/tabs";
import faceItem from "@/components/face/item";
export default {
    name: "face",
    components: {
        faceTabs,
        faceItem,
    },
    data() {
        return {
            title: "",
            tabsData: {},

            list: [],
            page: 1,
            // per_page: 14,
            pageTotal: 1,
            total: 0,

            appendMode: false,
            loading: false,
        };
    },
    computed: {
        publish_link() {
            return publishLink("face");
        },
        client() {
            return this.$store.state.client;
        },
        params({ title, tabsData }) {
            return {
                title,
                ...tabsData,
                pageIndex: this.page,
                pageSize: this.per_page,
                client: this.client,
            };
        },
        hasNextPage() {
            return this.page < this.pageTotal;
        },
        alertTitle: function () {
            if (this.title) return "没找到对应的捏脸，请重新选择条件或关键词搜索";
            return "没有找到相关的捏脸";
        },
        per_page: function (){
            let count = 18;
            let w = window.innerWidth;

            // 根据分辨率设置
            if (w < 768) {
                count = 6;
            } else if (w < 992) {
                count = 12;
            } else if (w < 1600) {
                count = 15;
            } else if (w < 1920) {
                count = 18;
            } else {
                count = 21;
            }

            return count;
        }
    },
    watch: {
        params: {
            deep: true,
            handler() {
                this.getFaceList();
            },
        },
        '$route.query.title':{
            immediate: true,
            handler() {
                this.title = this.$route.query.title;
            },
        },
    },
    methods: {
        getFaceList: function () {
            this.loading = true;
            getFaceList(this.params)
                .then((res) => {
                    if (this.appendMode) {
                        this.list = this.list.concat(res.data.data.list || []);
                    } else {
                        this.list = res.data.data.list || [];
                    }
                    this.total = res.data.data.page.total;
                    this.pageTotal = res.data.data.page.pageTotal;
                    this.$forceUpdate()
                })
                .finally(() => {
                    this.loading = false;
                    this.appendMode = false;
                });
        },
        appendPage: function () {
            this.appendMode = true;
            this.page = this.page + 1;
        },
        handleFaceTabChange: function (data) {
            this.page = 1;
            this.tabsData = data;
        },
    },
};
</script>

<style lang="less">
@import "~@/assets/css/face/list.less";
</style>
