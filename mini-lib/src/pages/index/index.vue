<template>
	<view class="content">
		this index
		<myTabBar></myTabBar>
	</view>
</template>
<script setup>
	import {
		onLoad,
		onReady
	} from '@dcloudio/uni-app';

	onLoad(() => {
		console.log('onLoad')
	})
	onReady(() => {
		console.log('onReady')
	})
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>