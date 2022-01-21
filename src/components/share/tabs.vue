<template>
    <div class="m-share-tabs">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane :label="item" v-for="(item, i) in types" :key="i">
                <span class="u-tabs-span" slot="label">
                    <img class="u-icon-img" :src="getThumbnail(item)" :alt="item" />
                    {{ item }}
                </span>
            </el-tab-pane>
        </el-tabs>
        <div class="u-changes">
            <el-radio-group v-model="mark" size="small" @change="toMark">
                <el-radio-button v-for="item in changes" :key="item.key" :label="item.key">
                    {{ item.name }}
                </el-radio-button>
            </el-radio-group>
            <!-- <orderBy @filter="filterMeta"></orderBy> -->
        </div>
    </div>
</template>

<script>
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box";
export default {
    name: "tabs",
    props: [],
    data: function () {
        return {
            types: ["全部", "成男", "成女", "正太", "萝莉"],
            changes: [
                { key: "all", name: "全部" },
                { key: "newbie", name: "热门" },
                { key: "advanced", name: "推荐" },
                { key: "recommended", name: "精选" },
            ],

            activeName: "0",
            mark: "all",
            subtype: "全部",
        };
    },
    computed: {
        params: function () {
            let params = {};
            params.mark = this.mark;
            params.subtype = this.subtype;
            return params;
        },
    },
    methods: {
        //切换数据
        handleClick() {
            this.subtype = this.types[this.activeName];
            this.onShareList();
        },
        toMark(val) {
            this.mark = val;
            this.onShareList();
        },
        onShareList() {
            this.$emit("onShareData", this.params);
        },
        getThumbnail: function (filename) {
            return __imgPath + "image/face/" + filename + ".jpg";
        },
    },
    created: function () {
        this.onShareList();
    },
    mounted: function () {},
};
</script>
