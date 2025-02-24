import {
	defineStore
} from 'pinia'
import {
	ref
} from 'vue'

export const useConfigStore = defineStore('configStore', () => {
	const config = ref({
		tab: 'home'
	})

	return {
		config
	}
}, {
	persist: {
		storage: {
			getItem: (key) => uni.getStorageSync(key),
			setItem: (key, value) => uni.setStorageSync(key, value)
		}
	}
})