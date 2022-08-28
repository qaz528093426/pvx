<template>
    <div class="m-item_price m-price-header">
        <div class="m-header">
            <h1 class="u-title">物价大全</h1>
            <el-select class="u-servers" v-model="server" placeholder="请选择服务器" size="small">
                <span slot="prefix" class="u-prefix"><i class="el-icon-coin"></i> 价格参考服务器</span>
                <el-option v-for="serve in servers" :key="serve" :label="serve" :value="serve"></el-option>
            </el-select>
        </div>
        <!-- <div class="m-search">
            <el-input class="u-search" placeholder="搜索.." v-model="search" size="mini" @keyup.enter.native="goItemPage">
                <el-button slot="append" icon="el-icon-search" @click="goItemPage"></el-button>
            </el-input>
        </div> -->


        <div class="m-price-list" v-if="groups && groups.length && isEmpty">
            <!-- <div v-for="i in 2" :key="'wrapper' + i"> -->
            <el-row class="m-item" :gutter="20" v-for="(group, key) in groups" :key="key">
                <div :span="24" class="u-group-title" v-text="group.label"></div>
                <el-col :span="6" v-for="(item, k) in group.items" :key="k">
                    <router-link v-if="item" class="u-item" :class="`u-item-${key}`"
                        :to="{ name: 'view', params: { item_id: item.item_id } }">
                        <div class="u-icon">
                            <img :src="icon_url(item.icon)" />
                        </div>
                        <div class="u-content">
                            <span class="u-name">
                                <span v-text="item.label"></span>
                            </span>
                            <span class="u-price">
                                <span class="u-trending" :class="item | showItemTrendingClass">{{ item |
                                        showItemTrending
                                }}</span>
                                <template v-if="item.sub_days_0_price">
                                    <span>今日：</span>
                                    <GamePrice :price="item.sub_days_0_price" />
                                </template>
                                <template v-else-if="!item.sub_days_0_price && item.sub_days_1_price">
                                    <span>昨日：</span>
                                    <GamePrice :price="item.sub_days_1_price" />
                                </template>
                                <template
                                    v-else-if="!item.sub_days_0_price && !item.sub_days_1_price && item.sub_days_2_price">
                                    <span>前日：</span>
                                    <GamePrice :price="item.sub_days_2_price" />
                                </template>
                                <span v-else>暂无价目</span>
                            </span>
                        </div>
                    </router-link>
                </el-col>
            </el-row>
            <!-- </div> -->
        </div>
    </div>


</template>

<script>
import servers_origin from "@jx3box/jx3box-data/data/server/server_origin.json";
import servers_std from "@jx3box/jx3box-data/data/server/server_std.json";
import GamePrice from "@jx3box/jx3box-common-ui/src/wiki/GamePrice.vue";
import User from "@jx3box/jx3box-common/js/user";
import { iconLink } from "@jx3box/jx3box-common/js/utils";

import { getProfile, getItemPrice } from "@/service/item";

export default {
    name: "ItemPrice",
    data () {
        return {
            groups: [],
            server: "",
            loading: false,
            search: "",
        };
    },
    computed: {
        item_ids: function () {
            return this.$store.state.client == "origin"
                ? ["origin1", "origin2", "origin3"]
                : ["index1", "index2", "teshucailiao"];
        },
        servers: function () {
            return this.$store.state.client == "origin"
                ? servers_origin
                : servers_std;
        },
        client: function () {
            return this.$store.state.client;
        },
        isEmpty: function () {
            return this.groups.some(item => item);
        }
    },
    components: {
        GamePrice,
    },
    methods: {
        // 获取星标物品
        get_data () {
            if (!this.server) return;

            this.loading = true;
            getItemPrice({
                server: this.server,
                keys: this.item_ids.join(","),
            })
                .then((data) => {
                    data = data.data;
                    this.groups = Object.values(data.data) || [];
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        goItemPage: function () {
            let host = location.origin;
            window.open(
                `${host}/item/#/search/${this.search}?page=1`,
                "_blank"
            );
        },
        icon_url: function (id) {
            return iconLink(id, this.client);
        },
    },
    watch: {
        server: {
            immediate: true,
            handler () {
                this.get_data();
            },
        },
    },
    mounted: function () {
        if (User.isLogin() && this.$store.state.client == "std") {
            getProfile().then((data) => {
                if (data) {
                    this.server = data.jx3_server || "斗转星移";
                }
            });
        } else {
            this.server =
                this.$store.state.client == "origin" ? "缘起稻香" : "斗转星移";
        }
    },
    filters: {
        showItemTrending: function (item) {
            if (item.sub_days_0_price && item.sub_days_1_price) {
                if (item.sub_days_0_price - item.sub_days_1_price > 0) {
                    return "▲";
                } else if (item.sub_days_0_price - item.sub_days_1_price < 0) {
                    return "▼";
                } else {
                    return "";
                }
            }
        },
        showItemTrendingClass: function (item) {
            if (item.sub_days_0_price && item.sub_days_1_price) {
                if (item.sub_days_0_price - item.sub_days_1_price > 0) {
                    return "up";
                } else if (item.sub_days_0_price - item.sub_days_1_price < 0) {
                    return "down";
                } else {
                    return "keep";
                }
            }
        },
        iconLink,
        showItemLink: function (val) {
            return `/item/#/view/${val}`;
        },
    },
};
</script>

<style lang="less">
@import "../../assets/css/manufacture/item_price.less";
</style>
