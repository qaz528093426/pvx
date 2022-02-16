<template>
	<div class="m-fettersBox">
		<!-- 羁绊信息 -->
		<div class="u-name"><i class="el-icon-star-on"></i>{{ list.Name }}</div>
		<div class="u-imgsBox">
			<div class="u-img" v-for="pet in list.petList" :key="pet.Index" @click="getLink(pet.Index)" :class="'i-quality-' + pet.Quality">
				<el-image :src="getImgSrc(pet.BgPath)" fit="contain"></el-image>
				<span>{{ pet.Name }}</span>
			</div>
		</div>
	</div>
</template>
<script>
import { __iconPath } from "@jx3box/jx3box-common/data/jx3box.json";
export default {
	name: "Fetters",
	props: ["list"],
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
