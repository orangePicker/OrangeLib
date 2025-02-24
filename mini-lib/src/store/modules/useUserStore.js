import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('userStore', () => {
	const userInfo = ref({
		account:''
	})
	
	return {
		userinfo
	}
})