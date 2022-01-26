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
            if (val?.indexOf("weapon") !== -1) return this.imgRoot + "reward/Open/weapon/school_211.png";
            if (val?.indexOf("camp") !== -1) return this.imgRoot + "reward/Open/camp/camp_0_Open.png";
            if (val?.indexOf("zzwg") !== -1) return this.imgRoot + "reward/Open/zzwg/school_1_Open.png";
            if (val?.indexOf("jcs") !== -1) return this.imgRoot + "reward/Open/jcs/school_1_Open.png";

            return this.imgRoot + "reward/" + val + ".png";
        },
        getLink(adventure_id) {
            // return `/pet/${pet_id}`
            this.$router.push({ name: 'single', params: { id: adventure_id } })
        }
    },
    filters: {},
    mounted: function () {
        // console.log(this.item, "/");
    },
};
</script>
