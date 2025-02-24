<template>
  <Modal
    :open="open"
    @cancel="changeModal(false)"
    @ok="addUser"
    cancel-text="取消"
    ok-text="添加"
    :title="modalTitle"
    :confirm-loading="loading"
  >
    <Form :model="record" style="margin-top: 30px">
      <FormItem label="账号">
        <Input v-model:value="record.account" placeholder="请输入账号"></Input>
      </FormItem>
      <FormItem label="密码">
        <Input v-model:value="record.password" placeholder="请输入密码"></Input>
      </FormItem>
      <FormItem label="权限">
        <Select style="width: 150px" v-model:value="record.auth">
          <SelectOption :value="0">管理员</SelectOption>
          <SelectOption :value="1">用户</SelectOption>
        </Select>
      </FormItem>
    </Form>
  </Modal>
</template>

<script setup lang="ts">
import {
  Form,
  FormItem,
  Input,
  Select,
  SelectOption,
  message,
} from "ant-design-vue";
import { Modal } from "ant-design-vue";
import { ref, defineEmits } from "vue";
import { addUserApi } from "../api";

// modal显示状态
const open = ref<boolean>(false);

// modal标题
const modalTitle = ref<string>("操作");

const loading = ref<boolean>(false);

// modal数据
const record = ref({
  account: "",
  password: "",
  auth: 0,
});

const emit = defineEmits(["modalClose"]);

// 显示modal
const changeModal = (state: boolean, title?: string) => {
  open.value = state;
  modalTitle.value = title || "";
  record.value = {
    account: "",
    password: "",
    auth: 0,
  };
  if (!state) {
    emit("modalClose");
  }
};

// 添加用户
const addUser = () => {
  loading.value = true;
  addUserApi(record.value).then((res) => {
    if (res.code === 200) {
      message.success("添加成功");
      changeModal(false);
    } else {
      message.info(res.message);
    }
    loading.value = false;
  });
};

defineExpose({
  changeModal,
});
</script>

<style scoped></style>
