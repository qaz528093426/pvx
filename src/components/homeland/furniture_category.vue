<template>
	<div class="m-furniture-category" v-if="list.length">
		<div class="u-tabs flexNormal">
			<div class="u-item" v-for="item in list" :key="item.id" @click="onQueryKey(item.nCatag2Index)" @mouseenter="hoverCategory(item)" @mouseleave="leaveCategory" :class="item.nCatag2Index == query.key ? 'active' : ''">
				<span class="u-img" :class="itemClass(item)" :style="itemStyle(item)"></span>
				<span>{{ item.szName }}</span>
			</div>
		</div>

		<div class="u-box flexNormal">
			<el-input class="u-input u-margin" v-model="query.score" placeholder="输入 ≥ 分值，如：2600" oninput="value=value.replace(/[^\d]/g,'')">
				<el-select v-model="query.select" slot="prepend" placeholder="请选择">
					<el-option v-for="item in categoryData.categoryList" :key="item.key" :label="item.name" :value="item.key"> </el-option>
				</el-select>
			</el-input>
			<el-select class="u-select u-margin" v-model="query.source" slot="prepend" placeholder="家具来源">
				<el-option v-for="item in categoryData.sourceList" :key="item.id" :label="item.name" :value="item.id"> </el-option>
			</el-select>
			<el-select class="u-select u-margin" v-model="query.level" slot="prepend" placeholder="家园等级">
				<el-option v-for="item in categoryData.levelList" :key="item.level" :label="item.name" :value="item.level"> </el-option>
			</el-select>
			<div class="flexNormal">
				<el-checkbox v-model="query.interact">可交互</el-checkbox>
				<el-checkbox v-model="query.SetID">庐远广记</el-checkbox>
			</div>
		</div>
	</div>
</template>
<script>
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box";
export default {
	name: "Category",
	data: function () {
		return {
			query: {
				key: "", // 二级分类
				score: "", // 分值
				select: "1", // 属性 风水，观赏，使用，坚固，趣味
				source: "", // 来源
				level: "", // 等级
				interact: false, //交互
				SetID: false, //庐远广记
			},
			hover: "",
		};
	},
	props: ["list", "categoryData"],
	computed: {
		itemClass() {
			return (item) => {
				const category = +item.nCatag1Index * 10000 + item.nCatag2Index * 100;
				const type = this.query.key == item.nCatag2Index ? "checked" : this.hover == category ? "hover" : "normal";
				let data = "";

				this.categoryData.categoryCss.forEach((el) => {
					if (el.name == item.szName) {
						data = el;
					}
				});

				if (data) {
					const x = data.attr[type] % 19;
					const y = Math.floor(data.attr[type] / 19);
					return `u-icon-${x}-${y}`;
				}
				return "aa";
			};
		},
	},
	methods: {
		onQueryKey(id) {
			this.query.key = id;
			this.$emit("onCategoryKey", this.toParams(this.query));
		},
		itemStyle(item) {
			let img = "";

			this.categoryData.categoryCss.forEach((el) => {
				if (el.name == item.szName) {
					img = el.attr.icon;
				}
			});
			return img !== "" ? { backgroundImage: "url(" + __imgPath + "image/game/homeland/" + img + ")" } : "";
		},

		hoverCategory(item) {
			this.hover = +item.nCatag1Index * 10000 + item.nCatag2Index * 100;
		},
		leaveCategory() {
			this.hover = "";
		},
		defaultQuery() {
			this.query = {
				key: "", // 二级分类
				score: "", // 分值
				select: "1", // 属性 风水，观赏，使用，坚固，趣味
				source: "", // 来源
				level: "", // 等级
				interact: false, //交互
				SetID: false, //庐远广记
			};
		},
		// 搜索关键词转换
		toParams(obj) {
			let newObj = {};
			for (const key in obj) {
				if (obj[key] == "") delete obj[key];
				switch (key) {
					case "key":
						newObj["nCatag2Index"] = obj[key];
						break;
					// case "source":
					// 	newObj["source"] = obj[key];
					// 	break;
					case "score":
						newObj["Attribute" + obj.select] = obj[key];
						break;
					case "level":
						newObj["LevelLimit"] = obj[key];
						break;
					case "interact":
						newObj["bInteract"] = obj[key];
						break;
					case "SetID":
						newObj["SetID"] = obj[key];
						break;
				}
			}
			for (const key in newObj) {
				if (typeof newObj[key] == "undefined") delete newObj[key];
			}
			if (newObj.LevelLimit == "all") delete newObj.LevelLimit;
			return newObj;
		},
	},
	watch: {
		query: {
			handler: function (obj) {
				this.$emit("onCategoryKey", this.toParams(obj));
			},
			deep: true,
		},
		"categoryData.isCategory": {
			handler: function (val) {
				if (val) this.defaultQuery();
			},
		},
	},
	created: function () {
		this.defaultQuery();
	},
};
</script>
