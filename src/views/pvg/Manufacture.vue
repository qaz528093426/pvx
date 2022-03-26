<template>
    <div class="m-main">
        <div class="m-manufacture-header">
            <h1 class="u-title">技艺助手</h1>
            <div class="u-settings" v-if="isStd">
                <div class="u-servers">
                    <el-select v-model="server" placeholder="请选择" size="small">
                        <span slot="prefix" class="u-prefix"><i class="el-icon-coin"></i> 价格参考服务器</span>
                        <el-option v-for="item in server_list" :key="item" :label="item" :value="item"> </el-option>
                    </el-select>
                </div>
            </div>
        </div>
        <div class="m-manufacture-main">
            <div class="m-manufacture-sidebar">
                <!-- 分类 -->
                <div class="u-tabs">
                    <span
                        v-for="(item, index) in craft_types"
                        :key="index"
                        class="u-tab"
                        :class="[`u-tab${index}`, profession_id == item.ProfessionID ? 'active' : '']"
                        @click="changeCraft(item.ProfessionID, item.key)"
                        >{{ item.name }}</span
                    >
                </div>
                <!-- 左侧 & 可制作模块 -->
                <Make class="u-left" :data="make_props" @toEmit="isEmit" />
            </div>
            <div class="m-manufacture-content">
                <!-- 中间 & 配方展示 -->
                <Recipe class="u-middle" :data="recipe_props" @toEmit="isEmit" />
                <!-- 右侧 & 购物车计算 -->
                <Cart class="u-right" :list="cart_list" :server="server" @toEmit="isEmit" />
            </div>
        </div>
    </div>
</template>

<script>
import servers_std from "@jx3box/jx3box-data/data/server/server_std.json";
import servers_origin from "@jx3box/jx3box-data/data/server/server_origin.json";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
import { craft_types } from "@/assets/data/manufacture.json";
import { getCraftJson } from "@/service/manufacture";
import Recipe from "@/components/manufacture/Recipe.vue";
import Make from "@/components/manufacture/Make.vue";
import Cart from "@/components/manufacture/Cart.vue";

export default {
    name: "Manufacture",
    components: { Make, Recipe, Cart },
    data: function () {
        return {
            server: "蝶恋花",
            profession_id: 5,
            craft_key: "tailoring",
            craft_group: [],
            cart_item: "",

            // 传值
            item_id: "",
            add: false,
            count: 0,
            cart_list: [],
        };
    },
    computed: {
        craft_types() {
            return craft_types[this.client];
        },
        // 服务器
        server_list() {
            return this.client == "std" ? servers_std : servers_origin;
        },
        client() {
            return this.$store.state.client;
        },
        isStd() {
            return this.client == "std";
        },
        make_props() {
            let _list = this.craft_group.filter((item) => {
                if (this.profession_id == item[0].ProfessionID) return item;
            });
            let craft = this.craft_types.filter((item) => {
                if (item.key == this.craft_key) return item;
            });
            return {
                client: this.client,
                craft: craft[0],
                craft_group: _list[0],
            };
        },
        recipe_props() {
            return {
                count: this.count,
                add: this.add,
                client: this.client,
                item_id: this.item_id,
                craft_key: this.craft_key,
                server: this.server,
            };
        },
    },
    methods: {
        // 切换技艺类别
        changeCraft(i, key) {
            if (this.craft_key == key) return;
            this.profession_id = i;
            this.craft_key = key;
            this.item_id = "";
        },
        // 获取全部技艺分类并分组
        getCraftType() {
            getCraftJson().then((res) => {
                let craft_group = this.client == "std" ? res.data.std : res.data.origin;
                let _list = [];
                let _obj = {};
                craft_group.forEach((item) => {
                    if (!_obj[item.ProfessionID]) {
                        var _arr = [];
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

                this.craft_group = _list;
            });
        },

        // 子组件传值
        isEmit(data) {
            this.add = data.add || false;
            if (data.count) this.count = data.count;
            if (data.id) this.item_id = data.id;
            if (data.item) this.addToCart(data.item, data);
            if (data.del) {
                data.del == -1
                    ? this.cart_list.splice(0, this.cart_list.length)
                    : (this.cart_list = this.cart_list.filter((item) => item.ID !== data.del));
            }
        },
        // 加入购物车
        addToCart(obj, data, count = this.count) {
            if (data.add) return;
            let _obj = Object.assign({}, obj);
            this.cart_list.some((item) => item.ID == obj.ID)
                ? this.cart_list.forEach((item) => {
                      if (item.ID == obj.ID) item.count += count;
                  })
                : this.cart_list.push(_obj);
            this.count = 0;
        },
    },
    created() {
        this.getCraftType();
    },
};
</script>

<style lang="less">
@import "~@/assets/css/manufacture/index.less";
</style>
