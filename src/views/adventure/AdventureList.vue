<template>
    <div class="v-adventure-List" v-loading="loading" ref="listRef">
        <div class="m-adventure-header">
            <div class="u-title"></div>
            <AdventureSearch :hasSearch="hasSearch" @onSearch="onSearch" />
        </div>
        <div class="m-adventure-list" v-if="list && list.length > 0">
            <AdventureItem v-for="(item, i) in list" :key="i" :item="item" />
        </div>
        <div class="u-archive-alert" v-else>
            <el-alert title="没有对应的奇遇，请重新查找" type="info" center show-icon />
        </div>

        <el-button class="m-archive-more" v-show="hasNextPage" type="primary" @click="appendPage"
            icon="el-icon-arrow-down">加载更多</el-button>
        <el-pagination class="m-archive-pages" background layout="total, prev, pager, next, jumper"
            :hide-on-single-page="true" :page-size="per" :total="total" :current-page.sync="page"
            @current-change="changePage"></el-pagination>
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
            per: 15, //每页条目

            appendMode: false,
            school: "2",
            search: {},
            hasSearch: "",
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
            this.list.forEach((e) => {
                list.push(this.toSpecial(e));
            });
            return list;
        },
    },
    watch: {
        $route (obj) {
            if (obj.params.search) this.hasSearch = obj.params.search;
        },
        per (val) {
            console.log(val);
        },
    },
    methods: {
        getData () {
            this.loading = true;
            let params = { ...this.params, ...this.search };
            getAdventures(params)
                .then((res) => {
                    let list = [];
                    res.data.list.forEach((e) => {
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
        toSpecial (data) {
            const type = data.szRewardType;
            let str = data.szOpenRewardPath
            const name = data.szOpenRewardPath.split('\\').filter(Boolean).pop()
            
            if (type == 'school')
                str = `ui/Image/Adventure/reward/Open/${name}/school_${this.school}_Open.tga`;

            if (type == "camp") {
                data.bHide
                    ? (str = "ui/Image/Adventure/reward/Open/camp/camp_2_Open.tga")
                    : (str = "ui/Image/Adventure/reward/Open/camp/camp_0_Open.tga");
            }

            data.szOpenRewardPath = str;
            return data;
        },
        changePage (i) {
            this.page = i;
            this.getData();
        },
        appendPage: function () {
            this.page = this.page + 1;
            this.appendMode = true;
            this.getData();
        },
        onSearch (params) {
            this.page = 1;
            this.search = params;
            this.getData();
        },
        // 按宽度显示个数
        showCount () {
            const listWidth = this.$refs.listRef?.clientWidth;
            this.per = Math.floor(listWidth / 300) * 4;
        },
    },
    mounted: function () {
        // User.isLogin() &&
        //     getUserSchool().then(res => {
        //         if (res.data.data.list) this.school = schoolImgID[res.data.data.list[0].mount];
        //     });
        this.showCount();
        this.getData();
    },
};
</script>

<style lang="less">
@import "~@/assets/css/adventure/list.less";
</style>
