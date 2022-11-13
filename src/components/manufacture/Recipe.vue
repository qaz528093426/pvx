<template>
    <div class="m-manufacture-recipe" v-loading="loading" v-if="item">
        <!-- 配方信息展示 -->
        <el-popover popper-class="u-icon-popper" placement="right" :visible-arrow="false" trigger="hover">
            <Item :item_id="item.item_key" />
            <div class="u-img" slot="reference">
                <span class="u-amount" v-if="item.CreateItemMin1 != item.CreateItemMax1"
                    >{{ item.CreateItemMin1 }}~{{ item.CreateItemMax1 }}</span
                >
                <div
                    class="u-border"
                    :style="{ backgroundImage: item_border(item.Quality), opacity: item.Quality == 5 ? 0.9 : 1 }"
                ></div>
                <img :src="iconLink(item.IconID)" :alt="item.Name" />
            </div>
        </el-popover>

        <span class="u-name" :class="`u-quality--${item.Quality}`">{{ item.Name }}</span>
        <div class="u-price u-interval" v-if="client == 'std'">
            [{{ server }}] 昨日平均价格:
            <GamePrice v-if="price[item.item_key]" class="u-price-num" :price="price[item.item_key]" /><span
                class="u-null"
                v-else
                >暂无数据</span
            >
        </div>
        <div class="u-info u-interval">
            <span
                >需求等级: <b>{{ item.nLevel || "未知" }}</b></span
            >
            <span
                >消耗精力: <b>{{ item.CostVigor }}</b></span
            >
            <span
                >经验值: <b>{{ item.Exp }}</b></span
            >
        </div>
        <template v-if="item.szTip">
            <span class="u-desc" v-for="text in textFilter(item.szTip)" :key="text">{{ text }}</span>
        </template>
        <div class="u-children" v-if="childrenList && childrenList.length">
            <el-divider content-position="left">合成所需材料</el-divider>
            <div class="u-child u-interval" v-for="(el, index) in childrenList" :key="index">
                <el-popover
                    popper-class="u-icon-popper"
                    placement="right"
                    :visible-arrow="false"
                    width="auto"
                    trigger="hover"
                >
                    <Item :item_id="el.price_id" />
                    <div class="u-img" slot="reference">
                        <div
                            class="u-border"
                            :style="{ backgroundImage: item_border(el.Quality), opacity: el.Quality == 5 ? 0.9 : 1 }"
                        ></div>
                        <img v-if="el.item_info" :src="iconLink(el.item_info.IconID)" :alt="item.Name" />
                    </div>
                </el-popover>

                <div class="u-info">
                    <div class="u-name u-interval">
                        <span v-if="el.item_info" :class="`u-quality--${el.Quality}`"> {{ el.item_info.Name }}</span>
                        <span class="u-num">数量：x {{ el.count }}</span>
                    </div>
                    <div class="u-price" v-if="client == 'std'">
                        {{ el.game_price ? "[NPC出售] 单价：" : `[${server}] 昨日平均单价：` }}
                        <PriceItem
                            :data="{
                                Price: priceData[el.ID] || el.Price || price[el.price_id],
                                Name: el.Name,
                                id: el.ID,
                            }"
                        />
                    </div>
                    <div class="u-price" v-else>
                        [NPC出售] 单价：
                        <PriceItem :data="{ Price: priceData[el.ID] || el.Price, Name: el.Name, id: el.ID }" />
                    </div>
                </div>
            </div>
        </div>
        <div class="m-add">
            <el-input-number v-model="count" :min="1" @click.stop.native></el-input-number>
            <el-button icon="el-icon-shopping-cart-2" type="success" @click="addCart"> </el-button>
        </div>
    </div>
</template>
<script>
import { getManufactureItem, getAuctionPrice } from "@/service/manufacture";
import { iconLink } from "@jx3box/jx3box-common/js/utils.js";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
import { mapState } from "vuex";
import GamePrice from "@jx3box/jx3box-common-ui/src/wiki/GamePrice.vue";
import Item from "@jx3box/jx3box-editor/src/Item.vue";
import PriceItem from "@/components/manufacture/PriceItem.vue";
export default {
    name: "Recipe",
    components: { Item, PriceItem, GamePrice },
    data: function () {
        return {
            loading: false,

            count: "",
            item: {},
            price: {},
        };
    },
    computed: {
        ...mapState([
            "item_id",
            "client",
            "server",
            "craft_key",
            "priceData",
            "itemData",
            "cartList",
            "childrenList",
            "hasItems",
        ]),
    },
    methods: {
        iconLink,
        // // 数据加载
        // // ================
        // // 获取item数据
        loadData() {
            this.loading = true;

            this.item_id &&
                getManufactureItem(this.craft_key, this.item_id, this.client)
                    .then((res) => {
                        res.data && this.processor(res.data);
                    })
                    .finally(() => {
                        this.loading = false;
                    });
        },
        // 1、过滤空值 拼合物品ID
        processor(data) {
            let _obj = {},
                _type = [],
                _list = [],
                _count = [],
                _item = [];
            Object.keys(data).forEach((key) => {
                if (data[key]) {
                    if (key.startsWith("RequireItem")) {
                        if (key.startsWith("RequireItemType")) _type.push(data[key]);
                        if (key.startsWith("RequireItemIndex")) _list.push(data[key]);
                        if (key.startsWith("RequireItemCount")) _count.push(data[key]);
                    } else if (key.startsWith("CreateItem")) {
                        if (key.startsWith("CreateItemType1")) _item[0] = data[key];
                        if (key.startsWith("CreateItemIndex1")) _item[1] = data[key];
                        if (key.startsWith("CreateItemMax1")) _obj[key] = data[key];
                        if (key.startsWith("CreateItemMin1")) _obj[key] = data[key];
                    } else {
                        _obj[key] = data[key];
                    }
                }
            });
            _list = _list.map((str, i) => {
                str = { id: str, count: _count[i], price_id: _type[i] + "_" + str };
                return str;
            });
            _obj.item_key = _item[0] + "_" + _item[1];
            _obj.count = 1;
            const childrenList = _list.length ? _list : [];
            this.$store.commit("toState", { childrenList });
            this.$store.dispatch("asyncChildrenList", childrenList);
            this.toAuctionPrice(childrenList, _obj.item_key);

            this.item = _obj;
            this.$store.commit("toState", { item: this.item });
        },
        // 获取交易行价格
        toAuctionPrice(arr = this.childrenList, key = this.item.item_key) {
            let price_ids = arr.map((item) => item.price_id);
            getAuctionPrice({ itemIds: price_ids.concat(key).join(), server: this.server }).then((res) => {
                let priceData = {};
                Object.keys(res.data.data).forEach((item) => {
                    priceData[item] = res.data.data[item].AvgPrice;
                });
                this.price = priceData;
                this.$store.commit("toState", { auctionPrice: priceData });
            });
        },
        // 添加到购物车
        addCart() {
            this.$store.dispatch("toAddCart", { count: this.count });
        },

        // 描述过滤
        textFilter(str) {
            // 匹配分段
            const regex = /<Text>text="(.*?)"\s*?font=(\d+)\s*?<\/text>/gimsy;
            let matches = [];
            let match;
            while ((match = regex.exec(str))) {
                matches.push(match);
            }

            // 格式化分段
            let result = [];
            for (let group of matches) {
                result.push(group[1].replace(/[\\n]/g, ""));
            }
            result = result.filter(Boolean);
            return result;
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
    watch: {
        item_id() {
            this.loadData();
        },
        server() {
            this.toAuctionPrice();
        },
        count(count) {
            this.item.count = count;
            this.$store.commit("toState", { item: this.item });
        },
    },
    created: function () {},
};
</script>
<style lang="less">
@import "~@/assets/css/manufacture/recipe.less";
</style>
