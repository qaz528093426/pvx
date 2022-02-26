<template>
	<div class="v-homeland-furniture" v-loading="loading">
		<div class="m-furniture-header">
			<h1 class="u-title">家具大全</h1>
			<el-input placeholder="请输入搜索内容" v-model="search" class="input-with-select">
				<span slot="prepend">关键词</span>
				<el-button slot="append" icon="el-icon-search"></el-button>
			</el-input>
		</div>
		<div class="m-furniture-container flexNormal">
			<div class="m-furniture-attribute">
				<div class="u-list">
					<span @click="onDefault" :class="{ active: attKey == '-1' }"> 全部</span>
					<span v-for="(item, i) in category" :key="i" :class="item.id == attKey ? 'active' : ''" @click="onAttKey(item.id)">
						{{ item.name }}
					</span>
				</div>
			</div>
			<div class="m-furniture-box">
				<FurnitureCategory :list="children(attKey)" :isChange="isChange" :categoryData="categoryData" @onCategoryKey="onCategoryKey" />
				<div class="m-furniture-list flexNormal" v-if="list.length">
					<FurnitureCard v-for="(item, index) in list" :key="index" :item="item" />
				</div>
				<div class="m-furniture-list" v-else><el-alert center title="没有对应的家具" show-icon type="info"> </el-alert></div>
				<div class="m-furniture-pages">
					<el-button class="m-archive-more" v-show="hasNextPage" type="primary" @click="appendPage" :loading="loading" icon="el-icon-arrow-down">加载更多</el-button>
					<el-pagination class="m-archive-pages" background layout="total, prev, pager, next, jumper" :hide-on-single-page="true" :page-size="per" :total="total" :current-page.sync="page" @current-change="changePage"></el-pagination>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import FurnitureCategory from "@/components/homeland/furniture_category.vue";
import FurnitureCard from "@/components/homeland/furniture_card.vue";
import { getFurnitureCategory } from "@/service/homeland.js";
import { getFurniture } from "@/service/furniture.js";
import { categoryCss } from "@/assets/data/furniture.json";
import { sourceList, levelList, categoryList } from "@/assets/data/furniture.json";
export default {
	name: "FurnitureList",
	components: { FurnitureCategory, FurnitureCard },
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
		params: function () {
			let params = { page: this.page, per: this.per };
			if (this.attKey !== -1) params = { nCatag1Index: this.attKey, ...params };
			if (this.search) params = { name: this.search, ...params };
			if (Object.keys(this.query).length) params = { ...this.query, ...params };
			return params;
		},
	},
	watch: {
		params: {
			handler: function (val) {
				console.log(val);
				this.getData();
			},
			deep: true,
		},
	},
	methods: {
		onCategoryKey: function (obj) {
			this.query = obj;
			this.isChange = false;
		},
		onAttKey: function (val) {
			this.defaultParams();
			this.attKey = val;
			this.isChange = true;
		},
		getCategory: function () {
			getFurnitureCategory().then((res) => {
				this.category = res.data;
			});
		},
		onDefault: function () {
			this.defaultParams();
		},
		getData() {
			this.loading = true;
			getFurniture(this.params)
				.then((res) => {
					let list = [];
					list = this.append ? this.list.concat(res.data.list) : res.data.list;

					this.list = list;
					this.pages = res.data.pages;
					this.total = res.data.total;
					this.append = false;
				})
				.finally(() => {
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
			this.page += 1;
		},
		changePage(i) {
			this.page = i;
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
