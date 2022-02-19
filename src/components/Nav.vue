<template>
    <div class="m-pvx-nav">
        <RightSideMsg>
            <em>休闲交流群</em> :
            <strong>
                <a href="https://jq.qq.com/?_wv=1027&k=utHr10Tl">658035079</a>
            </strong>
        </RightSideMsg>

        <el-menu :default-openeds="['1', '2', '3']">
            <el-submenu :index="group.index" v-for="group in menus" :key="group.key">
                <template slot="title">{{group.label}}</template>
                <el-menu-item-group>
                    <el-menu-item v-for="item in group.submenus" :key="item.key" :class="{ 'is-active': active == item.key }" v-show="item.status">
                        <a :href="item.path" :target="item.target || '_self'">
                            <i :class="item.icon"></i>
                            <span>{{ item.label }}</span>
                        </a>
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">家园</template>
                <el-menu-item-group>
                    <!-- <el-menu-item index="2-1" :class="{ 'is-active': active == 'tutorial' }">
                        <a :href="getAppLink('homeland/tutorial')" class="disabled">
                            <i class="el-icon-reading"></i>
                            <span>家园指南</span>
                        </a>
                    </el-menu-item>
                    <el-menu-item index="2-1" :class="{ 'is-active': active == 'furniture' }">
                        <a :href="getAppLink('homeland/furniture')" class="disabled">
                            <i class="el-icon-table-lamp"></i>
                            <span>家具大全</span>
                        </a>
                    </el-menu-item>
                    <el-menu-item index="2-2" :class="{ 'is-active': active == 'maps' }">
                        <a :href="getAppLink('homeland/maps')" class="disabled">
                            <i class="el-icon-map-location"></i>
                            <span>家园地图</span>
                        </a>
                    </el-menu-item> -->
                    <el-menu-item index="2-2" :class="{ 'is-active': active == 'flower' }">
                        <a href="/homeland/flower">
                            <i class="el-icon-sunny"></i>
                            <span>花价查询</span>
                        </a>
                    </el-menu-item>
                    <!-- <el-menu-item index="2-3" :class="{ 'is-active': active == 'blueprint' }">
                        <a :href="getAppLink('homeland/blueprint')" class="disabled"> <i class="el-icon-setting"></i>蓝图解析 </a>
                    </el-menu-item> -->
                    <el-menu-item index="2-4">
                        <a href="https://jx3.xoyo.com/zt/2020/09/24/blueprint/#/" target="_blank"> <i class="el-icon-position"></i>家园蓝图 </a>
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">珍奇</template>
                <el-menu-item-group>
                    <el-menu-item index="3-1" :class="{ 'is-active': active == 'pet' }">
                        <a href="/pet">
                            <i class="el-icon-sugar"></i>
                            <!-- <img src="@/assets/img/pet2.svg" /> -->
                            <span>宠物大全</span>
                        </a>
                    </el-menu-item>
                    <el-menu-item index="4-1" :class="{ 'is-active': active == 'adventure' }">
                        <a href="/adventure">
                            <i class="el-icon-files"></i>
                            <!-- <img src="@/assets/img/adventure.svg" /> -->
                            <span>奇遇大全</span>
                        </a>
                    </el-menu-item>
                    <!-- <el-menu-item index="4-3" :class="{ 'is-active': active == 'horse' }">
                        <a href="/horse">
                            <i class="el-icon-files"></i>
                            <span>坐骑大全</span>
                        </a>
                    </el-menu-item> -->
                </el-menu-item-group>
            </el-submenu>
            <!-- <el-submenu index="4">
                <template slot="title">商贾</template>
                <el-menu-item-group>
                    <el-menu-item index="5-1" :class="{ 'is-active': active == 'cooking' }">
                        <a :href="getAppLink('cooking')" class="disabled"> <i class="el-icon-setting"></i>技艺助手 </a>
                    </el-menu-item>
                    <el-menu-item index="5-2" :class="{ 'is-active': active == 'price' }">
                        <a :href="getAppLink('price')" class="disabled"> <i class="el-icon-coin"></i>物价大全 </a>
                    </el-menu-item>
                    <el-menu-item index="5-3" :class="{ 'is-active': active == 'gold' }">
                        <a :href="getAppLink('gold')" class="disabled"> <i class="el-icon-data-line"></i>金价走势 </a>
                    </el-menu-item>
                    <el-menu-item index="5-4">
                        <a href="https://jx3.seasunwbl.com/buyer?t=coin" target="_blank"> <i class="el-icon-position"></i>万宝楼 </a>
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu> -->
        </el-menu>
    </div>
</template>

<script>
import {compact} from 'lodash'
export default {
    name: "Nav",
    props: [],
    components: {},
    data: function () {
        return {
            menus: [
                {
                    key: "face",
                    label: "栉掠",
                    index: "1",
                    submenus: [
                        {
                            path: "/share",
                            label: "捏脸分享",
                            icon: "el-icon-download",
                            key: "share",
                            status: true,
                        },
                        {
                            path: "/pvx/facedata",
                            label: "妆容解析",
                            icon: "el-icon-setting",
                            key: "facedata",
                            status: true,
                        },
                        {
                            path: "/exterior",
                            label: "妆容解析",
                            icon: "el-icon-setting",
                            key: "exterior",
                            status: false,
                        },
                    ],
                },
            ],
        };
    },
    computed: {
        active: function () {
            let arr = compact(location.pathname?.split("/"));
            return arr.length > 1 ? arr[1] : arr[0]
        },
    },
    methods: {
        getAppLink: function (appKey) {
            let isDev = location.hostname == "localhost";
            if (isDev) {
                return `/${appKey}/`;
            } else {
                return `/pvx/${appKey}`;
            }
        },
    },
};
</script>

<style lang="less">
@import "~@/assets/css/nav.less";
</style>
