<template>
    <div class="m-manufacture-recipe" v-loading="loading" v-if="item">
        <!-- 配方信息展示 -->
        <el-popover popper-class="u-icon-popper" placement="right" :visible-arrow="false" trigger="hover">
            <Item :item_id="item.price_id" />
            <div class="u-img" slot="reference">
                <div
                    class="u-border"
                    :style="{ backgroundImage: item_border(item.Quality), opacity: item.Quality == 5 ? 0.9 : 1 }"
                ></div>
                <img :src="iconLink(item.IconID)" :alt="item.Name" />
            </div>
        </el-popover>

        <span class="u-name" :class="`u-quality--${item.Quality}`">{{ item.Name }}</span>
        <div class="u-price u-interval" v-if="data.client == 'std'">
            [{{ data.server }}] 昨日平均价格:<GamePrice
                v-if="item.Price"
                class="u-price-num"
                :price="item.Price"
            /><span class="u-null" v-else>暂无数据</span>
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
        <div class="u-children" v-if="item.child_list && item.child_list.length">
            <el-divider content-position="left">合成所需材料</el-divider>
            <div class="u-child u-interval" v-for="(el, index) in item.child_list" :key="index">
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
                        <span :class="`u-quality--${el.Quality}`"> {{ el.Name }}</span>
                        <span class="u-num">数量：x {{ el.count }}</span>
                    </div>
                    <div class="u-price" v-if="data.client == 'std'">
                        {{ el.game_price ? "[NPC出售] 价格：" : `[${data.server}] 昨日平均价格：` }}
                        <GamePrice v-if="el.Price" class="u-price-num" :price="el.Price" /><span class="u-null" v-else
                            >暂无数据</span
                        >
                    </div>
                    <div class="u-price" v-else>
                        [NPC出售] 价格：<GamePrice v-if="el.Price" class="u-price-num" :price="el.Price" /><span
                            class="u-null"
                            v-else
                            >暂无数据</span
                        >
                    </div>
                </div>
            </div>
        </div>
        <div class="m-add">
            <el-input-number v-model="item.count" :min="1" @click.stop.native></el-input-number>
            <el-button icon="el-icon-shopping-cart-2" type="success" @click="toEmit({ id: item.ID, item, count: item.count })">
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
export default {
    name: "Recipe",
    props: ["data"],
    data: function () {
        return {
            loading: false,
            item: "",
            first: true,

            cache_list: [],
            price: [],
            item_id: "",
        };
    },
    components: { GamePrice, Item },
    computed: {
        item_ids() {
            let list = {
                id: this.item.CreateItemIndex1,
                price_id: this.item.CreateItemType1 + "_" + this.item.CreateItemIndex1,
            };
            return list;
        },
    },

    methods: {
        iconLink,
        // 数据加载
        // ================
        // 获取item
        loadItem(data) {
            this.loading = true;
            this.first = true;
            this.item_id = data.item_id;
            getManufactureItem(data.craft_key, data.item_id, data.client)
                .then((res) => {
                    res.data.children = [];
                    res.data.child_list = [];
                    res.data.count = 1;
                    let _res = this.processor(res.data);
                    this.item = _res;
                    this.item.item_type_id = this.item_ids.price_id;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        // 根处理data,提取子物品id
        processor(data) {
            // 过滤 value 为 null
            Object.keys(data).forEach((item) => {
                const key = data[item];
                if (key === "" || key === null || key === undefined) {
                    delete data[item];
                }
            });
            // 提取合成id，并拼合组成对应物品id和数量
            let _type = [];
            let _list = [];
            let _count = [];
            for (const key in data) {
                if (key.startsWith("RequireItemType")) {
                    _type.push(data[key]);
                }
                if (key.startsWith("RequireItemIndex")) {
                    if (data[key]) _list.push(data[key]);
                }
                if (key.startsWith("RequireItemCount")) {
                    if (data[key]) _count.push(data[key]);
                }
            }
            _list = _list.map((str, i) => {
                str = { id: str, count: _count[i], price_id: _type[i] + "_" + str };
                return str;
            });
            if (_list.length) data.children = _list;
            return data;
        },
        // 根据子物品ID other 获取对应数据 => cache_list
        getChildData(arr) {
            if (!arr.length) return;
            let _arr = arr.map((item) => item.id);
            getOther({ client: this.data.client, ids: _arr.join(), per: _arr.length })
                .then((res) => {
                    let list = res.data.list;
                    list = list.map((item) => {
                        arr.forEach((el) => {
                            if (item.ID == el.id) {
                                item.count = el.count;
                                item.id = item.ID;
                                delete item.Price;
                            }
                        });
                        return item;
                    });

                    this.cache_list = list;
                })
                .finally(() => {
                    this.first = false;
                });
        },
        // 获取正式服价格
        getStdPrice(list) {
            let arr = [...list, this.item_ids];
            arr = arr.map((item) => {
                this.item.children.forEach((el) => {
                    if (item.ID == el.id) item = Object.assign(item, el);
                });
                return item;
            });
            let _ids = arr.map((item) => item.id);
            getItemsPrice({ ids: _ids.join(), client: this.$store.state.client }).then((res) => {
                let _list = res.data;
                let _arr = [];
                if (_list) {
                    _list = _list.map((item) => {
                        return {
                            id: item.ItemIndex,
                            Price: item.Price,
                            Name: item.Name,
                            game_price: true,
                        };
                    });
                    _arr = arr.filter((item) => {
                        return !_list.some((el) => el.id == item.id) ? item : "";
                    });
                } else {
                    _arr = arr;
                }
                let _price_ids = arr.map((item) => item.price_id);
                if (_arr.length) {
                    getAuction({ list: _price_ids.join(), server: this.data.server }).then((res) => {
                        let _obj = res.data.data;
                        for (const key in _obj) {
                            _list.push({
                                price_id: _obj[key].item_id,
                                Price: _obj[key].avg_price,
                            });
                        }
                        arr = arr
                            .map((item) => {
                                _list.forEach((el) => {
                                    if (el.id == item.id || el.price_id == item.price_id)
                                        item = Object.assign(el, item);
                                });
                                return item;
                            })
                            .filter((item) => {
                                if (item.id == this.item.CreateItemIndex1) {
                                    this.item = Object.assign(this.item, item);
                                } else {
                                    return item;
                                }
                            });
                        this.item.child_list = arr;
                        if (this.data.add)
                            this.toEmit({ id: this.item.ID, item: this.item, add: false, name: "getItemsPrice" });
                    });
                }
            });
        },
        // 获取怀旧服价格
        getOriginPrice(list) {
            let arr = [...list, this.item_ids];
            arr = arr.map((item) => {
                this.item.children.forEach((el) => {
                    if (item.ID == el.id) item = Object.assign(item, el);
                });
                return item;
            });
            let _ids = arr.map((item) => item.id);
            getItemsPrice({ ids: _ids.join(), client: this.data.client }).then((res) => {
                let _list = res.data;
                _list = _list.map((item) => {
                    return {
                        id: item.ItemIndex,
                        Price: item.Price,
                        Name: item.Name,
                        game_price: true,
                    };
                });
                arr = arr
                    .map((item) => {
                        _list.forEach((el) => {
                            if (el.id == item.id || el.price_id == item.price_id) item = Object.assign(el, item);
                        });
                        return item;
                    })
                    .filter((item) => {
                        if (item.id == this.item.CreateItemIndex1) {
                            this.item = Object.assign(this.item, item);
                        } else {
                            return item;
                        }
                    });
                this.item.child_list = arr;
                if (this.data.add)
                    this.toEmit({ id: this.item.ID, item: this.item, add: false, name: "getItemsPrice" });
            });
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
            handler: function (new_data, old_data) {
                if (new_data.item_id !== old_data.item_id) {
                    this.loadItem(new_data);
                } else {
                    if (new_data.add && new_data.add !== old_data.add) {
                        this.item.count = new_data.count;
                        this.toEmit({ id: this.item.ID, item: this.item, add: false, name: "loadItem" });
                    }
                }
            },
        },
        item: {
            immediate: true,
            deep: true,
            handler: function (obj) {
                if (obj.children && obj.children.length && this.first) this.getChildData(obj.children);
            },
        },
        cache_list: {
            deep: true,
            immediate: true,
            handler: function (list) {
                if (list && list.length && this.item.children) {
                    this.data.client == "std" ? this.getStdPrice(list) : this.getOriginPrice(list);
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
