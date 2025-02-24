import { createPinia } from 'pinia'
import persistedstate from 'pinia-plugin-persistedstate'
import { useConfigStore } from './modules/useConfig'
import { useUserStore } from './modules/useUserStore'

const store = createPinia()
store.use(persistedstate)

export const useStore = {
	useUserStore: () => useUserStore(),
	useConfigStore: () => useConfigStore()
}

export default store
