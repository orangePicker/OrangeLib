<template>
  <div>
    <Card>
      <Form
        layout="inline"
        :wrapperCol="{ span: 18 }"
        :model="formData"
        style="margin-bottom: 20px"
      >
        <FormItem label="书名">
          <Input
            v-model:value="formData.bookTitle"
            placeholder="请输入书名"
          ></Input>
        </FormItem>
        <FormItem label="作者">
          <Input
            v-model:value="formData.author"
            placeholder="请输入作者"
          ></Input>
        </FormItem>
        <FormItem label="状态">
          <Select style="width: 150px" v-model:value="formData.lendState">
            <SelectOption value="">全部</SelectOption>
            <SelectOption :value="0">闲置</SelectOption>
            <SelectOption :value="1">借出</SelectOption>
          </Select>
        </FormItem>
        <Button type="primary" @click="queryBook">查询</Button>
        <Button type="default" style="margin-left: 15px" @click="reSet"
          >重置</Button
        >
      </Form>
      <Button type="primary" :icon="h(PlusOutlined)" @click="addBook"
        >新增</Button
      >
    </Card>
    <Card>
      <Table
        :columns="columns"
        :dataSource="TableData"
        :pagination="ipagination"
      >
        <template #bodyCell="{ column, record }">
          <div v-if="column.dataIndex === 'option'">
            <Space>
              <Button type="primary" @click="editBook(record)">编辑</Button>
              <Popconfirm
                title="确定要删除这本书吗?"
                ok-text="确定"
                cancel-text="取消"
                @confirm="deleteBook(record)"
              >
                <Button>删除</Button>
              </Popconfirm>
            </Space>
          </div>
        </template>
      </Table>
    </Card>
    <editModal @modalClose="queryBook" ref="editModalRef"></editModal>
  </div>
</template>

<script setup lang="ts">
import {
  Card,
  Table,
  Form,
  FormItem,
  Input,
  Select,
  SelectOption,
  Button,
  message,
  Space,
  Popconfirm,
} from "ant-design-vue";
import { ColumnType, TablePaginationConfig } from "ant-design-vue/es/table";
import { ref, h } from "vue";
import { PlusOutlined } from "@ant-design/icons-vue";
import editModal from "./module/editModal.vue";
import { deleteBookApi, queryBookApi } from "./api";

const editModalRef = ref();

// 表头
const columns = ref<ColumnType[]>([
  {
    title: "序号",
    align: "center",
    width: 100,
    customRender: (opt) => {
      return opt.index + 1;
    },
  },
  {
    title: "书名",
    align: "center",
    dataIndex: "bookTitle",
  },
  {
    title: "作者",
    align: "center",
    dataIndex: "author",
  },
  {
    title: "出借状态",
    align: "center",
    dataIndex: "lendState",
    customRender: (opt) => {
      return opt.text === 0 ? "闲置" : "借出";
    },
  },
  {
    title: "操作",
    align: "center",
    dataIndex: "option",
  },
]);

// 数据
const TableData = ref<any>();

// 分页
const ipagination = ref<TablePaginationConfig>({
  showTotal: (total) => `共${total}条`,
  pageSize: 7,
});

// 表单
const formData = ref({
  bookTitle: "",
  author: "",
  lendState: "",
});

// 查询
const queryBook = async () => {
  const res = await queryBookApi(formData.value);
  if (res.code === 200) {
    TableData.value = res.data.books;
    ipagination.value.total = res.data.total;
    message.success('查询成功')
  } else {
    message.info(res.message);
  }
};
queryBook();

// 重置
const reSet = () => {
  formData.value = {
    bookTitle: "",
    author: "",
    lendState: "",
  };
  queryBook();
};

// 添加书本
const addBook = () => {
  editModalRef.value.changeModal(true, "添加书籍");
};

// 编辑书本
const editBook = (data: any) => {
  editModalRef.value.changeModal(true, "编辑书籍", data);
};

// 删除书本
const deleteBook = async (data: any) => {
  const res = await deleteBookApi(data);
  if (res.code === 200) {
    message.success("删除成功");
  } else {
    message.info(res.message);
  }
  queryBook();
};
</script>

<style scoped></style>
