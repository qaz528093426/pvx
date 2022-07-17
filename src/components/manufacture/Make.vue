<template>
    <div class="m-manufacture-make" v-loading="loading">
        <!-- 分类 -->
        <div class="u-tabs">
            <span
                v-for="(item, index) in craftData"
                :key="index"
                class="u-tab"
                :class="[`u-tab-${index}`, profession_id == item.ProfessionID ? 'active' : '']"
                @click="changeCraft(item)"
                >{{ item.name }}</span
            >
        </div>
        <div class="m-list">
            <!-- 搜索框 -->
            <el-input class="u-input" v-model.lazy="search" :placeholder="`搜索${craft_name}配方`">
                <el-button slot="prepend" icon="el-icon-search"></el-button>
            </el-input>
            <!-- 默认展示 & 无搜索 -->
            <template v-if="!search">
                <el-collapse class="u-list" v-model="collapse" v-if="list && list.length">
                    <el-collapse-item v-for="(item, index) in list" :key="index" :title="item.BelongName" :name="index">
                        <MakeItem
                            :class="item_id == child.ID ? 'active' : ''"
                            :item="child"
                            v-for="(child, k) in item.list"
                            :key="k"
                        />
                    </el-collapse-item>
                </el-collapse>
            </template>
            <!-- 有搜索展示 -->
            <template v-else>
                <div class="u-child-title">搜索结果</div>
                <template v-if="search_list.length">
                    <MakeItem
                        :class="item_id == item.ID ? 'active' : ''"
                        :item="item"
                        v-for="(item, k) in search_list"
                        :key="k"
                    />
                </template>
                <div v-else class="u-null"><i class="el-icon-warning"></i> 没有搜索到对应配方</div>
            </template>
        </div>
    </div>
</template>
<script>
import { getManufactures, getCraftJson } from "@/service/manufacture";
import { iconLink } from "@jx3box/jx3box-common/js/utils.js";
import { craft_types } from "@/assets/data/manufacture.json";
import MakeItem from "@/components/manufacture/MakeItem.vue";

export default {
    name: "make",
    components: { MakeItem },
    data: function () {
        return {
            loading: false,

            craftData: {},
            list: [],
            search_list: [],

            profession_id: "4",
            search: "",
            craft_key: "cooking",
            craft_name: "烹饪",
            collapse: 0,
        };
    },
    computed: {
        client() {
            return this.$store.state.client;
        },
        item_id() {
            return this.$store.state.item_id || this.list[0]?.list[0]?.ID;
        },
    },
    watch: {
        craft_key(val) {
            this.loadData(val);
        },
        search(val) {
            let _list = [];
            this.list.forEach((item) => {
                item.list.forEach((el) => {
                    if (el.Name.indexOf(val) != -1) _list.push(el);
                });
            });
            this.search_list = _list;
        },
        item_id(val) {
            let _item = {};
            this.list.forEach((item) => {
                item.list.forEach((el) => {
                    if (el.ID == val) _item = el;
                });
            });
            this.$store.commit("toState", { item_id: val, item: _item, craft_key: this.craft_key });
        },
    },
    methods: {
        iconLink,

        // 获取技艺数据
        loadCraftJson() {
            getCraftJson()
                .then((res) => {
                    let { origin, std } = res.data;
                    this.craftData =
                        this.client == "origin" ? this.toGroup(this.toMerge(origin)) : this.toGroup(this.toMerge(std));
                    this.loadData();
                })
                .finally(() => {
                    this.loading = false;
                });
        },

        // 获取配方list
        loadData(val = this.craft_key) {
            const params = { client: this.client, type: val, mode: "simple" };
            this.list = [];
            if (!this.craftData[this.craft_key].hasCraftData) {
                this.loading = true;
                getManufactures(params)
                    .then((res) => {
                        const list = this.craftData[this.craft_key].list;
                        res.data.forEach((item) => {
                            list.forEach((el) => {
                                if (el.BelongID == item.Belong) {
                                    el.list.push({ ...item, count: 1 });
                                }
                            });
                        });
                        this.craftData[this.craft_key].hasCraftData = true;
                        this.list = list.filter((item) => item.list.length);
                        this.craftData[this.craft_key].list = this.list;
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            } else {
                this.list = this.craftData[this.craft_key].list;
            }
        },

        // 1、合并数组相同项
        toMerge(arr) {
            let obj = {};
            arr.forEach((item) => {
                const { ProfessionID, BelongID, BelongName } = item;
                if (obj[ProfessionID]) {
                    obj[ProfessionID].push({ BelongID, BelongName, list: [] });
                } else {
                    obj[ProfessionID] = [{ BelongID, BelongName, list: [] }];
                }
            });
            return obj;
        },

        // 2、将对象按ProfessionID分组
        toGroup(obj) {
            const _obj = craft_types[this.client];
            let _new = {};
            Object.keys(obj).map((item, index) => {
                for (const key in _obj) {
                    if (_obj[key].ProfessionID == item)
                        _new[_obj[key].key] = {
                            ..._obj[key],
                            list: obj[item],
                        };
                }
            });
            return _new;
        },

        // 切换技能分类,技能名称，技能key
        changeCraft({ ProfessionID, name, key }) {
            this.profession_id = ProfessionID;
            this.craft_name = name;
            this.craft_key = key;
        },
    },
    created() {
        this.loadCraftJson();
    },
};
</script>
<style lang="less">
@import "~@/assets/css/manufacture/make.less";
</style>
