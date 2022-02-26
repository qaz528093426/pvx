<template>
  <div class="Makings">
    <!-- <div v-for="item in makingsArr" :key="item.id">
    </div> -->
    <div class="c-Panel-itemNav flex-center-between">
      <div>
        <img :src="iconLink(making['item_info'][0]['IconID'])" alt="" />
      </div>
      <div>{{ `${making.Name} x${item.RequireItemCount}` }}</div>
      <GamePrice :price="setItemsPrice(making['item_info'][0]['ItemID'])" />
    </div>
  </div>
</template>

<script>
import { iconLink } from "@jx3box/jx3box-common/js/utils.js";
import GamePrice from "@jx3box/jx3box-common-ui/src/wiki/GamePrice.vue";
import { getOther, getItemsPrice } from "@/service/cooking";

// import Item from "@jx3box/jx3box-editor/src/Item.vue";
export default {
  name: "Makings",
  props: ["item", "serversName"],
  watch: {
    item: {
      deep: true,
      handler() {
        this.getData();
      },
    },
  },
  components: { GamePrice },
  data: function () {
    return {
      making: "",
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    iconLink,
    getData() {
      getOther({
        ids: this.item.RequireItemIndex,
      }).then((res) => {
        this.making = res.data.list[0];
      });
    },
    setItemsPrice(id) {
      getItemsPrice({
        server: this.serversName,
        list: id,
      }).then((res) => {
        console.log(res.data);
        return 1234;
        // this.itemArr = res.data;
      });
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/assets/css/cooking/index.less";
</style>
