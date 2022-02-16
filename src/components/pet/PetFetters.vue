<template>
	<div class="m-fettersBox">
		<!-- 羁绊信息 -->
		<div class="u-name"><i class="el-icon-star-on"></i>{{ info.Name }}</div>
		<div class="u-imgsBox">
			<div class="u-img" v-for="pet in info.petList" :key="pet.Index" :class="'i-quality-' + pet.Quality" @click="getLink(pet.Index)">
				<img :src="getImgSrc(pet.BgPath)" fit="contain" />
				<span>{{ pet.Name }}</span>
			</div>
		</div>
	</div>
</template>
<script>
import { __iconPath } from "@jx3box/jx3box-common/data/jx3box.json";
export default {
	name: "Fetters",
	props: ["info"],
	components: {},
	data: function () {
		return {};
	},
	computed: {},
	methods: {
		// 获取宠物图片路径
		getImgSrc: function (path) {
			if (path) {
				let img_name = path.match(/.*[\/,\\](.*?).tga/);
				return __iconPath + "pvx/pet/images/" + img_name[1] + ".png";
			}
		},
		// 宠物链接跳转
		getLink(pet_id) {
			if (pet_id == this.$route.params.id) return;
			this.$router.push({ name: "single", params: { id: pet_id } });
		},
	},

	created: function () {},
	mounted: function () {},
};
</script>
<style lang="less">
//@import '@/assets/css/demo.less';
</style>
