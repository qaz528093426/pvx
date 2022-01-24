<template>
    <div class="v-trigger-single">
        <div class="m-details">
            <AdventureItem v-if="false"/>
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
        return {
            id: "",
        };
    },
    computed: {},
    watch: {},
    methods: {},
    filters: {},
    created: function () {
        this.id = this.$route.params.id
        console.log(this.id) 
    },
    mounted: function () {},
};
</script>

<style lang="less">
@import "~@/assets/css/adventure/single.less";
@import "~@/assets/css/adventure/trigger.less";
</style>
