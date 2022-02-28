<template>
  <div class="ContentBox" v-if="item">
    <div class="flex-column-center">
      <div
        class="flex-center-center c-cooking-goodsBox"
        :style="`background:url(${
          imgPath +
          `${
            item.NeedExpertise == 1
              ? +'image/cooking/newcraft3-14.png'
              : 'image/cooking/newcraft3-10.png'
          }`
        });background-size: cover;`"
      >
        <img :src="iconLink(item.IconID)" alt="" />
      </div>

      <div>{{ item.Name }}</div>
    </div>
    <div>
      <div>
        <span>货币消耗：</span>
        <span>{{ item.CostVigor }}精力</span>
      </div>
      <div>
        <span>材料消耗：</span>
        <div class="flex-center-between">
          <div
            class="flex-column-center"
            v-for="goods in item.RequireItem"
            :key="goods.ItemID"
          >
            <div
              class="flex-center-center c-cooking-goodsBox"
              :style="`background:url(${imgPath}image/cooking/newcraft3-10.png);background-size: cover;`"
            >
              <img :src="iconLink(goods.IconID)" alt="" />
            </div>
            <div>{{ `${goods.Name} x${goods.count}` }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { iconLink } from "@jx3box/jx3box-common/js/utils.js";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
// __imgPath + 'image/cooking/xxx.png'
// import IconBox from "./IconBox.vue";
import { getOther, getItemsPrice } from "@/service/cooking";
export default {
  name: "ContentBox",
  props: {
    item: {
      dataType: Object,
      default: null,
    },
  },
  watch: {
    item: {
      deep: true,
      handler() {
      },
    },
  },
  // components: [IconBox],
  data: function () {
    return {
      makingArr: [],
      imgPath: __imgPath,
    };
  },
  mounted() {
    console.log(this.item);
  },
  methods: {
    iconLink,
  },
};
</script>

<style scoped lang="less">
@import "~@/assets/css/cooking/index.less";
</style>
