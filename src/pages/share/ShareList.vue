<template>
    <div class="v-share-list">
        <ShareSearch @onSearchKey="onSearchKey" />
        <ShareTabs @onShareData="onShareData" />
        <template v-if="list.length > 0" v-loading="loading">
            <div class="m-share-list">
                <ShareItem v-for="(item, index) in list" :key="index" :item="item" />
            </div>
            <el-pagination class="m-share-pages" background :hide-on-single-page="true" @current-change="changePage" :current-page.sync="page" layout="total, prev, pager, next, jumper" :total="total" :page-size="pages"></el-pagination>
        </template>

        <el-alert v-else class="u-alert" :title="title" type="info" center show-icon></el-alert>
    </div>
</template>

<script>
import ShareSearch from "@/components/share/search.vue";
import ShareTabs from "@/components/share/tabs.vue";
import ShareItem from "@/components/share/item.vue";
import { getPosts } from "../../service/share";
export default {
    name: "ShareList",
    props: [],
    components: { ShareSearch, ShareTabs, ShareItem },
    data: function () {
        return {
            loading: false,
            list: [],
            search: "",
            
            page: 1, //当前页数
            total: 1, //总条目数
            pages: 1, //总页数
            per: 20, //每页条目

            appendMode: false, //追加模式
        };
    },
    computed: {
        title: function () {
            if (this.search) return "没找到对应的捏脸，请重新选择条件或关键词搜索";
            return "没有找到相关的捏脸";
        },
        params: function () {
            return {
                per: this.per,
                sticky: 1,
                page: ~~this.page || 1,
                type: "share",
            };
        },
    },
    methods: {
        onShareData(params) {
            this.getData(params);
        },
        onSearchKey(search) {
            if (!search) return (this.search = "");
            this.search = search;
            this.getData({
                search,
            });
        },
        // 获取数据
        getData(params) {
            this.loading = true;
            if (this.search) params.search = this.search;
            params = Object.assign(this.params, params);
            if (!params.subtype) delete params.subtype;
            getPosts(params, this)
                .then(res => {
                    if (this.appendMode) {
                        this.list = this.data.concat(res.data.data.list);
                    } else {
                        this.list = res.data.data.list;
                    }
                    this.total = res.data.data.total;
                    this.pages = res.data.data.pages;
                })
                .finally(() => {
                    this.appendMode = false;
                    this.loading = false;
                });
        },
        changePage(i) {
            this.page = i;
            this.getData();
            this.skipTop();
        },
        skipTop() {
            window.scrollTo(0, 0);
        },
    },
    created: function () {},
    mounted: function () {},
};
</script>

<style lang="less">
@import "~@/assets/css/share/list.less";
</style>
