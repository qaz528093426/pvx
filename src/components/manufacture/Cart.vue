<template>
    <div class="m-manufacture-cart">
        <div class="m-title">
            <div class="u-label"><i class="el-icon-box"></i> <span>成本计算</span></div>
            <el-button
                v-if="cart_list.length"
                class="u-del"
                type="info"
                plain
                size="mini"
                @click="toEmit({ del: -1 })"
                icon="el-icon-delete"
                @toEmit="toEmit"
                >全部清空</el-button
            >
        </div>
        <template v-if="cart_list.length">
            <div class="m-item" v-for="(item, index) in cart_list" :key="index">
                <div class="u-header">
                    <el-popover popper-class="u-icon-popper" placement="right" :visible-arrow="false" trigger="hover">
                        <Item :item_id="item.item_type_id" />
                        <div class="u-header-inner" slot="reference">
                            <div
                                class="u-border"
                                :style="{
                                    backgroundImage: item_border(item.Quality),
                                    opacity: item.Quality == 5 ? 0.9 : 1,
                                }"
                            ></div>
                            <img class="u-img" :src="iconLink(item.IconID)" :alt="item.Name" />
                            <span class="u-title" :class="`u-quality--${item.Quality}`">{{ item.Name }}</span>
                        </div>
                    </el-popover>
                    <el-button
                        class="u-del"
                        type="info"
                        plain
                        size="mini"
                        @click="toEmit({ del: item.ID })"
                        icon="el-icon-delete"
                        >移除</el-button
                    >
                </div>

                <div class="u-info">
                    <el-divider content-position="left">[ {{server}} ] - <i class="el-icon-box"></i> 材料成本统计</el-divider>
                    <div class="u-children">
                        <div class="u-child" v-for="(child, k) in item.child_list" :key="k">
                            <el-popover
                                popper-class="u-icon-popper"
                                placement="right"
                                :visible-arrow="false"
                                trigger="hover"
                            >
                                <Item :item_id="child.price_id" />
                                <div class="u-img" slot="reference">
                                    <img :src="iconLink(child.item_info.IconID)" :alt="child.Name" />
                                    <span
                                        >{{ child.Name }}x <b>{{ child.count * item.count }}</b></span
                                    >
                                </div>
                            </el-popover>

                            <GamePrice v-if="child.Price" class="u-price-num" :price="child.allPrice * item.count" />
                            <span v-else class="u-null">-</span>
                        </div>
                    </div>
                    <div class="u-item-num">
                        <span>制作次数：</span>
                        <el-input-number v-model="item.count" :min="1" size="mini"></el-input-number>
                    </div>
                    <div class="u-item-num">
                        <span><i class="el-icon-sunny"></i> 消耗精力值：</span> <b>{{ item.CostVigor * item.count }}</b>
                    </div>
                    <div class="u-item-num">
                        <span><i class="el-icon-coin"></i> 小计金额：</span>
                        <span class="u-price">
                            <GamePrice class="u-price-num" :price="item.all_price * item.count" />
                        </span>
                    </div>
                </div>
            </div>
        </template>

        <div class="m-null" v-else>- 暂未添加生产配方 -</div>

        <div class="m-all" v-if="all_exp">
            <div class="u-label">总计</div>
            <div class="u-value">
                <div class="u-num">
                    <span><i class="el-icon-sunny"></i> 消耗精力值：</span>
                    <b>{{ all_exp }}</b>
                </div>
                <div class="u-num u-price">
                    <span><i class="el-icon-coin"></i> 消耗金钱：</span>
                    <GamePrice v-if="all_price" class="u-price-num" :price="all_price" />
                </div>
            </div>
        </div>

        <CreatePlan :list="cart_list" />
    </div>
</template>
<script>
import { iconLink } from "@jx3box/jx3box-common/js/utils.js";
import GamePrice from "@jx3box/jx3box-common-ui/src/wiki/GamePrice.vue";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
import Item from "@jx3box/jx3box-editor/src/Item.vue";
import CreatePlan from "@/components/manufacture/CreatePlan.vue";
export default {
    name: "cart",
    props: ["list", "server"],
    components: { GamePrice, Item, CreatePlan },
    data: function () {
        return {
            cart_list: [],
        };
    },
    computed: {
        all_exp() {
            if (!this.cart_list.length) return 0;
            let _num = 0;
            let _list = this.cart_list.map((item) => {
                return { exp: item.CostVigor, count: item.count };
            });
            _list.forEach((item) => {
                _num += item.count * item.exp;
            });
            return _num;
        },
        all_price() {
            if (!this.cart_list.length) return 0;
            let _num = 0;
            let _list = this.cart_list.map((item) => {
                return { price: item.all_price, count: item.count };
            });
            _list.forEach((item) => {
                _num += item.count * item.price;
            });
            return _num;
        },
    },
    watch: {
        list: {
            deep: true,
            immediate: true,
            handler: function (list) {
                if (list.length) this.toRepeated(list);
            },
        },
        server() {
            this.toEmit({ del: -1 });
        },
    },
    methods: {
        iconLink,
        // 计算子材料价格
        toRepeated(list) {
            this.cart_list = list.map((item) => {
                let _price = 0;
                item.child_list.map((el) => {
                    if (!el.Price) el.Price = 0;
                    el.allPrice = el.Price * el.count;
                    _price += el.allPrice;
                    return el;
                });
                item.all_price = _price;
                return item;
            });
        },
        // 移除
        toEmit(data) {
            this.cart_list = [];
            this.$emit("toEmit", data);
        },
        // icon边框
        item_border(id) {
            switch (id) {
                case 3:
                    return `url(${__imgPath}image/item/blue.png)`;
                case 4:
                    return `url(${__imgPath}image/item/purple.png)`;
                case 5:
                    return `url(${__imgPath}image/item/orange.gif)`;
                default:
                    return "";
            }
        },
    },
    created() {},
};
</script>
<style lang="less">
@import "~@/assets/css/manufacture/cart.less";
</style>
