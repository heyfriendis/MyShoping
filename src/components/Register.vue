<template >
  <div class="Bg">
    <div class="Img">
      <div class="user_input">
        <img
          src="https://cdn.staticaly.com/gh/heyfriendis/imgdemo@main/img/Register.3z5x1n0yzhk0.webp"
          alt=""
        />
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
          <el-form-item label="确认密码" prop="checkPass">
            <el-input
              type="password"
              v-model="ruleForm.checkPass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >注册</el-button
            >
            <el-button @click="goLogin">去登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
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
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        checkPass: "",
        nickname: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
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
          if (user.data === []) {
            this.$http.post(
              "/user",
              {
                nickname: this.ruleForm.nickname,
                password: this.ruleForm.pass,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            alert("注册成功");
            this.$router.push('/home')
          }else{
            alert("用户名重复")
          }

        } else {
          console.log("注册失败");
          return false;
        }
      });
    },
    goLogin() {
      this.$router.push("/login");
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
  left: 50%;
  top: 30%;
  width: 30%;
}
</style>