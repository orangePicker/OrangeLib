<template>
  <Drawer
    :width="500"
    title="我的信息"
    placement="bottom"
    :open="openState"
    @close="changeOpenState(false)"
  >
    <div class="myInfo-content">
      <div class="left">
        <Form layout="horizontal" :model="formData" @finish="formSubmit">
          <Row>
            <Col :xl="10"
              ><FormItem label="账号">
                <span>{{ formData.account }}</span>
              </FormItem>
            </Col>
            <Col :xl="10" offset="1">
              <FormItem label="权限">
                <span>{{ formData.auth === 0 ? "用户" : "管理员" }}</span>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col :xl="10">
              <FormItem label="姓名" name="username">
                <Input
                  :disabled="!editState"
                  v-model:value="formData.username"
                ></Input>
              </FormItem>
            </Col>
            <Col :xl="10" offset="1">
              <FormItem label="邮箱" name="email">
                <Input
                  :disabled="!editState"
                  v-model:value="formData.email"
                ></Input>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
    <template #extra>
      <Space>
        <Button v-if="editState" style="width: 100px" @click="cancelEdit"
          >取消</Button
        >
        <Button type="primary" style="width: 100px" @click="formSubmit">{{
          editState ? "确定" : "编辑"
        }}</Button>
      </Space>
    </template>
  </Drawer>
</template>

<script setup lang="ts">
import {
  Drawer,
  Form,
  FormItem,
  Input,
  Row,
  Col,
  Button,
  Space,
  message,
} from "ant-design-vue";
import { ref } from "vue";
import { userInfoType } from "../../types";
import useStore from "../../store";
import { myHttp } from "../../utils/interceptors";

const useUserStore = useStore().useUser;

// 抽屉状态
const openState = ref<boolean>(false);

const changeOpenState = (state: boolean) => {
  openState.value = state;
};
defineExpose({ changeOpenState });

// 编辑
const editState = ref<boolean>(false);

const cancelEdit = () => {
  editState.value = false;
  formData.value = useUserStore.userInfo;
};

// 表单
const formData = ref<userInfoType>({
  id: 0,
  account: "",
  username: "",
  email: "",
  auth: 0,
});
formData.value = useUserStore.userInfo;

// 提交
const formSubmit = async () => {
  editState.value = !editState.value;
  if (editState.value) return false;
  const res = await myHttp("user/updateUser", formData.value);
  useUserStore.queryUserInfo();
  if (res.code !== 200) {
    message.info(res.message);
  }
};
</script>

<style scoped lang="scss">
.myInfo-content {
  width: 100%;
  height: 100%;
  .left {
    width: 50%;
    height: 100%;
  }
}
</style>
