<template>
  <div class="bigBox">
    <div class="unLogin" v-if="!token">
        <span class="tip">抱歉，您还未登录，请登录后使用该功能</span>
        <div class="toLogin">
            <router-link to="/login">点我登录</router-link>
        </div>
        <div class="back">
            <router-link to="/shop">点我继续逛</router-link>
        </div>
    </div>
    <div class="myCart" v-else>
      <span class="title">我的购物车</span>
      <div class="cartBody">
        <ul>
          <li v-for="(item,index) in cartList" :key="index">
            <div class="left">
              <span class="name">{{item.shopList.itemName}}</span>
              <span class="address">发货地址:{{item.shopList.address}}</span>
              <span class="price"> ￥{{item.shopList.price}}</span>
            </div>
            <div class="right">
              <div class="itemCount">X{{item.count}}</div>
              <div class="delete" @click="deleteItem(index)">删除</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="totalPrice">
        <span>总价:</span>
        <span>{{totalPrice}}</span>
      </div>
      <el-button class="sub" @click="buy">结算</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: "",
      nickname: "",
      id:"",
      count:"",
      cartList:[]
    };
  },
  computed:{
    totalPrice(){
      let totalPrice = 0
      this.cartList.forEach(element => {
        totalPrice += element.shopList.price * element.count
      });
      return totalPrice
    }
  },
  methods: {
    deleteItem(e){
      this.cartList.splice(e,1)
    },
    buy(){
      alert("购买成功")
    }
  },
  created() {
    this.token = this.$store.state.token;
    this.nickname = this.$store.state.nickname;
    this.count = this.$route.query.count
    this.id = this.$route.query.id
    this.cartList =this.$store.state.cartList
  },
};
</script>
<style scoped>
.bigBox {
  background-color: #5a8289;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  margin: 0;
  padding: 0;
}
.unLogin {
    padding-top: 100px;
    width: 80%;
    margin: 0 auto;
    font-size: 24px;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.toLogin {
    margin: 50px 0;
}
.myCart{
      padding-top: 100px;
  width: 80%;
  margin: 0 auto;
}
.title{
  font-size: 24px;
  color: #fff;
  height: 50px;
  display: block;
  border-bottom: 3px solid #fff;
}
.cartBody {
  width: 100%;
}
.cartBody ul li {
  margin-top: 20px;
  padding: 5px 20px;
  height: 100px;
  font-size: 24px;
  background-color: #576b6faa;
  color: #fff;
  display: flex;
}
.left {
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.price {
  color: #000;
}
.right{
  margin-left: 50px;
  height: 100%;
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.itemCount {
  font-size: 60px;
}
.delete{
  background-color: #0d2d3388;
  height: 100%;
  width: 24px;
  padding-top: 16px;
}
.totalPrice {
  padding-top: 40px;
  margin-top: 40px;
  height: 70px;
  border-top: 2px solid #fff;
}
.totalPrice span{
  font-size: 50px;
}
.sub{
  margin-top: 150px;
  width: 100%;
  font-size: 24px;
  background-color: #ffffff74;
}
</style>