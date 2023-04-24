<template>
  <div class="bigBox">
    <div class="nav" v-if="!token">
      <span>国潮汉服社 欢迎</span>
      <ul>
        <li><span class="lo">您还未登录</span></li>
        <li>
          <router-link to="/login">去登陆</router-link>
        </li>
        <span>|</span>
        <li><router-link to="/login">去注册</router-link></li>
      </ul>
    </div>
    <div class="nav" v-else-if="token && nickname">
      <span>国潮汉服社 欢迎</span>
      <ul>
        <li><span class="lo">亲爱的</span></li>
        <li>
          <router-link to="/cart">{{ nickname }}</router-link>
        </li>
      </ul>
    </div>
    <div class="BD" ref="BD">
      <div class="back">
        <router-link to="/home">返回主页</router-link>
      </div>

      <div class="shopDetail">
        <div class="left">
          <div class="show" @mouseleave="notShow" @mousemove="move" ref="show">
            <span>
              <img :src="bigImg ? bigImg : imgUrl[0]" alt="" />
            </span>
            <div class="markItem" ref="marks">
              <div class="mark" ref="mark"></div>
              <div class="bigImgShow">
                <img :src="bigImg ? bigImg : imgUrl[0]" alt="" ref="bigMark" />
              </div>
            </div>
          </div>
          <div class="showLittle">
            <ul>
              <li
                v-for="(item, index) in imgUrl"
                :key="index"
                @click="updateImg(item)"
              >
                <img :src="item" alt="" />
              </li>
            </ul>
          </div>
        </div>
        <div class="right">
          <div class="des">
            <div class="name">{{ shopList.itemName }}</div>
            <div class="tag">分类:{{ shopList.description }}</div>
            <div class="count">剩余:{{ shopList.count }}</div>
            <div class="address">商家地址:{{ shopList.address }}</div>
          </div>
          <div class="addCart">
            <div class="countBtn">
              <el-button type="info" @click="loseCount">-</el-button>
              <div class="buyCount">{{ count }}</div>
              <el-button type="info" @click="addCount">+</el-button>
            </div>
          </div>

          <div class="submit" v-if="token">
            <router-link
              :to="{ path: '/cart', query: { id: shopList.id, count: count } }"
            >
              <el-button>我的购物车</el-button>
            </router-link>
            <el-button @click="addCartList">加入购物车</el-button>
          </div>
          <div class="notToken" v-else-if="!token">
            <router-link to="/login">
              <span>登录后可加入购物车</span>
            </router-link>
          </div>
        </div>
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
      id: "",
      shopList: [],
      imgUrl: [],
      bigImg: "",
      count: 1,
      token: "",
      nickname: "",
    };
  },
  methods: {
    async getShopList() {
      const { data: res } = await this.$http.get(`/item/detail?id=${this.id}`);
      if (res.code === 200) {
        this.shopList = res.data[0];
        this.imgUrl = res.data[0].itemImg.split(",");
      }
      console.log(this.shopList);
    },
    notShow() {
      this.$refs.marks.style.display = "none";
    },
    move(e) {
      var left = e.offsetX - 100;
      var top = e.offsetY - 100;
      if (left <= 0) {
        left = 0;
      } else if (left >= 200) {
        left = 200;
      } else {
        this.$refs.mark.style.left = left + "px";
      }
      if (top < 0) {
        top = 0;
      } else if (top > 300) {
        top = 300;
      } else {
        this.$refs.mark.style.top = top + "px";
      }
      this.$refs.marks.style.display = "block";
      this.$refs.bigMark.style.marginLeft = -2 * left + "px";
      this.$refs.bigMark.style.marginTop = -2 * top + "px";
    },
    updateImg(url) {
      this.bigImg = url;
    },
    loseCount() {
      this.count--;
      if (this.count <= 1) {
        this.count = 1;
      }
    },
    addCount() {
      this.count++;
    },
    addCartList() {
      this.$store.dispatch("getCartList", { shopList:this.shopList, count: this.count });
    },
  },
  created() {
    this.token = this.$store.state.token;
    this.nickname = this.$store.state.nickname;
    this.id = Number(this.$route.query.id);
    this.getShopList();
  },
  mounted() {},
};
</script>
<style scoped>
.bigBox {
  background-color: #5a8289;
  width: 100%;
  height: auto;
  padding-top: 50px;
}
.lo {
  margin-right: 10px;
}
.nav {
  position: fixed;
  top: 0;
  height: 30px;
  width: 100%;
  background-color: #d5dddf;
  line-height: 30px;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  z-index: 999;
}
.nav ul {
  display: flex;
}
.back {
  font-size: 24px;
  margin-bottom: 100px;
}
.BD {
  margin-left: 200px;
  width: 80%;
  /* background-color: #fff; */
  height: 100%;
}
.shopDetail {
  display: flex;
  padding-bottom: 30px;
}
.show {
  position: relative;
  width: 400px;
  height: 500px;
  /* overflow: hidden; */
}
.show img {
  border-radius: 10px;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.markItem {
  display: none;
}
.mark {
  position: absolute;
  height: 200px;
  width: 200px;
  display: none;
  background-color: rgba(0, 0, 0, 0.6);
}
.bigImgShow {
  border-radius: 10px;
  position: absolute;
  width: 400px;
  height: 400px;
  background-color: #fff;
  left: 410px;
  top: 0;
  overflow: hidden;
}
.bigImgShow img {
  border-radius: 10px;
  width: 800px;
  height: 1000px;
}
.showLittle {
  margin-top: 10px;
  width: 400px;
  height: 100px;
  background-color: #fff;
}
.showLittle ul {
  width: 400px;
  height: 100px;
  display: flex;
  overflow-y: hidden;
}
.showLittle ul li {
  padding: 0 5px;
}
.showLittle ul li img {
  border-radius: 10px;
  width: 100px;
}
.showLittle ul li :active {
  border: 1px solid #000;
}
.right {
  width: 500px;
  display: flex;
  flex-direction: column;
  margin-left: 100px;
  color: #fff;
  height: 500px;
  justify-content: space-between;
}
.des {
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  height: 300px;
  justify-content: space-between;
  background-color: #364e52;
  border-radius: 10px;
}
.name {
  font-size: 30px;
  font-family: serif;
}
.tag {
  margin-left: 20px;
  font-size: 24px;
}
.count {
  margin-left: 20px;
  font-size: 24px;
}
.address {
  margin-left: 20px;
  font-size: 24px;
}
.countBtn {
  display: flex;
  border-radius: 10px;
  font-size: 50px;
}
.buyCount {
  text-align: center;
  width: 100px;
  font-size: 50px;
  background-color: #293e42;
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