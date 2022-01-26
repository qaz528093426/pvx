<template>
    <div class="m-adventure-item" v-if="item">
        <a @click="getLink(item.dwID)" target="_blank">
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
            return "/adventure/" + this.item.dwID;
        },
        imgName: function () {
            let link = this.item.szOpenRewardPath?.replaceAll("\\", "\/");
            if (link?.indexOf("tga") == -1) return link;
            let reg = /(.*)\/(.*)\.tga/gi;
            let result = reg.exec(link);
            let open = result?.[1].split("reward");
            return open?.[1] + "/" + result?.[2];
        },
    },
    methods: {
        imgUrl: function (val) {
            return this.imgRoot + "reward/" + val + ".png";
        },
        getLink(adventure_id) {
            this.item.nClassify == 1 ? this.$router.push({ name: "pet", params: { id: adventure_id } }) : this.$router.push({ name: "single", params: { id: adventure_id } });
        },
    },
    filters: {},
    mounted: function () {
        // console.log(this.item, "/");
    },
};
</script>
