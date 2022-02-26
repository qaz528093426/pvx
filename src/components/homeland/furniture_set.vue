<template>
    <div class="m-furniture-set">
        <!-- <el-popover class="m-popover"  placement="top-start" width="200" trigger="hover">
			<div class="u-info">
				<span class="u-name">{{ item.szName }}</span>
				<span v-if="item.Attribute1"><span class="u-label u-blue">观赏</span>{{ item.Attribute1 }}</span>
				<span v-if="item.Attribute2"><span class="u-label u-pink">实用</span>{{ item.Attribute2 }}</span>
				<span v-if="item.Attribute3"><span class="u-label u-yellow">坚固</span>{{ item.Attribute3 }}</span>
				<span v-if="item.Attribute4"><span class="u-label u-green">风水</span>{{ item.Attribute4 }}</span>
				<span v-if="item.Attribute5"><span class="u-label u-purple">趣味</span>{{ item.Attribute5 }}</span>
				<span><span class="u-label">园宅等级：</span>{{ item.LevelLimit }}级</span>
			</div>
		
		</el-popover> -->
        <router-link v-for="(item, i) in furnitures" :key="i" class="u-item" :class="quality(item.Quality)" slot="reference" :to="`/${item.dwID}`">
            <img class="u-pic" :src="formatImg(item.Path)" />
            <span class="u-name">{{ item.szName }}</span>
        </router-link>
    </div>
</template>
<script>
import { __iconPath } from "@jx3box/jx3box-common/data/jx3box.json";
export default {
    name: "Set",
    props: ["data"],
    data: function () {
        return {};
    },
    computed: {
        furnitures: function () {
            return this.data?.furnitures || [];
        },
    },
    methods: {
        quality: function (id) {
            return id ? "quality_" + id : "";
        },
        formatImg(link) {
            if (!link) return;
            let img = link.match(/.*[\/,\\](.*?).tga/);
            link = link.replace(/\\/g, "/").split(img[1]);
            let nLink = link[0].split("Homeland");

            if (img[1] == "default") return __iconPath + "pvx/furniture/default/default.png";
            return __iconPath + "pvx/furniture" + nLink[1] + img[1] + ".png";
        },
    },
    created() {},
};
</script>

<style lang="less" scoped>
.m-furniture-set {
    .flex;
    align-items: center;
    .u-item {
        .db;
        transition: all 0.1s ease-in-out;
        .mr(40px);
        &:hover {
            filter: brightness(110%) saturate(120%);
            .u-name {
                color: @pink;
            }
        }
    }
    .u-pic {
        .h(100px);
    }
    .u-name {
        .db;
        color: @color;
        .x;
    }
}
</style>
