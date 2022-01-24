<template>
    <div class="v-adventure-single" v-if="id">
        <TriggerSingle type="adventure" :id="id" />
    </div>
</template>

<script>
import TriggerSingle from "../trigger/TriggerSingle.vue";
export default {
    name: "adventureSingle",
    props: [],
    components: { TriggerSingle },
    data: function () {
        return {};
    },
    computed: {
        id: function () {
            return this.$route.params.id || 1;
        },
    },
    watch: {},
    methods: {},
    filters: {},
    created: function () {},
    mounted: function () {},
};
</script>

<style lang="less">
@import "~@/assets/css/adventure/single.less";
</style>
