<template>
    <div class="v-adventure-List">
        <div class="m-adventure-header">
            <div class="u-title"></div>
            <AdventureSearch @onSearch="onSearch" />
        </div>
        <div class="m-adventure-list" v-if="list && list.length > 0">
            <AdventureItem v-for="(item, i) in list" :key="i" :item="item" />
        </div>
        <div class="u-archive-alert" v-else><el-alert title="没有对应的奇遇，请重新查找" type="info" center show-icon /></div>

        <el-button class="m-archive-more" v-show="hasNextPage" type="primary" @click="appendPage" icon="el-icon-arrow-down">加载更多</el-button>
        <el-pagination class="m-archive-pages" background layout="total, prev, pager, next, jumper" :hide-on-single-page="true" :page-size="per" :total="total" :current-page.sync="page" @current-change="changePage"></el-pagination>
    </div>
</template>

<script>
import AdventureSearch from "@/components/adventure/search.vue";
import AdventureItem from "@/components/adventure/item.vue";
import { getAdventure } from "@/service/adventure";
export default {
    name: "adventureList",
    props: [],
    components: { AdventureSearch, AdventureItem },
    data: function () {
        return {
            loading: false,
            list: [],

            page: 1, //当前页数
            total: 1, //总条目数
            pages: 1, //总页数
            per: 20, //每页条目

            params: {
                per: this.per,
                page: this.page || 1,
            },
        };
    },
    computed: {
        hasNextPage: function () {
            return this.pages > 1 && this.page < this.pages;
        },
    },
    watch: {},
    methods: {
        getData() {
            let params = this.params;
            getAdventure(params).then(res => {
                let list = [];
                res.data.list.forEach(e => {
                    if (e.bHide == 1 && e.nClassify == 2) {
                    } else {
                        if (e.szName) list.push(e);
                    }
                });
                if (this.page == 1) {
                    this.list = list;
                } else {
                    this.list = this.list.concat(list);
                }
                this.total = res.data.total;
                this.pages = res.data.pages;
            });
        },
        changePage(i) {
            this.page = i;
            this.getData();
        },
        appendPage: function () {
            this.page = this.page + 1;
            this.getData();
        },
        onSearch(e) {
            this.params = {
                per: this.per,
                page: this.page,
            };
            if (e.all) delete e.all;
            this.params = { ...this.params, ...e };
            this.getData();
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
@import "~@/assets/css/adventure/list.less";
</style>
