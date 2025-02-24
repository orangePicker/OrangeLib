import { Key } from "ant-design-vue/es/_util/type";
import { defineStore } from "pinia";
import { ref } from "vue";

interface configType {
  menuKeys: string[];
  openKeys: Key[];
}

export const useConfState = defineStore(
  "confState",
  () => {
    const config = ref<configType>({
      // 菜单key
      menuKeys: ["sub1"],
      // 展开列表key
      openKeys: [],
    });

    return {
      config,
    };
  },
  {
    persist: true,
  }
);
