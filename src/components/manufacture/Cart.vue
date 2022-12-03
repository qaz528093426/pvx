<template>
    <div class="m-manufacture-cart">
        <div class="m-title">
            <div class="u-label"><i class="el-icon-box"></i> <span>成本计算</span></div>
            <el-button
                v-if="cartList.length"
                class="u-del"
                type="info"
                plain
                size="mini"
                icon="el-icon-delete"
                @click="clientCart(0)"
                >全部清空</el-button
            >
        </div>
        <template v-if="cartList.length">
            <div class="m-item" v-for="(item, index) in cartList" :key="index">
                <div class="u-header">
                    <el-popover popper-class="u-icon-popper" placement="right" :visible-arrow="false" trigger="hover">
                        <Item :item_id="item.item_key" />
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
                        icon="el-icon-delete"
                        @click="clientCart(item.ID)"
                        >移除</el-button
                    >
                </div>

                <div class="u-info">
                    <el-divider content-position="left"
                        >[ {{ server }} ] - <i class="el-icon-box"></i> 材料成本统计</el-divider
                    >
                    <div class="u-children">
                        <div class="u-child" v-for="(child, k) in item.childrenList" :key="k">
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
                            <PriceItem
                                class="u-price-num"
                                :data="{
                                    Price: child.Price * child.count * item.count,
                                    Name: child.Name,
                                    id: child.ID,
                                }"
                            />
                        </div>
                    </div>
                    <div class="u-item-num">
                        <span>制作次数：</span>
                        <el-input-number v-model="counts[index]" size="mini"></el-input-number>
                    </div>
                    <div class="u-item-num">
                        <span><i class="el-icon-sunny"></i> 消耗精力值：</span>
                        <b>{{ (item.CostVigor || item.CostStamina) * item.count }}</b>
                    </div>
                    <div class="u-item-num">
                        <span><i class="el-icon-coin"></i> 小计金额：</span>
                        <span class="u-price">
                            <GamePrice class="u-price-num" :price="item.allPrice * item.count" />
                        </span>
                    </div>
                </div>
            </div>
        </template>

        <div class="m-null" v-else>- 暂未添加生产配方 -</div>

        <div class="m-all" v-if="allExp">
            <div class="u-label">总计</div>
            <div class="u-value">
                <div class="u-num">
                    <span><i class="el-icon-sunny"></i> 消耗精力值：</span>
                    <b>{{ allExp }}</b>
                </div>
                <div class="u-num u-price">
                    <span><i class="el-icon-coin"></i> 消耗金钱：</span>
                    <GamePrice v-if="allPrice" class="u-price-num" :price="allPrice" />
                </div>
            </div>
        </div>

        <CreatePlan :list="cartList" />
    </div>
</template>
<script>
import { iconLink } from "@jx3box/jx3box-common/js/utils.js";
import GamePrice from "@jx3box/jx3box-common-ui/src/wiki/GamePrice.vue";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
import { mapState } from "vuex";
import Item from "@jx3box/jx3box-editor/src/Item.vue";
import PriceItem from "@/components/manufacture/PriceItem.vue";
import CreatePlan from "@/components/manufacture/CreatePlan.vue";
export default {
    name: "cart",
    props: ["data"],
    components: { GamePrice, Item, CreatePlan, PriceItem },
    data: function () {
        return {
            counts: {},
        };
    },
    computed: {
        ...mapState(["server"]),
        cartList: {
            get() {
                let list = this.$store.state.cartList.map((item, key) => {
                    let sum = 0;
                    item.childrenList = item.childrenList.map((el) => {
                        sum += ~~el.Price * el.count;
                        return el;
                    });
                    item.allPrice = sum;
                    return item;
                });
                return list;
            },
            set(arr) {
                this.$store.commit("toState", { cartList: arr });
            },
        },
        allExp() {
            if (!this.cartList.length) return 0;
            let _num = 0;
            let _list = this.cartList.map((el) => {
                return { exp: el.CostVigor || el.CostStamina, count: el.count };
            });
            _list.forEach((item) => {
                _num += item.count * item.exp;
            });
            return _num;
        },
        allPrice() {
            if (!this.cartList.length) return 0;
            let _num = 0;
            this.cartList.forEach((item) => {
                _num += item.allPrice * item.count;
            });
            return _num;
        },
    },
    watch: {
        cartList: {
            deep: true,
            immediate: true,
            handler: function (arr) {
                arr.forEach((item, key) => {
                    this.$set(this.counts, key, item.count);
                });
            },
        },
        counts: {
            deep: true,
            handler: function (obj) {
                let arr = this.cartList;
                Object.keys(obj).forEach((index) => {
                    arr[index].count = obj[index];
                });
                this.cartList = arr;
            },
        },
    },
    methods: {
        iconLink,
        // 移除
        clientCart(id) {
            this.cartList = id ? this.cartList.filter((item) => item.ID !== id) : [];
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
};
</script>
<style lang="less">
@import "~@/assets/css/manufacture/cart.less";
</style>
