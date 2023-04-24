<template>
    <div class="BG">
        <div class="back">
            <router-link to="/home">返回主页</router-link>
        </div>
        <div class="description">
            <div class="left">
                <img src="https://cdn.staticaly.com/gh/heyfriendis/imgdemo@main/img/新建项目 (3).6zh6vhoog4o0.webp" alt="">
            </div>
            <div class="right">
                <span class="name">梁宏宇</span>
                <span>本项目是我在2023年设计的，技术一般，还有很多自己想添加的功能以及一些新的想法，但这些都将用于下个项目的设计与实现。
                </span>
                <span>本项目的图片素材来源于网络，不用于商业用途，该项目仅用于课程设计使用</span>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {

        };
    },
    methods: {},
    created() {},
    mounted() {},
    }
</script>
<style scoped>
.BG {
  background-color: #5a8289;
  width: 100%;
  height: 100vh;
  padding-top: 70px;
}
.description{
    border-radius: 10px;
    margin: 0 auto;
    width: 60%;
    height: 400px;
    background-color: #356169;
    padding: 10px;
    display: flex;
}
.back{
    font-size: 24px;
    margin-left: 290px;
    margin-bottom: 100px;
}
.left img {
    width: 200px;
    height: auto;
    border-radius: 20px;
}
.right {
    color: #fff;
    font-size: 20px;
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
}
.name {
    margin-bottom: 20px;
}
</style>