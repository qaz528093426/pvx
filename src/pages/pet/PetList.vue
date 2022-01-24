<template>
    <div class="v-pet-list">
        <div class="v-pet-listGuide flex">
            <img :src="getPic('image/pvx/petbg.png')" class="v-pet-bg" />
            <div class="v-pet-guideTil flex">
                <img :src="getPic('image/pvx/pettitle.png')" />
            </div>
            <div class="v-pet-screen flex">
                <div class="v-pet-select flex">
                    <el-radio-group class="u-type" v-model="petTypeNum">
                        <el-radio v-for="item in petType" :key="item.type" :label="item.class">{{ item.name }}</el-radio>
                    </el-radio-group>
                    <el-select class="u-source" v-model="petSourceNum" placeholder="获取来源">
                        <el-option v-for="item in petSource" :key="item.source" :label="item.name" :value="item.source"> </el-option>
                    </el-select>
                </div>
                <div class="v-pet-search flex">
                    <el-input placeholder="输入宠物名字搜索" v-model="petName" clearable> </el-input>
                </div>
            </div>
        </div>
        <div class="v-pet-listContent flex" v-if="petList.length > 0">
            <petLink v-for="pet in petList" :key="pet.index" :petObject="pet"></petLink>
            <el-button class="m-archive-more" v-show="hasNextPage" type="primary" @click="appendPage" :loading="loading" icon="el-icon-arrow-down">加载更多</el-button>
            <el-pagination
                class="m-archive-pages"
                background
                layout="total, prev, pager, next, jumper"
                :hide-on-single-page="true"
                :page-size="per"
                :total="total"
                :current-page.sync="page"
            ></el-pagination>
        </div>
        <div class="v-pet-listContent flex" v-else>没有找到相关宠物</div>
    </div>
</template>

<script>
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
import { getPets } from "@/service/pet";
import petType from "@/assets/data/pet_type.json";
import petSource from "@/assets/data/pet_source.json";
import petLink from "@/components/pet/PetLink.vue";
export default {
    name: "PetList",
    props: [],
    components: {
        petLink,
    },
    data: function () {
        return {
            loading: false,
            petList: [],
            page: 1, //当前页数
            total: 1, //总条目数
            pages: 1, //总页数
            per: 16, //每页条目
            appendMode: false, //追加模式

            petType,
            petSource,
            petTypeNum: "",
            petSourceNum: "",
            petName: "",
        };
    },
    computed: {
        params: function () {
            return {
                per: this.per,
                page: this.page || 1,
                Class: this.petTypeNum,
                Name: this.petName,
                Source: this.petSourceNum,
            };
        },
        resetParams: function () {
            return [this.Name, this.petTypeNum, this.petSourceNum];
        },
        hasNextPage: function () {
            return this.pages > 1 && this.page < this.total;
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
            this.page++;
        },
        // 获取宠物列表
        getPetList: function () {
            this.loading = true;
            getPets(this.params)
                .then((res) => {
                    let newList = [];
                    for (let i = 0; i < res.data.list.length; i++) {
                        if (res.data.list[i].NameFrame) {
                            newList.push(res.data.list[i]);
                        }
                    }
                    if (this.appendMode) {
                        this.petList = this.petList.concat(newList);
                    } else {
                        this.petList = newList;
                    }
                    this.total = res.data.total;
                    this.pages = res.data.pages;
                })
                .finally(() => {
                    this.appendMode = false;
                    this.loading = false;
                });
        },
    },
    filters: {},
    created: function () {},
    mounted: function () {},
};
</script>

<style lang="less">
@import "~@/assets/css/adventure/list.less";
</style>
