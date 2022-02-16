<template>
	<div class="m-pet-fetters" v-if="list && list.length > 0">
		<div class="u-header"><img class="u-icon" svg-inline src="../../assets/img/achievement.svg" /> <span class="u-txt">宠物羁绊</span></div>
		<!-- 羁绊信息 -->
		<div class="u-box" v-for="item in petList" :key="item.id">
			<div class="u-name"><i class="el-icon-star-on"></i>{{ item.name }}</div>
			<div class="u-imgsBox">
				<div  class="u-img" v-for="(imgs, index) in petImgs[item.id]" :key="index" @click="getLink(index)">
					<el-image  :src="imgs.img" fit="contain" ></el-image>
					<span>{{ imgs.name }}</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { getPets } from "@/service/pet";
import { __iconPath } from "@jx3box/jx3box-common/data/jx3box.json";
export default {
	name: "Fetters",
	props: ["list"],
	components: {},
	data: function () {
		return {
			petImgs: [],
		};
	},
	computed: {
		petList: function () {
			let list = this.list;
			let newList = [];
			list.forEach((el) => {
				let petList = [];
				for (const key in el) {
					if (key.indexOf("PetIndex") !== -1 && el[key] !== null) {
						petList.push(el[key]);
					}
				}
				el.petList = petList;
				this.getPetList(petList, el.ID);

				newList.push({
					name: el.Name,
					desc: el.Des,
					list: el.petList,
					id: el.ID,
				});
			});
			return newList;
		},
	},
	watch: {},
	methods: {
		getPetList(list, id) {
			let str = JSON.stringify([...list]).slice(1, -1);
			getPets({ ids: str }).then((res) => {
				let list = res.data.list;
				let pet = {};
				list.forEach((el) => {
					console.log(el, "?");
					pet = {
						...pet,
						[el.Index]: {
							name: el.Name,
							img: this.getImgSrc(el.BgPath),
						},
					};
				});

				let obj = {
					[id]: { ...pet },
				};
				this.petImgs = { ...this.petImgs, ...obj };
				console.log(this.petImgs);
			});
		},
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
	watch: {
		$route(to, from) {
			this.$router.go(0);
		},
	},
	created: function () {},
	mounted: function () {},
};
</script>
<style lang="less">
//@import '@/assets/css/demo.less';
</style>
