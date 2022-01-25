<template>
    <div class="v-trigger-single">
        <div class="m-details">
            <TriggerImgs :task="task" />
            <TriggerItem />
            <TriggerGame :title="task.name" />
        </div>
        <TriggerIntro :content="content" />
    </div>
</template>

<script>
import TriggerImgs from "@/components/trigger/img.vue";
import TriggerItem from "@/components/trigger/item.vue";
import TriggerGame from "@/components/trigger/game.vue";
import TriggerIntro from "@/components/trigger/intro.vue";
import { getAdventureID, getAdventureTask, getSerendipity, getSerendipityJson } from "@/service/adventure";
import { __iconPath } from "@jx3box/jx3box-common/data/jx3box";

export default {
    name: "triggerSingle",
    props: ["id", "type"],
    components: { TriggerImgs, TriggerItem, TriggerGame, TriggerIntro },
    data: function () {
        return {
            list: [],
            task: { name: "三山四海", list: [] },
            content: "",
            loading: false,
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
                let json = res.data;
                let id = json[this.id];
                getSerendipity(id).then(res => {
                    let { title, content } = res.data.data.post;
                    this.content = content;
                });
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
