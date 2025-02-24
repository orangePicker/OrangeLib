<template>
  <div class="login">
    <div class="content">
      <div class="left">
        <span>Vue</span>
        <span>+</span>
        <span>NodeJs</span>
      </div>
      <div class="right">
        <Form
          @finish="formSubmit"
          name="loginForm"
          ref="formRef"
          :model="formData"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 16 }"
          :rules="iRules"
        >
          <FormItem label="用户名:" name="account">
            <Input
              :maxlength="12"
              v-model:value="formData.account"
              placeholder="请输入用户名"
            ></Input>
          </FormItem>
          <FormItem label="密码:" name="password">
            <InputPassword
              :maxlength="16"
              v-model:value="formData.password"
              placeholder="请输入密码"
            ></InputPassword>
          </FormItem>
          <FormItem v-if="!isLogin" label="确认密码:" name="enterPassword">
            <InputPassword
              :maxlength="16"
              v-model:value="formData.enterPassword"
              placeholder="请再次输入密码"
            ></InputPassword>
          </FormItem>
          <FormItem :wrapper-col="{ offset: 6 }" name="code">
            <Input
              :maxlength="4"
              style="width: 100px"
              v-model:value="formData.code"
              placeholder="验证码"
            ></Input>
            <img class="passCode" @click="reCode" :src="codeSrc" />
          </FormItem>
          <FormItem :wrapper-col="{ offset: 8 }">
            <Button
              :loading="loginLoading"
              type="primary"
              html-type="submit"
              style="width: 250px"
              >{{ isLogin ? "登录" : "注册" }}</Button
            >
            <Button type="link" @click="isLogin = !isLogin">{{
              !isLogin ? "登录" : "注册"
            }}</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Form,
  FormItem,
  Input,
  Button,
  InputPassword,
  message,
} from "ant-design-vue";
import { reactive, ref, watch } from "vue";
import { myHttp } from "../../utils/interceptors";
import router from "../../router";
import { Rule } from "ant-design-vue/es/form";
import useStore from "../../store";
import { userInfoType } from "../../types";

// 获取验证码
const defUrl = `${import.meta.env.VITE_BASEURL}util/getCode?t=`;
const codeSrc = ref<string>(defUrl + new Date().getTime());

// 重新获取验证码
const reCode = () => {
  formData.code = "";
  codeSrc.value = defUrl + new Date().getTime();
};

// 表单对象
const formData = reactive({
  account: "",
  password: "",
  enterPassword: "",
  code: "",
});

// 表单验证
const iRules: Record<string, Rule[]> = {
  account: [
    { required: true, message: "请输入用户名!" },
    { min: 4, message: "最少需要4个字符" },
  ],
  password: [
    { required: true, message: "请输入密码!" },
    { max: 16, min: 6, message: "密码需要6-16位" },
  ],
  enterPassword: [{ required: true, message: "请再次输入密码!" }],
  code: [{ required: true, message: "请输入验证码!" }],
};

// 表单状态
const isLogin = ref<boolean>(true);
const formRef = ref();
// 切换表单初始化
watch(isLogin, () => {
  reCode();
  formRef.value.resetFields();
});

const loginLoading = ref<boolean>(false);
// 提交
const formSubmit = async (values: any) => {
  loginLoading.value = true;
  if (isLogin.value) {
    try {
      const res = await myHttp<{ userInfo: userInfoType; token: string }>(
        "user/login",
        values,
        {withCredentials: true}
      );
      loginLoading.value = false;
      if (res.code === 200) {
        useStore().useUser.token = res.data.token || "";
        useStore().useUser.userInfo = res.data.userInfo;
        router.push("/home");
        return message.success(res.message);
      }
      reCode();
      message.warning(res.message);
    } catch (error) {
      loginLoading.value = false;
      console.error(error);
    }
  } else {
    try {
      if (formData.password !== formData.enterPassword) {
        return message.warning("两次密码输入不一致");
      }
      const res = await myHttp("user/register", values,{withCredentials: true});
      loginLoading.value = false;
      if (res.code === 200) {
        isLogin.value = true;
        return message.success(res.message);
      }
      reCode();
      message.warning(res.message);
    } catch (error) {
      loginLoading.value = false;
      console.error(error);
    }
  }
};
</script>

<style scoped lang="scss">
.passCode {
  width: 120px;
  height: 50px;
  margin-left: 20px;
  user-select: none;
  cursor: pointer;
}
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #001b4a;
  .content {
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    width: 800px;
    padding: 40px 0;
    border-radius: 15px;
    background-color: #fff;
    transition: all 0.3s;
    .left {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      padding: 0 30px;
      font-size: 40px;
      font-weight: bold;
      user-select: none;
    }
    .right {
      flex: 1;
    }
  }
}
</style>
