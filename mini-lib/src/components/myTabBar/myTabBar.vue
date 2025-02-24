<template>
	<up-tabbar :value="active" @change="changeTab" :fixed="true" :placeholder="true" :safeAreaInsetBottom="true">
		<up-tabbar-item v-for="item in tabList" :text="item.text" :icon="item.icon" :name="item.name"
			:key="item.id"></up-tabbar-item>
	</up-tabbar>
</template>

<script setup>
	import {
		ref
	} from "vue";
	import {
		routes
	} from "./data";
	import {
		useStore
	} from "../../store/store";

	const {
		config
	} = useStore.useConfigStore();

	const active = ref(config.tab);

	const tabList = ref([{
			id: 1,
			text: "首页",
			icon: "home",
			name: "home",
		},
		{
			id: 2,
			text: "我的",
			icon: "account",
			name: "user",
		},
	]);

	const changeTab = (name) => {
		config.tab = name;
		uni.switchTab({
			url: routes[name],
		});
	};
</script>

<style></style>