<template>
    <div class="v-trigger-single">
        <div class="m-details">
            <AdventureItem :item="list" />
            <TriggerItem />
            <TriggerGame />
        </div>
        <TriggerIntro />
    </div>
</template>

<script>
import AdventureItem from "@/components/adventure/item.vue";
import TriggerItem from "@/components/trigger/item.vue";
import TriggerGame from "@/components/trigger/game.vue";
import TriggerIntro from "@/components/trigger/intro.vue";
import { getAdventureID, getAdventureTask } from "@/service/adventure";
export default {
    name: "triggerSingle",
    props: ["id", "type"],
    components: { AdventureItem, TriggerItem, TriggerGame, TriggerIntro },
    data: function () {
        return {
            list: [],
            task: [],
        };
    },
    computed: {},
    watch: {},
    methods: {
        getAdventure() {
            getAdventureID(this.id).then(res => {
                this.list = res.data;
                console.log(res, "getAdventureID");
            });
            getAdventureTask(this.id).then(res => {
                this.task = res.data;
                console.log(res, "getAdventureTask");
            });
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
