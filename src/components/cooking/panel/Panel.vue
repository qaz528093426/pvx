<template>
  <div class="Panel">
    <div class="m-Panel-content">
      <div class="c-Panel-itemList">
        <div
          v-for="item in panelArr"
          :key="item.id"
          class="c-Panel-itemNav flex-center-between"
        >
          <div>
            <Item/>
            <div>物品图标</div>
            <div>{{item.name}}</div>
            <div>需要金钱</div>
          </div>
          <div>
            <el-input-number
              v-model="item.num"
              :min="1"
            ></el-input-number>
            <el-button @click="removePanel(item)" size="mini">
              移出购物车
            </el-button>
          </div>
        </div>
      </div>
      <div class="c-Panel-total">
        总共：
      </div>
    </div>
    <div class="m-Panel-content">
      <div class="c-Panel-itemList">
        <div v-for="item in makingsArr" :key="item.id" class="c-Panel-itemNav flex-center-between">
          <div>物品图标</div>
          <div>{{item.name}}</div>
          <div>需要金钱</div>
        </div>
      </div>
      <div class="c-Panel-total">
        总共：
      </div>
    </div>
  </div>
</template>

<script>
import Item from '@jx3box/jx3box-editor/src/Item.vue'
export default {
  name: "Panel",
  props: ["panelArr","makingsArr"],
  components:{Item},
  data: function () {
    return {};
  },
  mounted() {},
  methods: {
    removePanel(item){
      this.$emit('removePanel',item)
    }
  },
};
</script>

<style scoped lang="less">
@import "~@/assets/css/cooking/index.less";
</style>
