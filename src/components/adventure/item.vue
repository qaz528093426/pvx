<template>
    <div class="m-adventure-item" v-if="item">
        <a :href="link" target="_blank">
            <img :src="imgUrl(imgName)" :alt="item.szName" />
            <span class="u-title">{{ item.szName }}</span>
        </a>
    </div>
</template>

<script>
import { __iconPath } from "@jx3box/jx3box-common/data/jx3box";
export default {
    name: "item",
    props: ["item"],
    components: {},
    data: function () {
        return {
            imgRoot: __iconPath + "pvx/serendipity/images/",
        };
    },
    computed: {
        link: function () {
            return location.origin + "/adventure/" + this.item.dwID;
        },
        imgName: function () {
            let link = this.item.szOpenRewardPath;
            let reg = /(.*)\\(.*)\.tga/gi;
            let result = reg.exec(link);
            return result?.[2];
        },
    },

    methods: {
        imgUrl: function (val) {
            return this.imgRoot + "reward/open/" + val + ".png";
        },
    },
    filters: {},
    created: function () {},
    mounted: function () {},
};
</script>
