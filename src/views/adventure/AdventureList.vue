<template>
    <div class="v-adventure-List" v-loading="loading">
        <div class="m-adventure-header">
            <div class="u-title"></div>
            <AdventureSearch @onSearch="onSearch" />
        </div>
        <div class="m-adventure-list" v-if="list && list.length > 0">
            <AdventureItem v-for="(item, i) in list" :key="i" :item="item" />
        </div>
        <div class="u-archive-alert" v-else>
            <el-alert title="没有对应的奇遇，请重新查找" type="info" center show-icon />
        </div>

        <el-button class="m-archive-more" v-show="hasNextPage" type="primary" @click="appendPage" icon="el-icon-arrow-down">加载更多</el-button>
        <el-pagination class="m-archive-pages" background layout="total, prev, pager, next, jumper" :hide-on-single-page="true" :page-size="per" :total="total" :current-page.sync="page" @current-change="changePage"></el-pagination>
    </div>
</template>

<script>
import AdventureSearch from "@/components/adventure/search.vue";
import AdventureItem from "@/components/adventure/item.vue";
import { getAdventures, getUserSchool } from "@/service/adventure";
// import User from "@jx3box/jx3box-common/js/user";
// import schoolImgID from "@/assets/data/school_img_id.json";
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
            per: 16, //每页条目

            appendMode: false,
            school: "2",
            search: {},
        };
    },
    computed: {
        hasNextPage: function () {
            return this.pages > 1 && this.page < this.pages;
        },
        params: function () {
            return {
                per: this.per,
                page: this.page || 1,
            };
        },
        newList: function () {
            let list = [];
            this.list.forEach(e => {
                list.push(this.toSpecial(e));
            });
            return list;
        },
    },
    watch: {},
    methods: {
        getData() {
            this.loading = true;
            let params = { ...this.params, ...this.search };
            getAdventures(params)
                .then(res => {
                    let list = [];
                    res.data.list.forEach(e => {
                        // list.push(e);
                        list.push(this.toSpecial(e));
                    });
                    this.appendMode ? (this.list = this.list.concat(list)) : (this.list = list);
                    this.appendMode = false;
                    this.total = res.data.total;
                    this.pages = res.data.pages;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        //处理特殊的链接
        toSpecial(data) {
            if (data.szOpenRewardPath) {
                let str = data.szOpenRewardPath;
                if (str?.indexOf("weapon") !== -1) str = "ui/Image/Adventure/reward/Open/weapon/school_" + this.school + "_Open.tga";
                if (str?.indexOf("camp") !== -1) {
                    data.bHide ? (str = "ui/Image/Adventure/reward/Open/camp/camp_2_Open.tga") : (str = "ui/Image/Adventure/reward/Open/camp/camp_0_Open.tga");
                }
                if (str?.indexOf("zzwg") !== -1) str = "ui/Image/Adventure/reward/Open/zzwg/school_" + this.school + "_Open.tga";
                if (str?.indexOf("jcs") !== -1) str = "ui/Image/Adventure/reward/Open/jcs/school_" + this.school + "_Open.tga";
                data.szOpenRewardPath = str;
            }
            return data;
        },
        changePage(i) {
            this.page = i;
            this.getData();
        },
        appendPage: function () {
            this.page = this.page + 1;
            this.appendMode = true;
            this.getData();
        },
        onSearch(params) {
            this.page = 1;
            this.search = params;
            this.getData();
        },
    },
    created: function () {
        // User.isLogin() &&
        //     getUserSchool().then(res => {
        //         if (res.data.data.list) this.school = schoolImgID[res.data.data.list[0].mount];
        //     });
        this.getData();
    },
    mounted: function () {},
};
</script>

<style lang="less">
@import "~@/assets/css/adventure/list.less";
</style>
