<template>
    <div class="v-trigger-single">
        <div class="m-details">
            <AdventureItem />
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
export default {
    name: "triggerSingle",
    props: [],
    components: { AdventureItem, TriggerItem, TriggerGame, TriggerIntro },
    data: function () {
        return {};
    },
    computed: {},
    watch: {},
    methods: {},
    filters: {},
    created: function () {},
    mounted: function () {},
};
</script>

<style lang="less">
@import "~@/assets/css/adventure/single.less";
@import "~@/assets/css/adventure/trigger.less";
</style>
