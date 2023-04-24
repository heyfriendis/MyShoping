<template>
  <div class="BG">
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
    <div class="back">
      <i class="el-icon-back"></i>
      <router-link to="/home">返回主页</router-link>
    </div>
    <div class="BD">
      <div class="search">
        <i class="el-icon-s-promotion"></i>
        <input type="text" placeholder="查找商品" v-model="searchWord" @keydown.enter="toSearch"/>
      </div>
      <div class="shopNav">
        <span class="cate_H">商品分类</span>
        <ul @click="addActive($event)">
          <li>
            <router-link to="/shop/items" class="active">全部</router-link>
          </li>
          <li><router-link to="/shop/item?category=1">春夏</router-link></li>
          <li><router-link to="/shop/item?category=2">秋冬</router-link></li>
          <li><router-link to="/shop/item?category=3">婚礼</router-link></li>
        </ul>
      </div>
    </div>
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
export default {
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      token: "",
      nickname: "",
      isRouterAlive: true,
      searchWord:"",
    };
  },
  methods: {
    addActive(e) {
      for (let i = 0; i < e.currentTarget.children.length; i++) {
        const element = e.currentTarget.children[i];
        element.children[0].classList.remove("active");
      }
      e.target.classList.add("active");
      this.reload()
    },
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
    async toSearch(){
      this.$router.push(`/shop/search?searchWord=${this.searchWord}`)
      this.reload()
    }
  },
  created() {
    this.token = this.$store.state.token;
    this.nickname = this.$store.state.nickname;
  },
  mounted() {},
};
</script>
<style scoped>
.BG {
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
  margin-left: 20px;
  font-size: 20px;
}
.BD {
  margin: 0 auto;
  width: 80%;
  /* background-color: #fff; */
  height: 100%;
  padding-top: 50px;
}
.search {
  margin-top: 30px;
  width: 60%;
  border-bottom: 1px solid #000;
  padding: 0 10px;
  height: 50px;
  border-radius: 10px;
  font-size: 24px;
  margin: 0 auto;
}
.search i {
  margin-right: 5px;
}
.search input {
  color: #fff;
  border: 0;
  -web-kit-appearance: none;
  -moz-appearance: none;
  outline: 0;
  height: 50px;
  font-size: 24px;
  background-color: transparent;
}
.search input::-webkit-input-placeholder {
  color: #ffffff6a;
}
.cate_H {
  display: block;
  width: 100%;
  font-size: 24px;
  height: 30px;
  border-bottom: 2px solid #364e52;
}
.shopNav {
  margin-top: 30px;
  padding-bottom: 30px;
}
.shopNav ul {
  display: flex;
  margin-top: 10px;
}
.shopNav ul li {
  font-size: 20px;
  line-height: 30px;
  height: 30px;
  width: auto;
  padding: 0 10px;
}
.active {
  background-color: #364e5291;
  border-radius: 10px;
}
</style>