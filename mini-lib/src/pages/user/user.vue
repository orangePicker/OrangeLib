<template>
	<view class="content">
	<view class="avatar_box">
		<up-avatar :src="userAvatarUrl" size="80"></up-avatar>
	</view>
	<up-button @click="goLogin" style="width: 400rpx;" type="primary" text="登录"></up-button>
		<myTabBar></myTabBar>
	</view>
</template>

<script setup>
import { ref } from 'vue';

const userAvatarUrl = ref('')

const goLogin = () => {
	uni.navigateTo({
		url:'/pages/login/login'
	})
}
</script>

<style scoped>
.content{
	display: flex;
	flex-direction: column;
	align-items: center;
}
.avatar_box{
	margin: 0 auto;
	padding: 50rpx 0;
}
</style>