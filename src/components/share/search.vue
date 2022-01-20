<template>
    <div class="m-share-search">
        <a :href="publish_link" class="u-publish el-button el-button--primary">+ 分享捏脸</a>
        <el-input placeholder="请输入搜索内容" v-model="search" class="input-with-select">
            <span slot="prepend">关键词</span>
            <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
    </div>
</template>

<script>
import { publishLink } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "search",
    props: [],
    data: function () {
        return {
            search: "",
        };
    },
    computed: {
        publish_link: function (val) {
            return publishLink("share");
        },
    },
    watch: {
        search(val) {
            this.$emit("onSearchKey", val);
        },
    },
    methods: {},
    filters: {},
    created: function () {},
    mounted: function () {},
};
</script>
