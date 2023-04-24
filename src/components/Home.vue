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
        <li><router-link to="/register">去注册</router-link></li>
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
    <div class="BD">
      <div class="BD_Head">
        <div class="swiper-container" v-if="swiper">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide"
              v-for="(items, index) in swiper"
              :key="index"
            >
              <img :src="items.img" alt="" />
              <span class="name">{{ items.name }}</span>
            </div>
          </div>
        </div>
        <div class="news">
          <div class="shop">
            <div class="New_H">新闻速报</div>
            <ul>
              <li v-for="(item, index) in news" :key="index">
                <a :href="item.newUrl" target="_blank">{{ item.newsName }}</a>
              </li>
            </ul>
          </div>
          <div class="shop_B">
            <div class="cate">
              <router-link to="/contact">关于我们</router-link>
            </div>
            <div class="store">
              <router-link to="/shop">进入商店</router-link>
            </div>
            <div class="myCart">
              <router-link to="/cart">购物车</router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="BD_Body">
        <div class="newItem">
          <span>新品推荐</span>
          <div class="shopList">
            <router-link to="/shop/item?category=1" class="img">
              <img
                src="https://cdn.staticaly.com/gh/heyfriendis/imgdemo@main/img/新建项目.59rxw6cb0ow0.webp"
                alt=""
              />
              <div class="mask"></div>
              <div class="C_name">春夏</div>
            </router-link>
            <router-link to="/shop/item?category=2" class="img">
              <img
                src="https://cdn.staticaly.com/gh/heyfriendis/imgdemo@main/img/新建项目 (1).3lfx9jbo2l40.webp"
                alt=""
              />
              <div class="mask"></div>
              <div class="C_name">秋冬</div>
            </router-link>
            <router-link to="/shop/item?category=3" class="img">
              <img
                src="https://cdn.staticaly.com/gh/heyfriendis/imgdemo@main/img/新建项目 (2).13rz88f7v7k0.webp"
                alt=""
              />
              <div class="mask"></div>
              <div class="C_name">婚礼</div>
            </router-link>
          </div>
        </div>
      </div>
      <div class="BD_footer">
        <div class="Head">帮助</div>
        <div class="about">
          <div class="left">
            <ul>
              <li>
                <router-link to="/shop">商店</router-link>
              </li>
              <li>
                <router-link to="/cart">购物车</router-link>
              </li>
              <li>
                <router-link to="/contact">关于我们</router-link>
              </li>
            </ul>
          </div>
          <div class="right">
            <span>国潮汉服社</span>
            <img
              src="https://cdn.staticaly.com/gh/heyfriendis/imgdemo@main/img/霓裳.5bg05voumw40.webp"
              alt=""
            />
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
import SwiperCore, { Swiper, Autoplay } from "swiper";
SwiperCore.use([Autoplay]);
export default {
  components: {},
  data() {
    return {
      token: "",
      nickname: "",
      swiper: [],
      news: [],
    };
  },
  methods: {
    async getSwiper() {
      const { data: res } = await this.$http.get("/swiper");
      if (res.status === 200) {
        this.swiper = res.data;
        console.log(this.swiper);
      } else {
        alert("网络请求失败");
      }
    },
    async getNews() {
      const { data: res } = await this.$http.get("/news");
      if (res.status === 200) {
        this.news = res.data;
        console.log(this.news);
      } else {
        alert("网络请求失败");
      }
    },
  },
  created() {
    this.token = this.$store.state.token;
    this.nickname = this.$store.state.nickname;
    this.getSwiper();
    this.getNews();
  },
  mounted() {
    new Swiper(".swiper-container", {
      autoplay: {
        disableOnInteraction: false, // 用户操作swiper之后，是否禁止autoplay
        delay: 3000, // 自动切换的时间间隔（单位ms）
      },
      loop: true, // 循环模式选项
    });
  },
};
</script>
<style scoped>
.bigBox {
  background-color: #5a8289;
  width: 100%;
  height: auto;
  margin: 0;
  padding: 0;
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
.BD {
  margin: 0 auto;
  width: 80%;
  /* background-color: #fff; */
  height: 100%;
}
.BD_Head {
  padding-top: 70px;
  display: flex;
  justify-content: space-around;
}
.swiper-container {
  width: 600px;
  overflow: hidden;
  height: auto;
  position: relative;
}
.swiper-slide {
  border-radius: 10px;
  position: relative;
}
.swiper-slide img {
  border-radius: 10px;
  object-fit: cover;
  width: 600px;
  overflow: hidden;
}
.name {
  text-align: center;
  color: #fff;
  position: absolute;
  left: 0;
  bottom: 0;
  height: 60px;
  line-height: 60px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
}
.news {
  border-radius: 10px;
  width: 500px;
  height: auto;
  background-color: rgba(221, 221, 219, 0.3);
  padding: 10px;
  color: #364e52;
}
.shop {
  height: 200px;
  width: 100%;
  border-bottom: 3px solid #364e52;
  /* background-color: pink; */
}
.New_H {
  font-size: 24px;
  font-weight: 700;
  height: 35px;
  border-bottom: 1px solid #fff;
}
.shop ul {
  padding-left: 10px;
}
.shop ul li {
  margin-top: 5px;
  height: 24px;
  line-height: 24px;
}
.shop_B {
  padding-top: 5px;
  display: flex;
}
.cate {
  width: 40%;
  background-color: #cac0b863;
  margin: 5px;
  text-align: center;
  height: 100px;
  border-radius: 30px;
  line-height: 100px;
  font-size: 24px;
}
.store {
  width: 30%;
  background-color: #cac0b863;
  margin: 5px;
  text-align: center;
  height: 100px;
  border-radius: 30px;
  line-height: 100px;
  font-size: 24px;
}
.myCart {
  width: 30%;
  background-color: #cac0b863;
  margin: 5px;
  text-align: center;
  height: 100px;
  border-radius: 30px;
  line-height: 100px;
  font-size: 24px;
}

.BD_Body {
  margin-top: 100px;
  width: 100%;
}
.BD_Body span {
  display: block;
  font-size: 30px;
  font-weight: 700;
  color: #364e52;
  height: 40px;
  line-height: 40px;
  border-bottom: 3px solid #364e52;
}
.shopList {
  display: flex;
  justify-content: space-between;
}
.img {
  border-radius: 10px;
  margin: 10px 5px;
  position: relative;
  width: 30.33%;
}
.img img {
  border-radius: 10px;
  width: 100%;
  height: auto;
}
.img span {
  position: absolute;
  display: block;
  font-size: 30px;
  font-weight: 700;
  color: #364e52;
  height: 40px;
  line-height: 40px;
}
.mask {
  border-radius: 10px;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
}
.C_name {
  font-size: 60px;
  left: 110px;
  top: 70px;
  position: absolute;
  color: #fff;
}
.BD_footer {
  margin-top: 50px;
}
.BD_footer .Head {
  display: block;
  font-size: 30px;
  font-weight: 700;
  color: #364e52;
  height: 40px;
  line-height: 40px;
  border-bottom: 3px solid #364e52;
}
.about {
  display: flex;
  padding-top: 20px;
  justify-content: space-around;
}
.about img {
  height: 100px;
  width: auto;
}
.left ul li {
  margin: 5px 0;
  font-size: 20px;
}
.right {
  display: flex;
  flex-direction: column;
}
.right span {
  font-size: 20px;
  margin-bottom: 5px;
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