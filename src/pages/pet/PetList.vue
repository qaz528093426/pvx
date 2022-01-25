<template>
    <div class="v-pet-list" v-loading="loading">
        <div class="v-pet-listGuide flex">
            <div class="v-pet-guideTil flex">
                <i class="v-pet-logo"></i>
            </div>
            <div class="v-pet-screen flex">
                <div class="v-pet-select flex">
                    <el-radio-group class="u-type" v-model="petType">
                        <el-radio v-for="item in Type" :key="item.type" :label="item.class">{{ item.name }}</el-radio>
                    </el-radio-group>
                    <el-select class="m-type" v-model="petType" placeholder="宠物种类">
                        <el-option v-for="item in Type" :key="item.type" :label="item.name" :value="item.class"> </el-option>
                    </el-select>
                    <el-select class="u-source" v-model="petSource" placeholder="获取来源">
                        <el-option v-for="item in Source" :key="item.source" :label="item.name" :value="item.source"> </el-option>
                    </el-select>
                </div>
                <div class="v-pet-search flex">
                    <el-input placeholder="输入宠物名字搜索" v-model="petName" clearable> </el-input>
                </div>
            </div>
        </div>
        <div class="v-pet-listContent flex" v-if="petList && petList.length > 0">
            <pet-item v-for="pet in petList" :key="pet.index" :petObject="pet" :lucky="luckyIndex"></pet-item>
            <el-button class="m-archive-more" v-show="hasNextPage" type="primary" @click="appendPage" :loading="loading" icon="el-icon-arrow-down">加载更多</el-button>
            <el-pagination
                class="m-archive-pages"
                background
                layout="total, prev, pager, next, jumper"
                :hide-on-single-page="true"
                :page-size="per"
                :total="total"
                :current-page.sync="page"
                @current-change="changePage"
            ></el-pagination>
        </div>
        <el-alert v-else class="v-pet-null" title="没有找到相关宠物" type="info" show-icon> </el-alert>
    </div>
</template>

<script>
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
import { getPets, getPet } from "@/service/pet";
import Type from "@/assets/data/pet_type.json";
import Source from "@/assets/data/pet_source.json";
import Lucky from "@/assets/data/pet_lucky.json";
import petItem from "@/components/pet/PetLink.vue";
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
            Lucky,
            petType: "",
            petSource: "",
            petName: "",
            luckyList: [],
        };
    },
    computed: {
        params: function () {
            return {
                Class: this.petType,
                Name: this.petName,
                Source: this.petSource,
                client: this.client,
            };
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
            return this.pages > 1 && this.page < this.total;
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
        request_params: {
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
                    let newList = res.data.list; //.filter((item) => {
                    // return item.NameFrame
                    // })
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
            let rawDate = new Date();
            let dateIndex = rawDate.getMonth() + 1 + "" + rawDate.getDate();
            let luckyList = [];
            for (let i = 0; i < 3; i++) {
                getPet(this.Lucky.std[dateIndex][i]).then((res) => {
                    luckyList.push(res.data);
                });
            }
            this.luckyIndex = this.Lucky.std[dateIndex];
            this.luckyList = luckyList;
        },
    },
    filters: {},
    created: function () {
        this.getPetLucky();
    },
    mounted: function () {},
};
</script>

<style lang="less">
@import "~@/assets/css/pet/list.less";
</style>
