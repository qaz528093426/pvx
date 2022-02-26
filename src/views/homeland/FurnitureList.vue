<template>
	<div class="v-homeland-furniture">
		<FurnitureHeader @onSearchKey="onSearchKey" />
		<div class="m-furniture-container flexNormal">
			<div class="m-furniture-attribute">
				<span class="u-title" @click="onDefault">全部家具</span>
				<div class="u-list">
					<span v-for="(item, i) in category" :key="i" :class="item.id == attKey ? 'active' : ''" @click="onAttKey(item.id)">
						{{ item.name }}
					</span>
				</div>
			</div>
			<div class="m-furniture-box">
				<FurnitureCategory :list="children(attKey)" :isChange="isChange" :categoryData="categoryData" @onCategoryKey="onCategoryKey" />
				<div class="m-furniture-list flexNormal">
					<FurnitureCard v-for="(item, index) in list" :key="index" :item="item" />
				</div>
				<div class="m-furniture-pages">
					<el-button class="m-archive-more" v-show="hasNextPage" type="primary" @click="appendPage" :loading="loading" icon="el-icon-arrow-down">加载更多</el-button>
					<el-pagination class="m-archive-pages" background layout="total, prev, pager, next, jumper" :hide-on-single-page="true" :page-size="per" :total="total" :current-page.sync="page" @current-change="changePage"></el-pagination>
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
import { getFurniture } from "@/service/furniture.js";
import { categoryCss } from "@/assets/data/furniture.json";
import { sourceList, levelList, categoryList } from "@/assets/data/furniture.json";
export default {
	name: "FurnitureList",
	components: { FurnitureHeader, FurnitureCategory, FurnitureCard },
	data: function () {
		return {
			search: "",
			attKey: -1,
			category: [],
			list: [],

			page: 1,
			per: 20,
			total: 1,
			pages: 1,

			loading: false,
			append: false,
			isChange: false,
			client: "std",
			query: "",
		};
	},
	computed: {
		categoryData: function () {
			return {
				categoryCss: categoryCss[this.attKey],
				sourceList,
				levelList,
				categoryList,
			};
		},
		hasNextPage: function () {
			return this.pages > 1 && this.page < this.pages;
		},
	},
	watch: {},
	methods: {
		onSearchKey: function (val) {
			this.search = val;
		},
		onCategoryKey: function (obj) {
			this.query = { ...obj, ...this.params };
			this.isChange = false;
			this.getData();
		},
		onAttKey: function (val) {
			this.defaultParams();
			this.attKey = val;
			this.isChange = true;
			this.getData();
		},
		getCategory: function () {
			getFurnitureCategory().then((res) => {
				this.category = res.data;
			});
		},
		onDefault: function () {
			this.defaultParams();
			this.getData();
		},
		getData() {
			let params = { page: this.page, per: this.per };
			if (this.attKey !== -1) params = { nCatag1Index: this.attKey, ...params };
			if (JSON.stringify(this.query) !== "{}") params = { ...this.query, ...params };

			getFurniture(params).then((res) => {
				let list = [];
				list = this.append ? this.list.concat(res.data.list) : res.data.list;

				this.list = list;
				this.pages = res.data.pages;
				this.total = res.data.total;
				this.append = false;
				this.loading = false;
			});
		},
		defaultParams() {
			this.attKey = -1;
			this.page = 1;
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
		appendPage() {
			this.append = true;
			this.loading = true;
			this.page += 1;
			this.getData();
		},
		changePage(i) {
			this.page = i;
			this.getData();
		},
	},
	created: function () {
		this.getData();
		this.getCategory();
	},
};
</script>
<style lang="less">
@import "~@/assets/css/homeland/furniture.less";
</style>
