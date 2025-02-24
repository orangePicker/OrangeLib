<template>
  <div class="content">
    <p>当前页面不存在</p>
    <span class="btn" @click="() => router.push('/home')">戳我返回首页</span>
  </div>
</template>

<script setup lang="ts">
import router from "../../router";
</script>

<style scoped lang="scss">
.content {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  user-select: none;
  p {
    font-size: 40px;
  }
  .btn {
    font-size: 30px;
  }
  .btn:hover {
    cursor: pointer;
    color: rgb(0, 187, 255);
  }
}
</style>
