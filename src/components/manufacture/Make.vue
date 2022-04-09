<template>
    <div class="m-manufacture-make" v-loading="loading">
        <!-- 分类 -->
        <div class="u-tabs">
            <span v-for="(item, index) in craft_type" :key="index" class="u-tab" :class="[`u-tab${index}`, profession_id == item.ProfessionID ? 'active' : '']" @click="changeCraft(item)">{{ item.name }}</span>
        </div>
        <div class="m-list">
            <!-- 搜索框 -->
            <el-input class="u-input" v-model.lazy="search" :placeholder="`搜索${craft_name}配方`">
                <el-button slot="prepend" icon="el-icon-search"></el-button>
            </el-input>
            <!-- 默认展示 & 无搜索 -->
            <template v-if="!search">
                <el-collapse class="u-list" v-model="collapse" v-if="craft_list && craft_list.length">
                    <el-collapse-item v-for="(item, index) in craft_list" :key="index" :title="item.BelongName" :name="index">
                        <MakeItem :class="item_id == child.ID ? 'active' : ''" :item="child" v-for="(child, k) in item.list" :key="k" @toEmit="toEmit" />
                    </el-collapse-item>
                </el-collapse>
            </template>
            <!-- 有搜索展示 -->
            <template v-else>
                <div class="u-child-title">搜索结果</div>
                <template v-if="search_list.length">
                    <MakeItem :class="item_id == item.ID ? 'active' : ''" :item="item" v-for="(item, k) in search_list" :key="k" @toEmit="toEmit" />
                </template>
                <div v-else class="u-null"><i class="el-icon-warning"></i> 没有搜索到对应配方</div>
            </template>
        </div>
    </div>
</template>
<script>
import { getManufactures } from "@/service/manufacture";
import { iconLink } from "@jx3box/jx3box-common/js/utils.js";
import { craft_types } from "@/assets/data/manufacture.json";
import { getCraftJson } from "@/service/manufacture";
import MakeItem from "@/components/manufacture/MakeItem.vue";

export default {
    name: "make",
    components: { MakeItem },
    data: function () {
        return {
            loading: false,

            profession_id: "5",
            craft_key: "tailoring",
            craft_name: "缝纫",
            craft_group: "",

            search: "",
            search_list: [],

            collapse: 0,
            item_id: 0,
        };
    },
    computed: {
        client() {
            return this.$store.state.client;
        },
        craft_type() {
            return craft_types[this.client];
        },
        params() {
            return { client: this.client, type: this.craft_key, mode: "simple" };
        },
        craft_list() {
            return this.craft_group[this.profession_id];
        },
    },
    watch: {
        profession_id() {
            this.loadData();
        },
        search(val) {
            let _list = [];
            this.craft_list.forEach((item) => {
                item.list.forEach((el) => {
                    if (el.Name.indexOf(val) != -1) _list.push(el);
                });
            });
            this.search_list = _list;
        },
    },
    methods: {
        // 数据获取和处理
        // ==========================
        // 获取全部技艺分类并分组
        getCraftType() {
            getCraftJson().then((res) => {
                let craft_group = this.client == "std" ? res.data.std : res.data.origin;
                let _list = [];
                let _obj = {};
                craft_group.forEach((item) => {
                    if (!_obj[item.ProfessionID]) {
                        let _arr = [];
                        _arr.push({ ...item, list: [] });
                        _list.push(_arr);
                        _obj[item.ProfessionID] = item;
                    } else {
                        _list.forEach((el) => {
                            if (el[0].ProfessionID == item.ProfessionID) {
                                el.push({ ...item, list: [] });
                            }
                        });
                    }
                });
                for (const key in _obj) {
                    _obj[key] = _list.find((item) => {
                        if (item[0].ProfessionID == key) return item;
                    });
                }
                this.craft_group = _obj;
            });
        },
        // 获取技艺分类数据
        loadData() {
            if (this.craft_group[this.profession_id] && this.craft_group[this.profession_id][0].list.length) {
                this.item_id = this.craft_group[this.profession_id][0].list[0].ID;
                this.$emit("toEmit", { id: this.item_id, craft_key: this.craft_key });
                return this.craft_group[this.profession_id];
            }

            this.loading = true;
            getManufactures(this.params)
                .then((res) => {
                    let _data = res.data;
                    let _obj = {};
                    _data.forEach((item) => {
                        item.count = 1;
                        if (!_obj[item.Belong]) {
                            _obj[item.Belong] = [item];
                        } else {
                            _obj[item.Belong].push(item);
                        }
                    });
                    this.craft_group[this.profession_id] = this.craft_group[this.profession_id]
                        .map((item) => {
                            item.list = _obj[item.BelongID] || [];
                            return item;
                        })
                        .filter((item) => item.list.length !== 0);
                    this.item_id = this.craft_group[this.profession_id][0].list[0].ID;
                    this.$emit("toEmit", { id: this.item_id, craft_key: this.craft_key });
                })
                .finally(() => {
                    this.loading = false;
                });
        },

        // 交互
        // ===================
        // 切换技艺类别,并获取技艺对应的key和name
        changeCraft(item) {
            this.profession_id = item.ProfessionID;
            this.craft_key = item.key;
            this.craft_name = item.name;
        },
        // 发送emit
        toEmit(data) {
            this.item_id = data.id;
            data.craft_key = this.craft_key;
            this.$emit("toEmit", data);
            if (data.count)
                this.craft_group[this.profession_id].forEach((item) => {
                    item.list.map((list) => {
                        list.count = 1;
                    });
                });
        },
        iconLink,
    },
    created() {
        this.getCraftType();
        this.loadData();
    },
};
</script>
<style lang="less">
    @import "~@/assets/css/manufacture/make.less";
</style>
