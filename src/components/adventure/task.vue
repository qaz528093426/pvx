<template>
	<div class="m-adventure-task" v-if="task">
		<el-carousel class="u-carousel" :autoplay="false" type="card">
			<el-carousel-item v-for="(item, i) in task" :key="i">
				<span class="u-img" :style="imgStyle(item)"></span>
			</el-carousel-item>
		</el-carousel>
		<span class="u-name">{{ task.name }}</span>
	</div>
</template>

<script>
import { getAdventureTask } from "@/service/adventure";
export default {
	name: "task",
	props: ["id"],
	inject: ["__imgRoot"],
	components: {},
	data: function () {
		return {
			task: "",
		};
	},
	computed: {
		client: function () {
			return this.$store.state.client;
		},
	},
	methods: {
		imgNameTga: function (link) {
			return link.match(/(\S*)Adventure\/(\S*)\.tga/)[2];
		},
		imgStyle: function (link) {
			return {
				backgroundImage: "url(" + this.__imgRoot + `adventure/${this.client}/` + link + ".png)",
			};
		},
		loadData() {
			getAdventureTask(this.id).then((res) => {
				let list = [];
				res.data.forEach((e) => {
					if (e.szFramePath) {
						let k = e.szFramePath?.replace(/\\/g, "/");
						list.push(this.imgNameTga(k));
					}
				});
				this.task = [...new Set(list)];
			});
		},
	},
	filters: {},
	created: function () {},
	mounted: function () {
		this.loadData();
	},
};
</script>
