<template>
    <div class="m-create-plan" v-if="list.length">
        <el-popover popper-class="m-plan-tips" placement="top" width="220" trigger="manual" v-model="visible">
            <el-divider>新建清单</el-divider>
            <div class="u-tips">
                <el-button size="mini" icon="el-icon-edit">编辑信息</el-button>
                <el-button size="mini" icon="el-icon-thumb" type="primary" @click="setMyPlan">直接保存</el-button>
            </div>
            <el-button slot="reference" type="success" icon="el-icon-document-checked" size="small">保存至我的清单</el-button>
        </el-popover>

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
            visible: false,
            data: "",
        };
    },
    computed: {
        url: function () {
            return getLink("item_plan", this.data?.id);
        },
    },
    methods: {
        setMyPlan() {
            let recipe = [],
                materials = [];
            this.list.forEach((item) => {
                console.log(item, item.children);
                recipe.push({ id: item.item.price_id, count: item.item.count });
                item.children.forEach((el) => {
                    materials.push({ id: el.price_id, count: el.count });
                });
            });
            // materials = this.merge(this.materials);

            let date = new Date();
            const time = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay();

            let data = {
                title: `技艺助手成本计算 ${time}`,
                type: 1,
                public: 1,
                description: "",
                relation: [
                    { title: "生产配方", data: recipe },
                    { title: "生产配方所需材料", data: materials },
                ],
            };
            // addMyPlans(data).then((res) => {
            //     this.done = true;
            //     this.data = res.data.data;
            //     this.$notify({
            //         title: "清单创建成功",
            //         message: "请在创作中心查看",
            //         type: "success",
            //     });
            // });
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

        .u-tip {
            .mt(10px);
        }
    }
</style>
<style lang="less">
    .m-plan-tips {
        .u-tips {
            .flex;
            justify-content: space-around;
        }
    }
</style>
