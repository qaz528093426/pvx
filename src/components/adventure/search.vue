<template>
    <div class="m-adventure-search">
        <div class="m-adventure-mark">
            <span class="u-mark" v-for="(item, i) in marks" :key="i" @click="changeMark(i)">
                <b :class="i == index ? 'active' : ''"></b>
                <span>{{ item.name }}</span>
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
            marks: [
                { name: "全部奇遇", type: "all", id: '' },
                { name: "绝世奇遇", type: "bPerfect", id: 1 },
                { name: "普通奇遇", type: "nClassify", id: 2 },
                { name: "宠物奇遇", type: "nClassify", id: 1 },
            ],
            index: 0,
        };
    },
    computed: {},
    methods: {
        changeMark(i) {
            this.index = i;
            this.jointParams();
        },
        jointParams() {
            let params = {};
            const item = this.marks[this.index]
            if (item.id) {
                params[item.type] = item.id;
            }
            if (this.search) params.name = this.search;
            this.$emit("onSearch", params);
        },
    },
    watch: {
        search() {
            this.jointParams();
        },
    }
};
</script>
