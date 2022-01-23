<template>
    <div class="m-pvx-nav">
        <RightSideMsg>
            <em>休闲交流群</em> :
            <strong>
                <a href="https://jq.qq.com/?_wv=1027&k=utHr10Tl">658035079</a>
            </strong>
        </RightSideMsg>

        <el-menu :default-openeds="['1', '2', '3', '4']">
            <el-submenu index="1">
                <template slot="title">捏脸</template>
                <el-menu-item-group>
                    <el-menu-item index="1-1" :class="{ 'is-active': active == 'share' }"
                        ><a href="/share/"><i class="el-icon-download"></i>捏脸分享</a></el-menu-item
                    >
                    <el-menu-item index="1-2" :class="{ 'is-active': active == 'facedata' }"
                        ><a href="/facedata/"><i class="el-icon-data-line"></i>妆容解析器</a></el-menu-item
                    >
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">家园</template>
                <el-menu-item-group>
                    <el-menu-item index="2-1" :class="{ 'is-active': active == 'furniture' }"
                        ><a href="/furniture/"><i class="el-icon-files"></i>家具大全</a></el-menu-item
                    >
                    <!-- <el-menu-item index="2-2"
                        ><span><i class="el-icon-data-line"></i>蓝图解析器</span></el-menu-item
                    > -->
                    <el-menu-item index="2-3"
                        ><a href="https://jx3.xoyo.com/zt/2020/09/24/blueprint/#/" target="_blank"><i class="el-icon-download"></i>家园蓝图</a></el-menu-item
                    >
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">宠物</template>
                <el-menu-item-group>
                    <el-menu-item index="3-1" :class="{ 'is-active': active == 'pet' }"
                        ><a href="/pet/"><i class="el-icon-files"></i>宠物大全</a></el-menu-item
                    >
                    <el-menu-item index="3-2"
                        ><a href="/pet/#/map"><i class="el-icon-map-location"></i>宠物地图</a></el-menu-item
                    >
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title">奇遇</template>
                <el-menu-item-group>
                    <el-menu-item index="4-1" :class="{ 'is-active': active == 'adventure' }"
                        ><a href="/adventure/"><i class="el-icon-files"></i>奇遇大全</a></el-menu-item
                    >
                    <el-menu-item index="4-2"
                        ><a href="/adventure/#/trigger"><i class="el-icon-guide"></i>触发汇总</a></el-menu-item
                    >
                    <el-menu-item index="4-3"
                        ><a href="https://j3cx.com/serendipity" target="_blank"><i class="el-icon-thumb"></i>奇遇查询</a></el-menu-item
                    >
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
import { getAppType } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "Nav",
    props: [],
    components: {},
    data: function () {
        return {
            active: getAppType(),
        };
    },
    computed: {},
    watch: {},
    methods: {},
    filters: {},
    created: function () {},
    mounted: function () {},
};
</script>

<style lang="less">
@import "~@/assets/css/nav.less";
</style>
