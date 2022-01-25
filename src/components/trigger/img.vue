<template>
    <div class="m-trigger-img">
        <el-carousel class="m-imgbox" :autoplay="false">
            <el-carousel-item v-for="(item, i) in task.list" :key="i">
                <img class="u-img" :src="imgUrl(item)" />
            </el-carousel-item>
        </el-carousel>
        <span class="u-name">{{ task.name }}</span>
    </div>
</template>

<script>
import { __iconPath } from "@jx3box/jx3box-common/data/jx3box";
export default {
    name: "img",
    props: ["task"],
    components: {},
    data: function () {
        return {
            imgRoot: __iconPath + "pvx/serendipity/images/",
        };
    },
    computed: {},

    methods: {
        imgUrl: function (link) {
            link = this.transformTga(link);
            return this.imgRoot + "/" + link + ".png";
        },
        transformTga(link) {
            link = link.split("/");
            return link[link.length - 2] + "/" + link[link.length - 1];
        },
        // imgName: function (link) {
        //     let reg = /(.*)\\(.*)\.tga/gi;
        //     let result = reg.exec(link);
        //     return result?.[2];
        // },
    },
    filters: {},
    created: function () {},
    mounted: function () {},
};
</script>
