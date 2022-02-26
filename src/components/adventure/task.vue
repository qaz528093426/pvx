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
import { __iconPath ,__ossMirror} from "@jx3box/jx3box-common/data/jx3box";
import { getAdventureTask } from "@/service/adventure";
export default {
    name: "task",
    props: ["id"],
    components: {},
    data: function () {
        return {
            imgRoot: __iconPath + "pvx/serendipity/images/",
            // imgRoot: __ossMirror + "game/serendipity/images",
            task: "",
        };
    },
    computed: {},
    methods: {
        imgUrl: function (link) {
            return this.imgRoot + "/" + link + ".png";
        },
        imgNameTga: function (link) {
            return link.match(/(\S*)Adventure\/(\S*)\.tga/)[2];
        },
        imgStyle: function (item) {
            return { 
                backgroundImage: "url(" + this.imgUrl(item) + ")",
            };
        },
        loadData() {
            getAdventureTask(this.id).then(res => {
                let list = [];
                res.data.forEach(e => {
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
