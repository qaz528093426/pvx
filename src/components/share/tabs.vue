<template>
    <div class="m-share-tabs">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="全部" name="0">
                <span slot="label">
                    <i class="u-icon el-icon-menu"></i>
                    全部作品
                </span>
            </el-tab-pane>
            <el-tab-pane :label="item.label" :name="key" v-for="(item, key) in types" :key="key">
                <span slot="label">
                    <i :class="item.icon" class="u-icon"></i>
                    {{ item.label }}
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
export default {
    name: "tabs",
    props: [],
    data: function () {
        return {
            types: {
                1: {
                    label: "成男",
                    icon: "el-icon-male",
                },
                2: {
                    label: "成女",
                    icon: "el-icon-female",
                },
                3: {
                    label: "正太",
                    icon: "el-icon-headset",
                },
                4: {
                    label: "萝莉",
                    icon: "el-icon-lollipop",
                },
            },
            changes: [
                { key: "all", name: "全部" },
                { key: "newbie", name: "热门" },
                { key: "advanced", name: "推荐" },
                { key: "recommended", name: "精选" },
            ],

            activeName: "0",
            mark: "all",
            subtype: 0,
        };
    },
    computed: {
        params: function () {
            let params = {};
            if (this.mark !== "all") params.mark = this.mark;
            params.subtype = this.subtype;
            return params;
        },
    },
    methods: {
        //切换数据
        handleClick() {
            this.activeName == 0 ? (this.subtype = 0) : (this.subtype = this.types[this.activeName].label);
            this.onShareList();
        },
        toMark(val) {
            this.mark = val;
            this.onShareList();
        },
        onShareList() {
            this.$emit("onShareData", this.params);
        },
    },
    created: function () {
        this.onShareList();
    },
    mounted: function () {},
};
</script>
