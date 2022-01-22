<template>
    <div class="m-share-tabs">
        <!-- <el-tabs class="u-tabs" v-model="activeName" @tab-click="handleClick" type="card">
            <el-tab-pane :label="item"></el-tab-pane>
        </el-tabs> -->
        <div class="u-tabs">
            <div class="u-tab-item" v-for="(item, i) in subtypes" :key="i" @click="clickTabs(i)" :class="i == activeIndex ? 'active' : ''">
                <img class="u-icon-img" :src="getThumbnail(item)" :alt="item" />
                <span class="u-tabs-span">{{ item }}</span>
            </div>
        </div>
        <div class="u-marks">
            <el-radio-group v-model="mark" @change="toMark">
                <el-radio-button v-for="item in marks" :key="item.key" :label="item.key">
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
            subtypes: ["全部", "成男", "成女", "正太", "萝莉"],
            marks: [
                { key: "all", name: "全部" },
                { key: "newbie", name: "热门" },
                { key: "advanced", name: "推荐" },
                { key: "recommended", name: "精选" },
            ],

            activeIndex: 0,
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
 
        clickTabs(i) {
            this.activeIndex = i;
            this.subtype = this.subtypes[i];
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
