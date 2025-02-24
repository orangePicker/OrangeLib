<template>
  <Layout>
    <LayoutSider theme="light"
      ><Menu
        :items="muneList"
        :selectedKeys="selectKey"
        :openKeys="openKey"
        mode="inline"
        @select="selectMenu"
        @openChange="openMenu"
        style="height: 100vh"
      ></Menu
    ></LayoutSider>
    <Layout>
      <LayoutHeader style="background-color: #fff"
        ><h2 style="user-select: none">橘子图书 OrangeLibrary</h2></LayoutHeader
      >
      <LayoutContent style="padding: 10px; overflow-y: auto; max-height: 820px"
        ><RouterView
      /></LayoutContent>
      <LayoutFooter style="background-color: #fff"
        ><Button type="primary" @click="openMyInfo" style="margin-right: 20px"
          >我的信息</Button
        ><Button type="primary" @click="exit">登出</Button></LayoutFooter
      >
    </Layout>
    <myInfo ref="myInfoRef" />
  </Layout>
</template>

<script setup lang="ts">
import {
  BookOutlined,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons-vue";
import {
  Layout,
  LayoutHeader,
  LayoutContent,
  LayoutSider,
  LayoutFooter,
  Menu,
  Button,
} from "ant-design-vue";
import { Key } from "ant-design-vue/es/_util/type";
import { VNode, h, nextTick, ref } from "vue";
import { useRouter } from "vue-router";
import useStore from "../../store/index";
import myInfo from "../../components/myInfo/myInfo.vue";

const myInfoRef = ref();
const openMyInfo = () => {
  nextTick(() => {
    myInfoRef.value.changeOpenState(true);
  });
};

//store
const store = useStore();
// 路由
const router = useRouter();

// 菜单类型
interface ItemType {
  key: string;
  icon?: VNode;
  label: string;
  path?: string;
  children?: ItemType | ItemType[];
}

// 菜单列表
const muneList = ref<ItemType[]>([
  {
    key: "sub1",
    icon: h(HomeOutlined),
    label: "首页",
    path: "/home",
  },
  {
    key: "sub2",
    icon: h(BookOutlined),
    label: "图书管理",
    children: [
      {
        key: "2-1",
        // icon: h(HomeOutlined),
        label: "图书管理",
        path: "/bookConf",
      },
    ],
  },
  {
    key: "sub3",
    icon: h(UserOutlined),
    label: "用户管理",
    children: [
      {
        key: "3-1",
        // icon: h(HomeOutlined),
        label: "用户管理",
        path: "/userConf",
      },
    ],
  },
]);

// 选中菜单
const selectKey = ref<string[]>(store.useConfig.config.menuKeys);

const selectMenu = (e: any) => {
  store.useConfig.config.menuKeys = e.keyPath;
  router.push(e.item.path);
  selectKey.value = e.keyPath;
};

// 展开菜单
const openKey = ref<Key[]>(store.useConfig.config.openKeys);

const openMenu = (e: Key[]) => {
  openKey.value = [e[e.length - 1]];
  store.useConfig.config.openKeys = openKey.value;
};

// 登出
const exit = () => {
  store.useUser.clearUser();
};
</script>

<style scoped lang="scss"></style>
