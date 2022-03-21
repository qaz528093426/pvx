<template>
    <div class="m-share-item">
        <a class="u-face" :href="item.ID | postLink">
            <i class="u-img">
                <img class="u-pic" :src="showThumb(imgLink)" loading="lazy" />
            </i>
            <span class="u-author">@{{ author }}</span>
        </a>
        <span class="u-op" v-if="isEditor">
            <i
                class="u-op-hot"
                title="设为热门"
                :class="{ on: hasMark(item, 'newbie') }"
                @click="setMark(item, 'newbie')"
                >♥</i
            >
            <i
                class="u-op-rec"
                title="设为推荐"
                :class="{ on: hasMark(item, 'advanced') }"
                @click="setMark(item, 'advanced')"
                >✿</i
            >
            <i
                class="u-op-star"
                title="设为精选"
                :class="{ on: hasMark(item, 'recommended') }"
                @click="setMark(item, 'recommended')"
                >★</i
            >
        </span>
        <span class="u-op u-readOnly" v-else>
            <i class="u-op-hot" :class="{ on: hasMark(item, 'newbie') }" v-if="hasMark(item, 'newbie')">♥</i>
            <i class="u-op-rec" :class="{ on: hasMark(item, 'advanced') }" v-if="hasMark(item, 'advanced')">✿</i>
            <i class="u-op-star" :class="{ on: hasMark(item, 'recommended') }" v-if="hasMark(item, 'recommended')">★</i>
        </span>
    </div>
</template>

<script>
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box";
import User from "@jx3box/jx3box-common/js/user";
import { setPost } from "@/service/share";
import { showMinibanner, showBanner } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "item",
    props: ["item"],
    data: function () {
        return {
            search: "",
            markmap: {
                newbie: "热门",
                advanced: "推荐",
                recommended: "精选",
            },
            isEditor: User.isEditor(),
        };
    },
    computed: {
        author: function () {
            return this.item.post_meta.author || "匿名";
        },
        imgLink: function () {
            return this.item.post_meta.pics[0]?.url || __imgPath + "image/face/null2.png";
        },
    },
    methods: {
        hasMark: function (item, key) {
            return item.mark?.includes(key);
        },
        setMark: function (item, key) {
            let hasKey = item.mark?.includes(key);
            item.mark = hasKey ? [] : [key];
            let msg = hasKey ? "取消" : "设置";
            msg += this.markmap[key];
            msg += "成功";

            setPost(item.ID, {
                mark: item.mark,
            }).then((res) => {
                this.$notify({
                    title: "成功",
                    message: msg,
                    type: "success",
                });
            });
        },
        showThumb: function (item) {
            return showBanner(item, "face");
        },
        showBanner: function (val) {
            return showMinibanner(val);
        },
    },
    filters: {
        postLink: function (val) {
            return location.origin + "/share/" + val;
        },
    },
};
</script>
