<template>
    <div class="m-detail-view">
        <div class="m-wiki-post-panel" v-if="wiki_post && wiki_post.post">
            <WikiPanel :wiki-post="wiki_post">
                <template slot="head-title">
                    <img class="u-icon" svg-inline src="../../assets/img/achievement.svg" />
                    <span class="u-txt">{{ title }}</span>
                </template>
                <template slot="head-actions">
                    <a class="el-button el-button--primary" :href="publish_url(`achievement/${id}`)">
                        <i class="el-icon-edit"></i>
                        <span>完善{{ title }}</span>
                    </a>
                </template>
                <template slot="body">
                    <Article :content="wiki_post.post.content" />
                </template>
            </WikiPanel>

            <!-- 历史版本 -->
            <WikiRevisions type="achievement" :source-id="id" />
        </div>
        <div class="m-wiki-post-empty" v-else>
            <i class="el-icon-s-opportunity"></i>
            <span>暂无攻略，我要</span>
            <a class="s-link" :href="publish_url(`achievement/${id}`)">完善攻略</a>
        </div>
    </div>
</template>

<script>
import Article from "@jx3box/jx3box-editor/src/Article.vue";
import WikiPanel from "@jx3box/jx3box-common-ui/src/wiki/WikiPanel";
import WikiRevisions from "@jx3box/jx3box-common-ui/src/wiki/WikiRevisions";
import { postStat } from "@jx3box/jx3box-common/js/stat";
import { getSerendipity } from "@/service/adventure";
import { publishLink } from "@jx3box/jx3box-common/js/utils";

export default {
    name: "Detail",
    props: ["id", "title"],
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
    },
    methods: {
        publish_url: publishLink,
        triggerStat: function () {
            if (this.client == "origin") {
                postStat("origin_cj", this.id);
            } else {
                postStat("cj", this.id);
            }
        },
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
            handler() {
                // 获取最新攻略
                if (this.id) {
                    getSerendipity(this.id).then((res) => {
                        this.wiki_post = res.data.data;
                        if (this.wiki_post && this.wiki_post.source) {
                            let pet = this.wiki_post.source.pet;
                            if (pet && pet.id) postStat("pet", pet.id);
                        }
                        this.triggerStat();
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
