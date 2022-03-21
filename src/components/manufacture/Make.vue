<template>
    <div class="m-manufacture-make" v-loading="loading">
        <div class="m-list">
            <!-- 搜索框 -->
            <el-input class="u-input" v-model.lazy="search" :placeholder="`搜索${data.craft.name}配方`">
                <el-button slot="prepend" icon="el-icon-search"></el-button
            ></el-input>
            <!-- 默认展示 & 无搜索 -->
            <template v-if="!search">
                <el-collapse class="u-list" v-model="collapse" v-if="craft_list && craft_list.length">
                    <el-collapse-item
                        v-for="(item, index) in craft_list"
                        :key="index"
                        :title="item.BelongName"
                        :name="index"
                    >
                        <MakeItem
                            :class="item_id == child.ID ? 'active' : ''"
                            :item="child"
                            v-for="(child, k) in item.list"
                            :key="k"
                            @toEmit="toEmit"
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
                        @toEmit="toEmit"
                    />
                </template>
                <div v-else class="u-null"><i class="el-icon-warning"></i> 没有搜索到对应配方</div>
            </template>
        </div>
    </div>
</template>
<script>
import { getManufactures } from "@/service/manufacture";
import { iconLink } from "@jx3box/jx3box-common/js/utils.js";
import MakeItem from "@/components/manufacture/MakeItem.vue";
export default {
    name: "make",
    props: ["data"],
    components: { MakeItem },
    data: function () {
        return {
            loading: false,
            search: "",

            list_data: {},
            all_data: {},
            search_list: [],
            craft_list: [],

            collapse: 0,
            item_id: 0,
        };
    },
    computed: {
        craft_key() {
            return this.data.craft.key;
        },
        params() {
            return { client: this.data.client, type: this.craft_key, mode: "simple" };
        },
    },
    watch: {
        search(val) {
            let _list = [];
            this.all_data[this.craft_key].forEach((item) => {
                if (item.Name.indexOf(val) != -1) _list.push(item);
            });
            this.search_list = _list;
        },
        "data.serve": {
            deep: true,
            handler: function () {
                this.loadData();
            },
        },
    },
    methods: {
        // 数据获取和处理
        // ==========================
        // 获取数据
        loadData() {
            this.loading = true;
            if (this.list_data[this.craft_key]) return this.showList();

            getManufactures(this.params).then((res) => {
                let _data = res.data;
                _data = _data.map((item) => {
                    item.count = 1;
                    return item;
                });
                let _list = this.data.craft_group;
                let _obj = {};
                _data.forEach((item) => {
                    if (!_obj[item.Belong]) {
                        _obj[item.Belong] = [item];
                    } else {
                        _obj[item.Belong].push(item);
                    }
                });

                this.list_data[this.craft_key] = _list
                    .map((item) => {
                        for (const key in _obj) {
                            if (item.BelongID == key) item.list = _obj[key];
                        }
                        return item;
                    })
                    .filter((item) => item.list.length);
                this.all_data[this.craft_key] = _data;
                this.showList();
            });
        },
        // 展示列表并选择列表第一个作为显示
        showList() {
            this.item_id = this.list_data[this.craft_key][0].list[0].ID;
            this.craft_list = this.list_data[this.craft_key];
            this.$emit("toEmit", { id: this.item_id });
            this.loading = false;
            this.search = "";
        },

        // 交互
        // ===================
        // 发送emit
        toEmit(data) {
            this.item_id = data.id;
            this.$emit("toEmit", data);
            console.log(data,"make");
        },
        iconLink,
    },
};
</script>
<style lang="less">
@import "~@/assets/css/manufacture/make.less";
</style>
