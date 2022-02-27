<template>
  <div class="ListItem">
    <div class="c-cooking-itemNav flex-center-between">
      <el-popover
        placement="right"
        trigger="hover"
      >
        <el-button
          @click="addPanel(item)"
          size="mini"
        >
          加入购物车
        </el-button>
        <div slot="reference">
          <img
            :src="iconLink(item.IconID)"
            alt=""
          >
          {{ `[${item.nLevel}]${item.Name}` }}
          <!-- <Item :item_id="val.ItemID"/> -->
        </div>
      </el-popover>
    </div>
  </div>
</template>

<script>
// import Item from "@jx3box/jx3box-editor/src/Item.vue";
import { iconLink } from "@jx3box/jx3box-common/js/utils.js";
export default {
  name: "ListItem",
  props: ["item"],
  // components: { Item },
  data: function () {
    return {};
  },
  mounted() {},
  methods: {
    iconLink,
    addPanel(item) {
      this.$emit("addPanel", item);
    },
  },
};
</script>

