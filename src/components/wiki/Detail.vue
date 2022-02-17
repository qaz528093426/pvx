<template>
    <div class="m-detail-view">
        <div class="m-wiki-post-panel" v-if="wiki_post && wiki_post.post">
            <WikiPanel :wiki-post="wiki_post">
                <template slot="head-title">
                    <img class="u-icon" svg-inline src="../../assets/img/achievement.svg" />
                    <span class="u-txt">{{ title }}</span>
                </template>
                <template slot="head-actions">
                    <a class="el-button el-button--primary" :href="publish_url(`${type}/${id}`)">
                        <i class="el-icon-edit"></i>
                        <span>完善{{ title }}</span>
                    </a>
                </template>
                <template slot="body">
                    <Article :content="wiki_post.post.content" />
                    <Thx class="m-thx" :postId="real_id" :postType="real_type" :adminBoxcoinEnable="false" :userBoxcoinEnable="false" />
                </template>
            </WikiPanel>

            <!-- 历史版本 -->
            <WikiRevisions :type="type" :source-id="id" />
        </div>
        <div class="m-wiki-post-empty" v-else>
            <i class="el-icon-s-opportunity"></i>
            <span>暂无攻略，我要</span>
            <a class="s-link" :href="publish_url(`${type}/${id}`)">完善攻略</a>
        </div>
    </div>
</template>

<script>
import Article from "@jx3box/jx3box-editor/src/Article.vue";
import WikiPanel from "@jx3box/jx3box-common-ui/src/wiki/WikiPanel";
import WikiRevisions from "@jx3box/jx3box-common-ui/src/wiki/WikiRevisions";
import { getWiki } from "@/service/wiki";
import { publishLink } from "@jx3box/jx3box-common/js/utils";

export default {
    name: "Detail",
    // TODO:宠物的关联成就ID应在上层传递下来
    props: ["achievement_id", "item_id", "title", "real_type"],
    data() {
        return {
            wiki_post: null,
        };
    },
    computed: {
        isRevision: function () {
            return !!this.$route.params.post_id;
        },
        client: function () {
            return this.$store.state.client;
        },
        id: function () {
            return this.achievement_id || this.item_id;
        },
        type: function () {
            return this.achievement_id ? "achievement" : "item";
        },
        // 本地类型ID
        real_id: function () {
            return this.$route.params.id;
        },
        params: function () {
            return {
                type: this.type,
                source_id: this.id,
                supply: 1,
                client: this.client,
            };
        },
    },
    methods: {
        publish_url: publishLink,
    },
    created() {},
    components: {
        WikiPanel,
        WikiRevisions,
        Article,
    },
    watch: {
        id: {
            immediate: true,
            handler(val) {
                // 获取最新攻略
                if (val) {
                    getWiki(this.params).then((res) => {
                        this.wiki_post = res?.data?.data;
                    });
                }
            },
        },
    },
};
</script>

<style lang="less">
@import "~@/assets/css/detail.less";
</style>
