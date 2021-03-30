<template>
  <div class="login-wrap">
    <div class="form-item">
      <label>用户名</label>
      <input type="text" v-model="username" />
    </div>
    <div class="form-item">
      <label>密码：</label>
      <input type="password" v-model="password" />
    </div>
    <div class="form-item" v-if="!isLogin">
      <label>重复密码</label>
      <input type="password" v-model="rePassword" />
    </div>
    <div class="form-item" v-if="isLogin">
      <label></label>
      <button :disabled="loading" @click="handleSubmit">
        {{ loading ? "loading..." : "登录" }}
      </button>
    </div>
    <div class="form-item">
      <!-- <div class="register-btn"> -->
      <div class="back-login" v-if="!isLogin">
        <label></label>
        <button @click="isLogin = true">返回登录</button>
      </div>

      <label></label>
      <button @click="register">
        {{ isLogin ? "还没账号？点击注册" : "点击注册" }}
      </button>
      <!-- </div> -->
    </div>
  </div>
</template>
<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import * as userServ from "@/api/user";
import { Message } from "@/utils/message";


export default {
  setup(p, ctx) {
    const username = ref("");
    const password = ref("");
    const rePassword = ref("");
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const handleSubmit = async () => {
      const user = await store.dispatch("loginUser/login", {
        username: username.value.trim(),
        password: password.value.trim(),
      });
      if (user) {
        router.push("/person"); // 登录成功
      } else {
        Message('warning', "账号/密码错误");
      }
    };
    let isLogin = ref(true)
    const register = async () => {
      if (!isLogin.value) {
        console.log('注册');
        if (username.value.trim().length < 4 || username.value.trim().length > 20) {
          Message('warning', "用户名至少4位，最多20位");
          return;
        }
        if (password.value.trim() && password.value !== rePassword.value) {
          Message('warning', "密码不一致");
          return
        } else if (password.value.trim().length < 8 || password.value.trim().length > 16) {
          Message('warning', "密码至少8位，最多16位");
          return
        }
        const res = await userServ.register(username.value.trim(), password.value.trim())
        console.log(res);
        if (res) {
          Message('success', '注册成功，正在登录...')
          handleSubmit()
        }
      } else {
        username.value = ''
        password.value = ''
        isLogin.value = false
      }
    }
    return {
      username,
      password,
      handleSubmit,
      loading: computed(() => store.state.loginUser.loading),
      isLogin,
      rePassword,
      register
    };
  },
};
</script>
<style scoped lang="less">
.form-item {
  margin: 1em auto;
  width: 300px;
  display: flex;
  align-items: center;
  input {
    height: 26px;
    font-size: 14px;
    flex: 1 1 auto;
  }
  label {
    width: 70px;
  }
  button {
    flex: 1 1 auto;
    background: #50936c;
    border: none;
    outline: none;
    color: #fff;
    border-radius: 5px;
    height: 35px;
    font-size: 16px;
  }
}
</style>
