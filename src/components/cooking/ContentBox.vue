<template>
  <div class="ContentBox">
    <div class="flex-column-center">
      <div
        class="flex-center-center c-cooking-goodsBox"
        :style="`background:url(${
          imgPath +
          `${
            item.NeedExpertise === 1
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
        <span>{{ item.CostVigor }}</span>
      </div>
      <div>
        <span>材料消耗：</span>
        <div class="flex-center-between">
          <div class="flex-column-center" v-for="item in makingArr" :key="item">
            <div
              class="flex-center-center c-cooking-goodsBox"
              :style="`background:url(${imgPath}image/cooking/newcraft3-10.png);background-size: cover;`"
            >
              <img :src="iconLink(item['item_info'][0]['IconID'])" alt="" />
            </div>
            <div>{{ `${item.Name} x${item.count}` }}</div>
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
        this.getData();
        this.makingArr = [];
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
    getData() {
      this.item.RequireItem.forEach((item) => {
        getOther({
          ids: item.RequireItemIndex,
        }).then((res) => {
          this.makingArr.push({
            ...res.data.list[0],
            count: item.RequireItemCount,
          });
        });
      });
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/assets/css/cooking/index.less";
</style>
