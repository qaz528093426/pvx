<template>
    <div class="m-share-tabs">
        <div class="u-tabs">
            <div
                class="u-tab-item"
                v-for="item in body_types"
                :key="item.value"
                @click="clickTabs(item)"
                :class="{
                    active: item.value == active,
                }"
            >
                <img class="u-icon-img" :src="getThumbnail(item.label)" :alt="item.label" />
                <span class="u-tabs-span">{{ item.label }}</span>
            </div>
        </div>
        <div class="u-marks">
            <el-radio-group v-model="star" class="u-star" size="small">
                <el-radio-button label="">全部</el-radio-button>
                <el-radio-button :label="1">精选</el-radio-button>
            </el-radio-group>
            <el-radio-group v-model="price_type" size="small">
                <el-radio-button label="">全部</el-radio-button>
                <el-radio-button label="0">免费</el-radio-button>
                <!-- <el-radio-button label="1">盒币</el-radio-button> -->
                <!-- <el-radio-button label="2">金箔</el-radio-button> -->
            </el-radio-group>
        </div>
    </div>
</template>

<script>
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box";
export default {
    name: "tabs",
    props: [],
    data: function () {
        return {
            body_types: [{
                value: '',
                label: '全部'
            }, {
                value: 1,
                label: '成男'
            }, {
                value: 2,
                label: '成女'
            }, {
                value: 5,
                label: '正太'
            }, {
                value: 6,
                label: '萝莉'
            }],

            active: '',
            star: '',
            price_type: '',
        };
    },
    computed: {
        params() {
            return {
                star: this.star,
                body_type: this.active,
                price_type: this.price_type,
            };
        },
    },
    methods: {
        //切换数据
        clickTabs({ value }) {
            this.active = value
        },
        getThumbnail: function (filename) {
            return __imgPath + "image/face/" + filename + ".jpg";
        },
    },
    watch: {
        params: {
            deep: true,
            handler: function (obj) {
                this.$emit("change", obj);
            },
        },
    },
};
</script>
