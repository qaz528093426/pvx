<template>
    <div class="m-manufacture-recipe" v-loading="loading" v-if="item">
        <!-- 配方信息展示 -->
        <el-popover popper-class="u-icon-popper" placement="right" :visible-arrow="false" trigger="hover">
            <Item :item_id="item.price_id" />
            <div class="u-img" slot="reference">
                <div class="u-border" :style="{ backgroundImage: item_border(item.Quality), opacity: item.Quality == 5 ? 0.9 : 1 }"></div>
                <span class="u-amount" v-if="item.CreateItemMin1 != item.CreateItemMax1">{{item.CreateItemMin1}}~{{item.CreateItemMax1}}</span>
                <img :src="iconLink(item.IconID)" :alt="item.Name" />
            </div>
        </el-popover>

        <span class="u-name" :class="`u-quality--${item.Quality}`">{{ item.Name }}</span>
        <div class="u-price u-interval" v-if="data.client == 'std'">
            [{{ data.server }}] 昨日平均价格:
            <GamePrice v-if="item.Price" class="u-price-num" :price="item.Price" /><span class="u-null" v-else>暂无数据</span>
        </div>
        <div class="u-info u-interval">
            <span>需求等级: <b>{{ item.nLevel || "未知" }}</b></span>
            <span>消耗精力: <b>{{ item.CostVigor }}</b></span>
            <span>经验值: <b>{{ item.Exp }}</b></span>
        </div>
        <template v-if="item.szTip">
            <span class="u-desc" v-for="text in textFilter(item.szTip)" :key="text">{{ text }}</span>
        </template>
        <div class="u-children" v-if="item.children && item.children.length">
            <el-divider content-position="left">合成所需材料</el-divider>
            <div class="u-child u-interval" v-for="(el, index) in item.children" :key="index">
                <el-popover popper-class="u-icon-popper" placement="right" :visible-arrow="false" width="auto" trigger="hover">
                    <Item :item_id="el.price_id" />
                    <div class="u-img" slot="reference">
                        <div class="u-border" :style="{ backgroundImage: item_border(el.Quality), opacity: el.Quality == 5 ? 0.9 : 1 }"></div>
                        <img v-if="el.item_info" :src="iconLink(el.item_info.IconID)" :alt="item.Name" />
                    </div>
                </el-popover>

                <div class="u-info">
                    <div class="u-name u-interval">
                        <span v-if="el.item_info" :class="`u-quality--${el.Quality}`"> {{ el.item_info.Name }}</span>
                        <span class="u-num">数量：x {{ el.count }}</span>
                    </div>
                    <div class="u-price" v-if="data.client == 'std'">
                        {{ el.game_price ? "[NPC出售] 单价：" : `[${data.server}] 昨日平均单价：` }}
                        <PriceItem :data="{Price:el.Price,Name:el.Name,id:el.ID}" @toEmit="isPrice"/>
                    </div>
                    <div class="u-price" v-else>
                        [NPC出售] 单价：
                        <PriceItem :data="{Price:el.Price,Name:el.Name,id:el.ID}" @toEmit="isPrice"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="m-add">
            <el-input-number v-model="item.item.count" :min="1" @click.stop.native></el-input-number>
            <el-button icon="el-icon-shopping-cart-2" type="success" @click="toEmit({ id: item.ID, item, count: item.item.count })">
            </el-button>
        </div>
    </div>
</template>
<script>
import { getManufactureItem, getOther, getItemsPrice, getAuction } from "@/service/manufacture";
import { iconLink } from "@jx3box/jx3box-common/js/utils.js";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
import GamePrice from "@jx3box/jx3box-common-ui/src/wiki/GamePrice.vue";
import Item from "@jx3box/jx3box-editor/src/Item.vue";
import PriceItem from "@/components/manufacture/PriceItem.vue";
export default {
    name: "Recipe",
    props: ["data"],
    components: { Item, PriceItem, GamePrice },
    data: function () {
        return {
            loading: false,
            item: "",
            price: [],
            item_id: "",
        };
    },
    computed: {},
    methods: {
        iconLink,
        // 数据加载
        // ================
        // 获取item数据
        loadItem(data) {
            this.loading = true;
            getManufactureItem(data.craft_key, data.item_id, data.client)
                .then((res) => {
                    res.data && this.processor(res.data);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        // 根处理data,提取子物品id
        processor(data) {
            Object.keys(data).forEach((item) => {
                if (data[item]) {
                    let _type = [],
                        _list = [],
                        _count = [];
                    for (const key in data) {
                        if (key.startsWith("RequireItemType")) _type.push(data[key]);
                        if (key.startsWith("RequireItemIndex")) if (data[key]) _list.push(data[key]);
                        if (key.startsWith("RequireItemCount")) if (data[key]) _count.push(data[key]);
                    }
                    _list = _list.map((str, i) => {
                        str = { id: str, count: _count[i], price_id: _type[i] + "_" + str };
                        return str;
                    });
                    data.children = _list.length ? _list : [];

                    data.item = {
                        id: data.CreateItemIndex1,
                        count: this.data.count || 1,
                        price_id: data.CreateItemType1 + "_" + data.CreateItemIndex1,
                    };
                } else {
                    delete data[item];
                }
            });
            data.children && this.getChildData(data.children.map((item) => item.id));
            this.item = data;
        },
        // 根据子物品ID other 获取对应数据
        getChildData(arr) {
            if (!arr.length) return;
            getOther({ client: this.data.client, ids: arr.join(), per: arr.length }).then((res) => {
                let list = res.data.list;
                this.item.children = this.item.children.map((item) => {
                    let _item = list.filter((el) => item.id == el.ID);
                    item = { ...item, ..._item[0] };
                    delete item.Price;
                    return item;
                });
                this.getPrice();
            });
        },
        // 获取物品价格
        getPrice() {
            const arr = this.item.children.concat(this.item.item);
            const _ids = arr.map((item) => item.id);
            const _price_ids = arr.map((item) => item.price_id);
            this.getGamePrice({ ids: _ids.join(), client: this.data.client });
            if (this.data.client == "std") this.getAuctionPrice({ list: _price_ids.join(), server: this.data.server });
            this.getMyPrice();
            let _data = { item: this.item, id: this.data.item_id };
            if (this.data.count) _data.count = this.data.count;
            this.$emit("toEmit", _data);
        },
        // 获取NPC出售价格
        getGamePrice(data) {
            getItemsPrice(data).then((res) => {
                let list = res.data;
                this.item.children = this.item.children.map((item) => {
                    list.forEach((el) => {
                        if (el.ItemIndex == item.id) {
                            item.Price = el.Price;
                            this.isPrice({ Price: item.Price, id: item.id });
                        }
                    });
                    return item;
                });
            });
        },
        // 获取交易行价格
        getAuctionPrice(data) {
            getAuction(data).then((res) => {
                let data = res.data.data;
                if (data[this.item.item.price_id]) this.item.Price = data[this.item.item.price_id].avg_price;
                this.item.children = this.item.children.map((item) => {
                    if (data[item.price_id]) {
                        item.Price = data[item.price_id].avg_price;
                        this.isPrice({ Price: item.Price, id: item.id });
                    }
                    return item;
                });
            });
        },
        // 显示自定义价格
        getMyPrice(data = this.data.my_prices) {
            if (data[this.item.ID]) this.item.Price = data[this.item.ID].Price;
            this.item.children = this.item.children.map((item) => {
                if (data[item.id]) item.Price = data[item.id].Price;
                return item;
            });
        },
        // 自定义物品价格
        isPrice(data) {
            this.getMyPrice({ [data.id]: data });
            let _data = { id: this.data.item_id, my_price: data };
            if (!this.data.my_prices[data.id]) this.$emit("toEmit", _data);
        },
        // 提交数据
        toEmit(data) {
            this.$emit("toEmit", data);
        },
        // 描述过滤
        textFilter(str) {
            // 匹配分段
            const regex = /<Text>text=(.*?)font=(\d+).*?<\/text>/gimsy;
            let matches = [];
            let match;
            while ((match = regex.exec(str))) {
                matches.push(match);
            }

            // 格式化分段
            let result = [];
            for (let group of matches) {
                result.push(group[1].slice(1, -2).replace(/[\\n]/g, ""));
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
        data: {
            deep: true,
            handler: function (data) {
                if (data.item) {
                    this.item = data.item;
                    let _data = {
                        item: data.item,
                        id: data.item_id,
                    };
                    if (data.count) _data.count = data.count;
                    this.$emit("toEmit", _data);
                } else {
                    this.loadItem(data);
                }
            },
        },
    },
    created: function () {},
};
</script>
<style lang="less">
    @import "~@/assets/css/manufacture/recipe.less";
</style>
