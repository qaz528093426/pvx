<template>
    <div class="v-pet-list" v-loading="loading">
        <div class="m-pet-header flex">
            <div class="m-pet-title flex">
                <i class="u-logo"></i>
            </div>
            <div class="m-pet-toolbar flex">
                <div class="m-pet-filter flex">
                    <el-radio-group class="u-type u-type-radio" v-model="petType">
                        <el-radio v-for="item in Type" :key="item.type" :label="item.class">{{ item.name }}</el-radio>
                    </el-radio-group>
                    <el-select class="u-type u-type-select" v-model="petType" placeholder="宠物种类">
                        <el-option v-for="item in Type" :key="item.type" :label="item.name" :value="item.class"> </el-option>
                    </el-select>
                    <el-select class="u-source" v-model="petSource" placeholder="获取来源">
                        <el-option v-for="item in Source" :key="item.source" :label="item.name" :value="item.source"> </el-option>
                    </el-select>
                </div>
                <div class="m-pet-search flex">
                    <el-input placeholder="输入宠物名字搜索" v-model="petName" clearable> </el-input>
                </div>
            </div>
        </div>
        <div class="m-pet-content" v-if="petList && petList.length > 0">
            <div class="m-pet-list flex">
                <pet-item v-for="pet in petList" :key="pet.index" :petObject="pet" :lucky="luckyList"></pet-item>
            </div>
            <el-button class="m-archive-more m-pet-more" v-show="hasNextPage" type="primary" @click="appendPage" :loading="loading" icon="el-icon-arrow-down">加载更多</el-button>
            <el-pagination
                class="m-archive-pages m-pet-pages"
                background
                layout="total, prev, pager, next, jumper"
                :hide-on-single-page="true"
                :page-size="per"
                :total="total"
                :current-page.sync="page"
                @current-change="changePage"
            ></el-pagination>
        </div>
        <el-alert v-else class="m-pet-null" title="没有找到相关宠物" type="info" show-icon> </el-alert>
    </div>
</template>

<script>
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
import { getPets, getPetLucky } from "@/service/pet";
import Type from "@/assets/data/pet_type.json";
import Source from "@/assets/data/pet_source.json";
import petItem from "@/components/pet/PetItem.vue";
export default {
    name: "PetList",
    props: [],
    components: {
        petItem,
    },
    data: function () {
        return {
            loading: false,
            petList: [],
            page: 1, //当前页数
            total: 1, //总条目数
            pages: 1, //总页数
            per: 16, //每页条目

            Type,
            Source,
            Lucky: [],
            petType: "",
            petSource: "",
            petName: "",
            luckyList: [],
        };
    },
    computed: {
        params: function () {
            return [this.petType, this.petName, this.petSource, this.client];
        },
        request_params: function () {
            return {
                per: this.per,
                page: this.page || 1,
                Class: this.petType,
                Name: this.petName,
                Source: this.petSource,
                client: this.client,
            };
        },
        resetParams: function () {
            return [this.petName, this.petType, this.petSource];
        },
        hasNextPage: function () {
            return this.pages > 1 && this.page < this.pages;
        },
        client: function () {
            return this.$store.state.client;
        },
    },
    watch: {
        resetParams: {
            handler: function () {
                this.page = 1;
            },
        },
        params: {
            deep: true,
            immediate: true,
            handler: function () {
                this.getPetList();
            },
        },
    },
    methods: {
        getPic: function (url) {
            return __imgPath + url;
        },
        appendPage: function () {
            this.page += 1;
            this.getPetList(true);
        },
        changePage: function () {
            this.getPetList();
        },
        // 获取宠物列表
        getPetList: function (appendMode = false) {
            this.loading = true;
            getPets(this.request_params)
                .then((res) => {
                    let newList = res.data.list.filter((item) => {
                        return item.NameFrame;
                    });
                    if (appendMode) {
                        this.petList = this.petList.concat(newList);
                    } else {
                        this.petList = newList;
                    }
                    this.total = res.data.total;
                    this.pages = res.data.pages;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        // 获取福缘宠物id
        getPetLucky: function () {
            getPetLucky().then((res) => {
                let data = res.data.std;
                let rawDate = new Date();
                let dateIndex = rawDate.getMonth() + 1 + "" + rawDate.getDate();
                this.luckyList = data[dateIndex];
            });
        },
    },
    created: function () {
        this.getPetLucky();
    },
};
</script>

<style lang="less">
@import "~@/assets/css/pet/list.less";
</style>
