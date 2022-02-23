<template>
	<div class="v-homeland-furniture">
		<FurnitureHeader @onSearchKey="onSearchKey" />
		<div class="m-furniture-container flexNormal">
			<div class="m-furniture-attribute">
				<span class="u-title">家具分类</span>
				<div class="u-list">
					<span v-for="(item, i) in category" :key="i" :class="item.id == attKey ? 'active' : ''" @click="onAttKey(item.id)">
						{{ item.name }}
					</span>
				</div>
			</div>
			<div class="m-furniture-box">
				<FurnitureCategory :list="children(attKey)" :categoryCss="categoryCss" @onCategoryKey="onCategoryKey" />
				<div class="m-furniture-list flexNormal">
					<FurnitureCard v-for="item in 20" :key="item" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import FurnitureHeader from "@/components/homeland/furniture_header.vue";
import FurnitureCategory from "@/components/homeland/furniture_category.vue";
import FurnitureCard from "@/components/homeland/furniture_card.vue";
import { getFurnitureCategory } from "@/service/homeland.js";
import { categoryCss } from "@/assets/data/furniture.json";
export default {
	name: "FurnitureList",
	components: { FurnitureHeader, FurnitureCategory, FurnitureCard },
	data: function () {
		return {
			search: "",
			attKey: 1,
			category: [],
		};
	},
	computed: {
		categoryCss: function () {
			return categoryCss[this.attKey];
		},
	},
	watch: {},
	methods: {
		onSearchKey: function (val) {
			this.search = val;
		},
		onCategoryKey: function (val) {},
		onAttKey: function (val) {
			this.attKey = val;
		},
		getCategory: function () {
			getFurnitureCategory().then((res) => {
				this.category = res.data;
			});
		},
		children(id) {
			let list = [];
			for (const key in this.category) {
				if (this.category[key].id == id) {
					list = this.category[key].children;
				}
			}
			return list;
		},
	},
	filters: {},
	created: function () {
		this.getCategory();
	},
	mounted: function () {},
};
</script>
<style lang="less">
@import "~@/assets/css/homeland/furniture.less";
</style>
