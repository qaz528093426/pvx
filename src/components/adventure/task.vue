<template>
    <div class="m-adventure-task" v-if="task">
        <el-carousel :autoplay="false">
            <el-carousel-item v-for="(item, i) in task.list" :key="i">
                <img class="u-img" :src="imgUrl(item)" />
            </el-carousel-item>
        </el-carousel>
        <span class="u-name">{{ task.name }}</span>
    </div>
</template>

<script>
import { __iconPath } from "@jx3box/jx3box-common/data/jx3box";
import { getAdventureTask } from "@/service/adventure";
export default {
    name: "task",
    props: ["id"],
    components: {},
    data: function () {
        return {
            imgRoot: __iconPath + "pvx/serendipity/images/",
            task: "",
        };
    },
    computed: {},
    methods: {
        imgUrl: function (link) {
            link = this.transformTga(link);
            return this.imgRoot + "/" + link + ".png";
        },
        transformTga(link) {
            link = link.split("/");
            return link[link.length - 2] + "/" + link[link.length - 1];
        },
        loadData() {
            getAdventureTask(this.id).then((res) => {
                this.task = res.data || [];
            });
        },
    },
    filters: {},
    created: function () {},
    mounted: function () {
        this.loadData()
    },
};
</script>
