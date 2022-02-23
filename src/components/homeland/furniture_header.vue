<template>
	<div class="m-furniture-header">
		<h1 class="u-title">家具大全</h1>
		<el-input placeholder="请输入搜索内容" v-model="search" class="input-with-select">
			<span slot="prepend">关键词</span>
			<el-button slot="append" icon="el-icon-search"></el-button>
		</el-input>
	</div>
</template>
<script>
export default {
	name: "Header",
	props: [],
	data: function () {
		return {
			search: "",
		};
	},
	watch: {
		search(val) {
			this.$emit("onSearchKey", val);
		},
	},
};
</script>
