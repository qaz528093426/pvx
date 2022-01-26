<template>
    <div class="m-trigger-intro" v-if="content">
        <div v-html="content"></div>
    </div>
</template>
<script>
export default {
    name: "intro",
    props: ["content"],
    components: {},
    data: function () {
        return {};
    },
    computed: {},
    methods: {},
    filters: {},
    created: function () {
        console.log(this.content);
    },
    mounted: function () {},
};
</script>
