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
                            path: "/share/facedata",
                            label: "妆容解析",
                            icon: "el-icon-setting",
                            key: "facedata",
                            status: true,
                        },
                    ],
                },

                {
                    key: "homeland",
                    label: "家园",
                    index: "2",
                    submenus: [
                        {
                            path: "/furniture",
                            label: "家具大全",
                            icon: "el-icon-table-lamp",
                            key: "furniture",
                            status: true,
                        },
                        {
                            path: "/homeland/tutorial",
                            label: "家园指南",
                            icon: "el-icon-reading",
                            key: "tutorial",
                            status: true,
                        },
                        {
                            path: "/homeland/maps",
                            label: "家园地图",
                            icon: "el-icon-map-location",
                            key: "maps",
                            status: true,
                        },
                        {
                            path: "/homeland/flower",
                            label: "花价查询",
                            icon: "el-icon-sunny",
                            key: "flower",
                            status: true,
                        },
                        {
                            path: "https://jx3.xoyo.com/zt/2020/09/24/blueprint/#/",
                            label: "蓝图下载",
                            icon: "el-icon-position",
                            key: "blueprint",
                            status: true,
                            target:"_blank"
                        },
                    ],
                },

                {
                    key: "rare",
                    label: "珍奇",
                    index: "3",
                    submenus: [
                        {
                            path: "/pet",
                            label: "宠物大全",
                            icon: "el-icon-sugar",
                            key: "pet",
                            status: true,
                        },
                        {
                            path: "/adventure",
                            label: "奇遇大全",
                            icon: "el-icon-files",
                            key: "adventure",
                            status: true,
                        },
                        {
                            path: "/horse",
                            label: "坐骑大全",
                            icon: "el-icon-files",
                            key: "horse",
                            status: false,
                        },
                        {
                            path: "/exterior",
                            label: "外观大全",
                            icon: "el-icon-setting",
                            key: "exterior",
                            status: false,
                        },
                    ],
                },

                // {
                //     key: "merchants",
                //     label: "商贾",
                //     index: "4",
                //     submenus: [
                //         {
                //             path: "/merchants/cooking",
                //             label: "技艺助手",
                //             icon: "el-icon-sugar",
                //             key: "cooking",
                //             status: false,
                //         },
                //         // 物价大全
                //         // 金价走势
                //         // 万宝楼
                //     ],
                // },
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
