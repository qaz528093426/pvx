<template>
    <div class="v-share-single">
        <singlebox :post="single" :stat="stat" v-loading="loading">
            <div class="m-single-pics" v-if="meta.pics && meta.pics.length">
                <el-carousel :interval="4000" type="card" arrow="always" height="600px">
                    <el-carousel-item v-for="(item, i) in meta.pics" :key="i">
                        <div class="m-face-pic">
                            <img :src="item.url | showImage" class="u-pic" />
                        </div>
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div class="m-single-data">
                <el-divider content-position="left">
                    <b>@{{ origin_author }}</b>
                    <el-divider direction="vertical"></el-divider>
                    独家数据分析
                </el-divider>
                <facedata v-if="facedata" :data="facedata" />
            </div>
            <Thx class="m-thx" :postId="id" postType="share" :userId="author_id" :adminBoxcoinEnable="true" :userBoxcoinEnable="true" />
        </singlebox>
    </div>
</template>

<script>
import { resolveImagePath } from "@jx3box/jx3box-common/js/utils";
import { getPost } from "@/service/share.js";
import { getStat, postStat } from "@jx3box/jx3box-common/js/stat";
import facedata from "@jx3box/jx3box-facedat/src/Facedat.vue";
import singlebox from "@jx3box/jx3box-common-ui/src/single/cms-single";
export default {
    name: "single",
    props: [],
    components: { facedata, singlebox },
    data: function () {
        return {
            loading: false,
            single: "",

            stat: "",
        };
    },
    computed: {
        id: function () {
            return sessionStorage.getItem("jx3_ShareId") || 0;
        },
        author_id: function () {
            return this.single?.post_author || 0;
        },
        facedata: function () {
            return this.single?.post_meta?.data || "";
        },
        meta: function () {
            return this.single?.post_meta || "";
        },
        origin_author: function () {
            return this.single?.post_meta?.author || "匿名";
        },
    },
    watch: {},
    methods: {
        getData() {
            if (this.id) {
                this.loading = true;
                getPost(this.id, this)
                    .then(res => {
                        this.single = res.data.data;
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            }
            getStat("share", this.id).then(res => {
                this.stat = res.data;
            });
            postStat("share", this.id);
        },
    },
    filters: {
        showImage: function (val) {
            return resolveImagePath(val);
        },
    },
    created: function () {
        this.getData();
    },
    mounted: function () {},
};
</script>

<style lang="less">
@import "~@/assets/css/share/single.less";
</style>
