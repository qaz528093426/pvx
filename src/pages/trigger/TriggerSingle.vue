<template>
    <div class="v-trigger-single">
        <div class="m-details">
            <TriggerImgs :task="task" />
            <TriggerItem />
            <TriggerGame :title="task.name" />
        </div>

        <detail :id="achieve_id" title="奇遇攻略"></detail>
    </div>
</template>

<script>
import TriggerImgs from "@/components/trigger/img.vue";
import TriggerItem from "@/components/trigger/item.vue";
import TriggerGame from "@/components/trigger/game.vue";
import Detail from '@/components/wiki/Detail.vue';
import { getAdventureID, getAdventureTask, getSerendipityJson } from "@/service/adventure";
import { __iconPath } from "@jx3box/jx3box-common/data/jx3box";

export default {
    name: "triggerSingle",
    props: ["id", "type"],
    components: { TriggerImgs, TriggerItem, TriggerGame, Detail },
    data: function () {
        return {
            list: [],
            task: { name: "三山四海", list: [] },
            content: "",
            loading: false,

            achieve_id: ''
        };
    },
    computed: {},
    watch: {},
    methods: {
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
            getSerendipityJson().then(res => {
                let id = res.data[this.id];

                this.achieve_id = id
            });
        },

        imgNameTga: function (link) {
            link = link.split(".tga");
            return link[0];
        },
    },
    filters: {},
    created: function () {
        if (this.type == "adventure") this.getAdventure();
        console.log(this.id, this.type, this.serendipityJson);
    },
    mounted: function () {},
};
</script>

<style lang="less">
@import "~@/assets/css/adventure/list.less";
@import "~@/assets/css/adventure/trigger.less";
</style>
