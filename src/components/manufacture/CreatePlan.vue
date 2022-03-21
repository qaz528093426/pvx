<template>
    <div class="m-create-plan" v-if="list.length">
        <el-button type="success" icon="el-icon-document-checked" @click="setMyPlan" size="small"
            >保存至我的清单</el-button
        >
        <el-alert class="u-tip" v-if="done" type="success">
            <span slot="title">清单创建成功，<a :href="url" target="_blank">点击查看</a></span>
        </el-alert>
    </div>
</template>

<script>
import { addMyPlans } from "@/service/manufacture";
import { getLink } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "CreatePlan",
    props: ["list"],
    data: function () {
        return {
            done: false,
            data: "",
        };
    },
    computed: {
        recipe() {
            return this.list.map((item) => {
                return { id: item.item_type_id, count: item.count };
            });
        },
        materials() {
            return this.list.map((item) =>
                item.child_list.map((el) => {
                    return { id: el.price_id, count: el.count };
                })
            );
        },
        url: function () {
            return getLink("item_plan", this.data?.id);
        },
    },
    methods: {
        setMyPlan() {
            let recipe = this.recipe;
            let materials = this.merge(this.materials);
            let data = {
                title: "技艺助手成本计算",
                type: 1,
                public: 1,
                description: "",
                relation: [
                    { title: "生产配方", data: recipe },
                    { title: "生产配方所需材料", data: materials },
                ],
            };
            addMyPlans(data).then((res) => {
                this.done = true;
                this.data = res.data.data;
                this.$notify({
                    title: "清单创建成功",
                    message: "请在创作中心查看",
                    type: "success",
                });
            });
        },
        // 合并所有材料的id和数量
        merge(list) {
            let _list = [];
            let _obj = {};
            list.forEach((item) => {
                item.forEach((el) => {
                    if (_obj[el.id]) {
                        _obj[el.id] += el.count;
                    } else {
                        _obj[el.id] = el.count;
                    }
                });
            });
            for (const key in _obj) {
                _list.push({ id: key, count: _obj[key] });
            }
            return _list;
        },
    },
};
</script>
<style lang="less" scoped>
.m-create-plan {
    .x(right);

    .u-tip{
        .mt(10px);
    }
}
</style>
