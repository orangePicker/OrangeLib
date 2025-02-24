<template>
  <Modal
    :open="open"
    @cancel="changeModal(false)"
    @ok="addBook"
    cancel-text="取消"
    ok-text="确定"
    :title="modalTitle"
    :confirm-loading="loading"
  >
    <Form :model="record" style="margin-top: 30px">
      <FormItem label="书名">
        <Input
          v-model:value="record.bookTitle"
          placeholder="请输入书名"
        ></Input>
      </FormItem>
      <FormItem label="作者">
        <Input v-model:value="record.author" placeholder="请输入作者"></Input>
      </FormItem>
      <FormItem v-if="modalTitle === '编辑书籍'" label="状态">
        <Select style="width: 150px" v-model:value="record.lendState">
          <SelectOption :value="0">闲置</SelectOption>
          <SelectOption :value="1">借出</SelectOption>
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
import { addBookApi, editBookApi } from "../api.ts";

// modal显示状态
const open = ref<boolean>(false);

// modal标题
const modalTitle = ref<string>("操作");

const loading = ref<boolean>(false);

// modal数据
const record = ref({
  bookTitle: "",
  author: "",
  lendState: 0,
});

const emit = defineEmits(["modalClose"]);

// 显示modal
const changeModal = (state: boolean, title?: string, data?: any) => {
  open.value = state;
  modalTitle.value = title || "";
  if (data) {
    record.value = Object.assign({}, data);
  } else {
    record.value = {
      bookTitle: "",
      author: "",
      lendState: 0,
    };
  }
  if (!state) {
    emit("modalClose");
  }
};

// 添加书籍 | 编辑书籍
const addBook = async () => {
  loading.value = true;
  if (modalTitle.value === "添加书籍") {
    const res = await addBookApi(record.value);
    if (res.code === 200) {
      message.success("添加成功");
    } else {
      message.info(res.message);
    }
    loading.value = false;
  } else {
    const res = await editBookApi(record.value);
    if (res.code === 200) {
      message.success("修改成功");
    } else {
      message.info(res.message);
    }
    loading.value = false;
  }
  changeModal(false);
};

defineExpose({
  changeModal,
});
</script>

<style scoped></style>
