import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { userInfoType } from "../../types";
import { myHttp } from "../../utils/interceptors";
import { message } from "ant-design-vue";

export const useUserState = defineStore(
  "userState",
  () => {
    // 路由
    const router = useRouter();

    // token
    const token = ref<string>("");

    // 用户信息
    const userInfo = ref<userInfoType>({
      id: 0,
      account: "",
      username: "",
      email: "",
      auth: 0,
    });

    // 清除登录信息
    const clearUser = () => {
      token.value = "";
      userInfo.value = {
        id: 0,
        account: "",
        username: "",
        auth: 0,
      };
      router.push("/login");
    };

    // 更新用户信息
    const queryUserInfo = () => {
      myHttp<userInfoType>("user/queryUser").then((res) => {
        if (res.code !== 200) return message.warning("用户信息更新失败");
        userInfo.value = res.data;
        message.success("用户信息已更新");
      });
    };

    return {
      token,
      userInfo,
      clearUser,
      queryUserInfo,
    };
  },
  { persist: true }
);
