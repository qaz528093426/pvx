<template>
    <div class="v-share-list m-face">
        <div class="m-share-search">
            <a :href="publish_link" class="u-publish el-button el-button--primary">+ 分享捏脸</a>
            <el-input placeholder="请输入搜索内容" v-model="search" class="input-with-select">
                <span slot="prepend">关键词</span>
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
        </div>
    </div>
</template>

<script>
import { publishLink } from "@jx3box/jx3box-common/js/utils";
export default {
    name: 'face',
    data() {
        return {
            search: '',
        }
    },
    computed: {
        publish_link: function (val) {
            return publishLink("face");
        },
    },
}
</script>

<style lang="less">
@import "~@/assets/css/face/list.less";
</style>
