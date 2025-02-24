<template>
  <Card>
    <div>
      欢迎回来! <span> {{ userInfo.account }}</span>
    </div>
    <div>
      现在是 <span>{{ time }} </span>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { Card } from "ant-design-vue";
import useStore from "../../store";
import { ref } from "vue";
import dayjs from "dayjs";
const userInfo = ref(useStore().useUser.userInfo);
const time = dayjs().format(`YYYY年MM月DD日 HH时mm分`);
</script>

<style scoped>
div {
  font-size: 20px;
}
span {
  font-weight: 600;
}
</style>
