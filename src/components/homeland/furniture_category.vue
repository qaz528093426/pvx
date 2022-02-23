<template>
	<div class="m-furniture-category" v-if="list.length">
		<div class="u-tabs flexNormal">
			<div class="u-item" v-for="item in list" :key="item.id" @click="onIndex(item.nCatag2Index)" @mouseenter="hoverCategory(item)" @mouseleave="leaveCategory" :class="item.nCatag2Index == index ? 'active' : ''">
				<span class="u-img" :class="itemClass(item)" :style="itemStyle(item)"></span>
				<span>{{ item.szName }}</span>
			</div>
		</div>

		<div class="u-box flexNormal">
			<el-input class="u-input u-margin" v-model="score" placeholder="输入 ≥ 分值，如：2600">
				<el-select v-model="select" slot="prepend" placeholder="请选择">
					<el-option v-for="item in categoryList" :key="item.value" :label="item.name" :value="item.key"> </el-option>
				</el-select>
			</el-input>
			<el-select class="u-select u-margin" v-model="source" slot="prepend" placeholder="家具来源">
				<el-option v-for="item in sourceList" :key="item.value" :label="item.name" :value="item.key"> </el-option>
			</el-select>
			<el-select class="u-select u-margin" v-model="level" slot="prepend" placeholder="家园等级">
				<el-option v-for="item in levelList" :key="item.value" :label="item.name" :value="item.key"> </el-option>
			</el-select>
			<el-checkbox-group class="flexNormal" v-model="checkList">
				<el-checkbox label="可交互"></el-checkbox>
				<el-checkbox label="庐远广记"></el-checkbox>
			</el-checkbox-group>
		</div>
	</div>
</template>
<script>
import { sourceList, levelList, categoryList } from "@/assets/data/furniture.json";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box";
export default {
	name: "Category",
	data: function () {
		return {
			index: -1,
			score: "",
			key: "",
			select: "1",
			source: "",
			level: "",
			radio: "",
			checkList: [],

			sourceList,
			categoryList,
			levelList,

			hover: "",
		};
	},
	props: ["list", "categoryCss"],
	computed: {
		itemClass() {
			return (item) => {
				const category = +item.nCatag1Index * 10000 + item.nCatag2Index * 100;
				const type = this.index == item.nCatag2Index ? "checked" : this.hover == category ? "hover" : "normal";
				let data = "";

				this.categoryCss.forEach((el) => {
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
		onIndex(id) {
			this.index = id;
		},
		itemStyle(item) {
			let img = "";
			this.categoryCss.forEach((el) => {
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
	},
	created: function () {},
};
</script>
