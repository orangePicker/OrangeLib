const defTimes = 1500

const showToast = (type, text, times) => {
	uni.showToast({
		icon: type,
		duration: times || defTimes,
		title: text
	})
}

const Toast = {
	success: (text, times) => {
		showToast('success', text, times)
	},
	error: (text, times) => {
		showToast('error', text, times)
	},
	loading: (text, times) => {
		showToast('loading', text, times)
	},
	info: (text, times) => {
		showToast('none', text, times)
	},
	close: () => {
		uni.hideToast()
	}
}

export default Toast