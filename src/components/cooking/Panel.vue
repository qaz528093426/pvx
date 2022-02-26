<template>
  <div class="Panel">
    <div class="c-Panel-itemNav flex-center-between">
      <div>
        <Item />
        <div>
          <img
            :src="iconLink(item.IconID)"
            alt=""
          >
        </div>
        <div>{{ item.Name }}</div>
        <GamePrice :price="setItemsPrice(item.ItemID)" />
      </div>
      <div>
        <el-input-number
          @change="changeNumber"
          v-model="item.num"
          :min="1"
        ></el-input-number>
        <el-button
          @click="removePanel(item)"
          size="mini"
        >
          移出购物车
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Item from "@jx3box/jx3box-editor/src/Item.vue";
import { iconLink } from "@jx3box/jx3box-common/js/utils.js";
import GamePrice from "@jx3box/jx3box-common-ui/src/wiki/GamePrice.vue";
import { getItemsPrice } from "@/service/cooking";

export default {
  name: "Panel",
  props: ["item", "serversName"],
  components: { Item, GamePrice },
  data: function () {
    return {
      price: 1234,
    };
  },
  mounted() {},
  methods: {
    iconLink,
    setItemsPrice(id) {
      getItemsPrice({
        server: this.serversName,
        list: id,
      }).then((res) => {
        console.log(res.data);
        return 1234
        // this.itemArr = res.data;
      });
    },
    removePanel(item) {
      this.$emit("removePanel", item);
    },
    changeNumber(currentValue, oldValue) {
      this.$emit("changePanel", { currentValue, oldValue, item: this.item });
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/assets/css/cooking/index.less";
</style>
