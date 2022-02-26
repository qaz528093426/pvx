<template>
	<div>
		<a class="m-furniture-item flex" @click="toLink(item.dwID)" v-if="item">
			<div class="m-furniture-image">
				<img class="u-img" :src="formatImg(item.Path)" alt="" srcset="" />
				<!-- 是否可交互和染色 -->
				<span class="u-use" v-if="item.SetID"></span>
				<span class="u-dye" v-if="item.bInteract"></span>
			</div>
			<div class="m-furniture-detail flex">
				<div class="u-name">{{ item.szName }}</div>
				<div class="u-nature">
					<span class="u-attribute u-blue">观赏</span> <span class="u-num">{{ item.Attribute1 }}</span>
				</div>
				<div class="u-nature">
					<span class="u-attribute u-pink">实用</span> <span class="u-num">{{ item.Attribute2 }}</span>
				</div>
				<div class="u-nature">
					<span class="u-attribute u-yellow">坚固</span> <span class="u-num">{{ item.Attribute3 }}</span>
				</div>
				<div class="u-nature">
					<span class="u-attribute u-green">风水</span> <span class="u-num">{{ item.Attribute4 }}</span>
				</div>
				<div class="u-nature">
					<span class="u-attribute u-purple">趣味</span> <span class="u-num">{{ item.Attribute5 }}</span>
				</div>
			</div>
		</a>
	</div>
</template>

<script>
import { __iconPath } from "@jx3box/jx3box-common/data/jx3box.json";

export default {
	name: "Card",
	props: ["item"],
	data: function () {
		return {};
	},
	computed: {},
	methods: {
		formatImg(link) {
			let img = link.match(/.*[\/,\\](.*?).tga/);
			link = link.replace(/\\/g, "/").split(img[1]);
			let nLink = link[0].split("Homeland");

			if (img[1] == "default") return __iconPath + "pvx/furniture/default/default.png";
			return __iconPath + "pvx/furniture" + nLink[1] + img[1] + ".png";
		},
		toLink(id) {
			this.$router.push({ name: "single", params: { id } });
		},
	},
	created: function () {},
};
</script>
<style lang="less">
@import "~@/assets/css/homeland/item.less";
</style>
