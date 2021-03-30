<template>
  <div class="person">
    <router-link
      class="create"
      :class="{ 'font-hovered': 'write' === rName }"
      to="/write"
      >创作中心</router-link
    >
    <router-link to="/login" v-if="!profile">点击登录</router-link>
    <el-dropdown v-else>
      <div class="person-menu">
        <router-link to="/person"
          ><Avatar :src="`/imgs/${profile}`" :size="50"
        /></router-link>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="loginOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script lang="ts">
import { computed, watch, defineComponent, ref } from "vue";
import { whoami, loginOut } from "@/api/user";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import Avatar from "@/components/Avatar";

export default defineComponent({
  name: "Header",
  components: {
    Avatar,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const rNameRef = ref("");
    store.dispatch("loginUser/whoAmI");
    watch(
      () => route.name,
      (name) => {
        rNameRef.value = name;
        console.log(name);
      }
    );
    return {
      username: computed(() => store.state.loginUser.username),
      loginOut,
      rName: rNameRef,
      profile: computed(() => store.state.loginUser.profile),
    };
  },
});
</script>

<style scoped lang="less">
@import "@/styles/var.less";
.person {
  display: flex;
  justify-content: space-evenly;
  width: 200px;
  .create {
    padding: 0 5px;
    .font-hover();
  }
  .person-menu {
    display: flex;
    align-items: center;
    height: 60px;
    line-height: 60px;
    font-size: 20px;
  }
}

.el-dropdown-link {
  display: inline-block;
  width: 80px;
  height: 60px;
  cursor: pointer;
}
</style>