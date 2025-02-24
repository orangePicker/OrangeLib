<template>
  <div>
    <Card>
      <Form
        layout="inline"
        :wrapperCol="{ span: 18 }"
        :model="formData"
        style="margin-bottom: 20px"
      >
        <FormItem label="账号">
          <Input
            v-model:value="formData.account"
            placeholder="请输入账号"
          ></Input>
        </FormItem>
        <FormItem label="用户名">
          <Input
            v-model:value="formData.username"
            placeholder="请输入用户名"
          ></Input>
        </FormItem>
        <FormItem label="权限">
          <Select style="width: 150px" v-model:value="formData.auth">
            <SelectOption value="">全部</SelectOption>
            <SelectOption :value="0">管理员</SelectOption>
            <SelectOption :value="1">用户</SelectOption>
          </Select>
        </FormItem>
        <Button type="primary" @click="queryUsers">查询</Button>
        <Button type="default" style="margin-left: 15px" @click="reSet"
          >重置</Button
        >
      </Form>
      <Button type="primary" :icon="h(PlusOutlined)" @click="addUser"
        >添加用户</Button
      >
    </Card>
    <Card>
      <Table
        :columns="columns"
        :dataSource="TableData"
        :pagination="ipagination"
      >
        <template #bodyCell="{ column, record }">
          <div v-if="column.dataIndex === 'option' && record.auth !== -1">
            <Space>
              <Popconfirm
                :title="`确定要${
                  record.status === 0 ? '封禁' : '解封'
                }这个用户吗?`"
                ok-text="确定"
                cancel-text="取消"
                @confirm="banUser(record)"
              >
                <Button>{{ record.status === 0 ? "封禁" : "解封" }}</Button>
              </Popconfirm>
            </Space>
          </div>
        </template>
      </Table>
    </Card>
    <addUserModal ref="addUserModalRef" @modalClose="queryUsers"></addUserModal>
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
import addUserModal from "./module/addUserModal.vue";
import { banUserApi, queryUsersApi } from "./api.ts";

const addUserModalRef = ref();

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
    title: "用户id",
    align: "center",
    dataIndex: "id",
  },
  {
    title: "账号",
    align: "center",
    dataIndex: "account",
  },
  {
    title: "用户名",
    align: "center",
    dataIndex: "username",
  },
  {
    title: "邮箱",
    align: "center",
    dataIndex: "email",
  },
  {
    title: "权限",
    align: "center",
    dataIndex: "auth",
    customRender: ({ text }) => {
      return text === -1 ? "超级管理员" : text === 0 ? "管理员" : "用户";
    },
  },
  {
    title: "邮箱",
    align: "center",
    dataIndex: "status",
    customRender: ({ text }) => {
      return text === 0 ? "正常" : "禁用";
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
  account: "",
  username: "",
  auth: "",
});

// 查询
const queryUsers = () => {
  queryUsersApi(formData.value).then((res) => {
    if (res.code === 200) {
      TableData.value = res.data.users;
      ipagination.value.total = res.data.total;
    } else {
      message.info("查询失败");
    }
  });
};

queryUsers();

// 重置
const reSet = () => {
  formData.value = {
    account: "",
    username: "",
    auth: "",
  };
  queryUsers();
};

const addUser = () => {
  addUserModalRef.value.changeModal(true);
};

// 封禁用户
const banUser = (record: any) => {
  const status = record.status === 0 ? 1 : 0;
  banUserApi({ id: record.id, status }).then((res) => {
    if (res.code === 200) {
      message.success("操作成功");
    } else {
      message.success("操作失败");
    }
    queryUsers();
  });
};
</script>

<style scoped></style>
