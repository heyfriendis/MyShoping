<template>
  <div class="Bg">
    <div class="Img">
      <img
        src="https://cdn.staticaly.com/gh/heyfriendis/imgdemo@main/img/Login.48jcqvopo8a0.webp"
        alt=""
      />
      <div class="user_input">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="昵称" prop="nickname">
            <el-input
              type="text"
              v-model="ruleForm.nickname"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input
              type="password"
              v-model="ruleForm.pass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >登录</el-button
            >
            <el-button @click="goReg">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store/index"
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    return {
      ruleForm: {
        nickname: "",
        pass: "",
        checkPass: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const { data: user } = await this.$http.get(
            `/user/login?nickname=${this.ruleForm.nickname}`
          );
        //   console.log(user);
          if (user.code === 200) {
            if (user.data[0].password === this.ruleForm.pass) {
                store.dispatch("userLogin",{nickname:this.ruleForm.nickname,token:user.token})
              this.$router.push("/home");
            } else {
              alert("密码错误！");
            }
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    goReg() {
      this.$router.push("/register");
    },
  },
  created() {},
  mounted() {},
};
</script>
<style scoped>
.Bg {
  min-width: 895px;
  position: relative;
  width: 100%;
  height: 100%;
}
.Img img {
  max-width: 100%;
  height: auto;
  width: auto;
  position: fixed;
}
.user_input {
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  position: relative;
}
.el-form {
  position: absolute;
  left: 15%;
  top: 30%;
  width: 30%;
}
</style>