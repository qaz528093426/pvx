<template>
    <div class="v-adventure-List">
        <div class="m-adventure-header">
            <div class="u-title"></div>
            <AdventureSearch />
        </div>
        <div class="m-adventure-list" v-if="list">
            <AdventureItem v-for="(item, i) in list" :key="i" :item="item" />
        </div>
        <el-button class="m-archive-more" v-show="hasNextPage" type="primary" @click="appendPage" :loading="loading" icon="el-icon-arrow-down">加载更多</el-button>
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
            per: 8, //每页条目
        };
    },
    computed: {
        params: function () {
            return {
                per: this.per,
                page: this.page || 1,
            };
        },
        hasNextPage: function () {
            return this.pages > 1 && this.page < this.total;
        },
    },
    watch: {},
    methods: {
        getData() {
            getAdventure(this.params).then(res => {
                this.list = res.data.list;
                console.log(res);
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
