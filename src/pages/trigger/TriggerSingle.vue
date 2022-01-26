<template>
    <div class="v-trigger-single">
        <div class="m-trigger-navigation">
            <el-button class="u-goback" size="medium" icon="el-icon-arrow-left" @click="goBack" plain>返回列表</el-button>
            <div class="m-trigger-links">
                <a class="u-link u-achievement" :href="getLink('cj', achieve_id)">
                    <i class="el-icon-trophy"></i>
                    成就信息
                </a>
            </div>
        </div>

        <div class="m-details">
            <!-- <TriggerImgs :task="task" /> -->
            <!-- <TriggerItem /> -->
            <!-- <TriggerGame :title="task.name" /> -->
        </div>

        <!-- <detail :id="achieve_id" title="奇遇攻略"></detail> -->
    </div>
</template>

<script>
// import TriggerImgs from "@/components/trigger/img.vue";
// import TriggerItem from "@/components/trigger/item.vue";
// import TriggerGame from "@/components/trigger/game.vue";
// import Detail from "@/components/wiki/Detail.vue";
import { getAdventureID, getAdventureTask, getSerendipityAchievementIds } from "@/service/adventure";
import { __iconPath } from "@jx3box/jx3box-common/data/jx3box";
import { getLink } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "triggerSingle",
    props: ["id", "type"],
    // components: { TriggerImgs, TriggerItem, TriggerGame, Detail },
    data: function () {
        return {
            list: [],
            task: { name: "三山四海", list: [] },
            content: "",
            loading: false,

            achieve_id: "",
        };
    },
    computed: {},
    watch: {},
    methods: {
        getLink,
        getAdventure() {
            getAdventureID(this.id).then(res => {
                this.list = res.data;
                this.task.name = res.data.szName;
            });
            getAdventureTask(this.id).then(res => {
                let list = [];
                res.data?.forEach(item => {
                    const key = item.szFramePath;
                    if (!list.includes(key)) list.push(key);
                });
                let arr = [];
                list.forEach(e => {
                    if (e) {
                        let k = e.replace(/\\/g, "/");
                        arr.push(this.imgNameTga(k));
                    }
                });
                this.task.list = arr;
            });
            getSerendipityAchievementIds().then(res => {
                this.achieve_id = res.data[this.id];
            });
        },

        imgNameTga: function (link) {
            link = link.split(".tga");
            return link[0];
        },
        goBack() {
            this.$router.push({ name: "list" });
        },
    },
    filters: {},
    created: function () {
        if (this.type == "adventure") this.getAdventure();
        console.log(this.id, this.type);
    },
    mounted: function () {},
};
</script>

<style lang="less">
@import "~@/assets/css/adventure/list.less";
@import "~@/assets/css/adventure/trigger.less";
</style>
