<template>
    <div class="v-pet-list">
        <div class="v-pet-listGuide flex">
            <img src="https://img.jx3box.com/image/pvx/petbg.png" class="v-pet-bg" />
            <div class="v-pet-guideTil flex">
                <img src="https://img.jx3box.com/image/pvx/pettitle.png" />
            </div>
            <div class="v-pet-screen flex">
                <div class="v-pet-select flex">
                    <el-radio-group
                        v-model="petTypeNum"
                        v-if="true"
                        @change="getPetType"
                    >
                        <el-radio
                            v-for="item in petType"
                            :key="item.type"
                            :label="item.class"
                            >{{ item.name }}</el-radio
                        >
                    </el-radio-group>
                    <el-radio-group v-model="petSourceNum" v-else>
                        <el-radio
                            v-for="item in petSource"
                            :key="item.source"
                            :label="item.source"
                            >{{ item.name }}</el-radio
                        >
                    </el-radio-group>
                </div>
                <div class="v-pet-search flex">
                    <el-input
                        placeholder="输入宠物名字搜索"
                        v-model="petName"
                        @change="getPetName"
                        clearable
                    >
                    </el-input>
                </div>
            </div>
        </div>
        <div class="v-pet-listContent flex" v-if="petList.length > 0">
            <petLink
                v-for="pet in petList"
                :key="pet.index"
                :petObject="pet"
            ></petLink>
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
                :page-size="per"
                :total="total"
                :current-page.sync="page"
                @current-change="changePage"
            ></el-pagination>
        </div>
        <div class="v-pet-listContent flex" v-else>没有找到相关宠物</div>
    </div>
</template>

<script>
import { getPets } from "@/service/pet";
import petType from "../../assets/data/pet_type.json";
import petSource from "../../assets/data/pet_source.json";
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
            per: 15, //每页条目
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
            };
        },
        hasNextPage: function () {
            return this.pages > 1 && this.page < this.total;
        },
    },
    watch: {},
    methods: {
        // 获取宠物列表
        getPetList: function () {
            this.loading = true;
            let params =
                "&Class=" +
                this.petTypeNum +
                "&Name=" +
                this.petName +
                "&Source=" +
                this.petSourceNum +
                "&page=" +
                this.page;
            getPets(params)
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
        // 获取宠物种类
        getPetType: function () {
            this.page = 1;
            this.getPetList();
        },
        // 获取搜索框内容
        getPetName: function () {
            this.page = 1;
            this.getPetList();
        },
        changePage(i) {
            this.page = i;
            this.getPetList();
        },
        appendPage: function () {
            this.appendMode = true;
            this.page = this.page + 1;
            this.getPetList();
        },
    },
    filters: {},
    created: function () {},
    mounted: function () {
        this.getPetList();
    },
};
</script>

<style lang="less">
@import "~@/assets/css/pet/list.less";
</style>
