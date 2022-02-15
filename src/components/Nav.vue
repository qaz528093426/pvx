<template>
    <div class="m-pvx-nav">
        <RightSideMsg>
            <em>休闲交流群</em> :
            <strong>
                <a href="https://jq.qq.com/?_wv=1027&k=utHr10Tl">658035079</a>
            </strong>
        </RightSideMsg>

        <el-menu :default-openeds="['1', '2', '3']">
            <el-submenu index="1">
                <template slot="title">栉掠</template>
                <el-menu-item-group>
                    <el-menu-item index="1-1" :class="{ 'is-active': active == 'share' }">
                        <a href="/share"> <i class="el-icon-download"></i>捏脸分享 </a>
                    </el-menu-item>
                    <el-menu-item index="1-2" :class="{ 'is-active': active == 'facedata' }">
                        <a :href="getAppLink('facedata')"> <i class="el-icon-setting"></i>妆容解析 </a>
                    </el-menu-item>
                    <!-- <el-menu-item index="1-3" :class="{ 'is-active': active == 'dress' }">
                        <a :href="getAppLink('dress')" class="disabled"> <i class="el-icon-shopping-bag-1"></i>外观大全 </a>
                    </el-menu-item> -->
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">家园</template>
                <el-menu-item-group>
                    <el-menu-item index="2-1" :class="{ 'is-active': active == 'furniture' }">
                        <a :href="getAppLink('furniture')" class="disabled"> <i class="el-icon-table-lamp"></i>家具大全 </a>
                    </el-menu-item>
                    <el-menu-item index="2-2" :class="{ 'is-active': active == 'flower' }">
                        <a :href="getAppLink('flower')"> <i class="el-icon-guide"></i>花价查询 </a>
                    </el-menu-item>
                    <!-- <el-menu-item index="2-3" :class="{ 'is-active': active == 'blueprint' }">
                        <a :href="getAppLink('blueprint')" class="disabled"> <i class="el-icon-setting"></i>蓝图解析 </a>
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
                        <a href="/pet"> <i class="el-icon-sugar"></i>宠物大全 </a>
                    </el-menu-item>
                    <el-menu-item index="4-1" :class="{ 'is-active': active == 'adventure' }">
                        <a href="/adventure"> <i class="el-icon-files"></i>奇遇大全 </a>
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title">商贾</template>
                <el-menu-item-group>
                    <el-menu-item index="5-1" :class="{ 'is-active': active == 'cooking' }">
                        <a :href="getAppLink('cooking')"> <i class="el-icon-setting"></i>技艺助手 </a>
                    </el-menu-item>
                    <el-menu-item index="5-2" :class="{ 'is-active': active == 'price' }">
                        <a :href="getAppLink('price')"> <i class="el-icon-coin"></i>物价大全 </a>
                    </el-menu-item>
                    <el-menu-item index="5-3" :class="{ 'is-active': active == 'gold' }">
                        <a :href="getAppLink('gold')"> <i class="el-icon-data-line"></i>金价走势 </a>
                    </el-menu-item>
                    <!-- <el-menu-item index="5-4">
                        <a href="https://jx3.seasunwbl.com/buyer?t=coin" target="_blank"> <i class="el-icon-position"></i>万宝楼 </a>
                    </el-menu-item> -->
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
export default {
    name: "Nav",
    props: [],
    components: {},
    data: function () {
        return {
            active: "",
        };
    },
    computed: {},
    watch: {},
    methods: {
        getAppType: function () {
            let arr = location.pathname?.split("/");
            let type = "";
            for (let str of arr) {
                if (str && str != "pvx") {
                    type = str;
                    break;
                }
            }
            return type;
        },
        getAppLink: function (appKey) {
            let isDev = location.hostname == "localhost";
            if (isDev) {
                return `/${appKey}/`;
            } else {
                return `/pvx/${appKey}/`;
            }
        },
    },
    filters: {},
    created: function () {
        this.active = this.getAppType();
    },
    mounted: function () {},
};
</script>

<style lang="less">
@import "~@/assets/css/nav.less";
</style>
