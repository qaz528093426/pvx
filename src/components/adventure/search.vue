<template>
    <div class="m-adventure-search">
        <div class="m-adventure-mark">
            <span class="u-mark" v-for="(item, i) in marks" :key="i" @click="changeMark(i)">
                <b :class="i == index ? 'active' : ''"></b>
                <span>{{ item }}</span>
            </span>
        </div>
        <div class="u-input">
            <input type="text" v-model="search" placeholder="请输入奇遇或宠物名字搜索" />
        </div>
    </div>
</template>

<script>
export default {
    name: "search",
    props: [],
    components: {},
    data: function () {
        return {
            search: "",
            marks: ["全部奇遇", "绝世奇遇", "普通奇遇", "宠物奇遇"],
            index: 0,
        };
    },
    computed: {},
    watch: {
        search(val) {
            if (val == "") return;
            clearTimeout(this.tiemOut);
            this.tiemOut = setTimeout(() => {
                this.getData();
            }, 500);
        },
    },
    methods: {
        changeMark(i) {
            this.index = i;
        },
        getData() {
            console.log(this.search);
        },
    },
    filters: {},
    created: function () {},
    mounted: function () {},
};
</script>
