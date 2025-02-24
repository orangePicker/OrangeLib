import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";
import layout from "../views/layout/index.vue";
import errPage from "../views/404page/index.vue";
import login from "../views/login/index.vue";
import useStore from "../store";
import { message } from "ant-design-vue";
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/home",
    component: layout,
    children: [
      {
        path: "home",
        name: "home",
        component: () => import("../views/home/index.vue"),
      },
      {
        path: "bookConf",
        name: "bookConf",
        component: () => import("../views/bookConf/BookConf.vue"),
      },
      {
        path: "userConf",
        name: "userConf",
        component: () => import("../views/userConf/userConf.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: login,
  },
  {
    path: "/404",
    name: "404",
    component: errPage,
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 导航守卫
router.beforeEach((to, from, next) => {
  console.log(`触发守卫: to:${to.path} ~ from:${from.path}`);
  const whiteList = ["/login", "/404"];

  if (!useStore().useUser.token) {
    // 无token
    console.log("无token");

    if (!whiteList.includes(to.path)) {
      // 不在白名单
      message.warning("token失效或已过期");
      router.push("/login");
    } else {
      // 白名单内
      console.log("无token, 前往白名单path");

      next();
    }
  } else if (to.path === "/login") {
    // 有token 前往登录页
    router.push("/");
  } else {
    // 通行
    next();
  }
});

router.onError((err) => {
  console.log(err);
});
export default router;
