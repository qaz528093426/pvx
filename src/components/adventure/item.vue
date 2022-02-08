<template>
	<div class="m-adventure-item" v-if="item">
		<a @click="getLink(item.dwID)" target="_blank">
			<img class="u-default" :src="defaultImg" />
            <img class="u-title" :src="titleImg" :style="titleStyle" />
			<span class="u-img" :style="imgStyle(imgName)"></span>
            <span class="u-icon"></span>
		</a>
	</div>
</template>

<script>
import { __iconPath, __imgPath } from "@jx3box/jx3box-common/data/jx3box";
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
		defaultImg: function () {
			return __imgPath + "image/pvx/bg.png";
		},
		titleImg: function () {
			return __iconPath + "pvx/serendipity/image_ui/luckymeeting7-" + this.item.nOpenFrame + ".png";
		},
		titleStyle: function () {
			return {
	
			};
		},
	},
	methods: {
		imgUrl: function (val) {
			return this.imgRoot + "reward/" + val + ".png";
		},
		getLink(adventure_id) {
			this.$router.push({ name: "single", params: { id: adventure_id } });
		},
		imgStyle: function (imgName) {
			return {
				backgroundImage: "url(" + this.imgUrl(imgName) + ")",
			};
		},
	},
	filters: {},
	mounted: function () {
		// console.log(this.item, "/");
	},
};
</script>
