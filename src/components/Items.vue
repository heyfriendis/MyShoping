<template>
<div>
  <div class="BD">
    <div class="shopShow">
      <router-link
        :to="{path:'/detail',query:{id:item.id}}"
        v-for="(item, index) in shopList"
        :key="index"
        class="item"
      >
        <img :src="item.firstImg" alt="" />
        <span class="itemName">{{ item.itemName }}</span>
        <span class="price">￥{{ item.price }}.00</span>
      </router-link>
    </div>
  </div>
      <div class="foot">
      <span>由LiangHongyu制作</span>
      <span>2023/4/22</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shopList: [],
    };
  },
  methods: {
    async getShopList() {
      const { data: res } = await this.$http.get("/item");
      if (res.code === 200) {
        this.shopList = res.data;
      }
      console.log(this.shopList);
    },
  },
  created() {
    this.getShopList();
  },
  mounted() {},
};
</script>
<style scoped>
.BD {
  width: 80%;
  margin: 0 auto;
}
.shopShow {
  display: flex;
  flex-wrap: wrap;
}
.item {
  height: 500px;
  position: relative;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 10px;
  margin: 0 auto;
  border: 1px solid #000;
  background-color: #acbeca8b;
  margin-top: 10px;
}
.item :hover {
  transition: all 0.7s ease;
  scale: 1.2;
}
.item img {
  height: 400px;
  width: auto;
}
.itemName {
  position: absolute;
  top: 420px;
  left: 0;
}
.price {
  font-size: 24px;
  color: rgba(255, 0, 0, 0.495);
  position: absolute;
  left: 10px;
  top: 460px;
}
.foot {
  width: 100%;
  height: 100px;
  background-color: rgba(0, 0, 0, 0.6);
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
}
.foot span {
  margin: 10px auto;
}
</style>