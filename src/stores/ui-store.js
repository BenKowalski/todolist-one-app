import { writable } from 'svelte/store';



export const uiStore = writable({
  mainNavOpened: false
})



export const uiToggleMainNavOpened = () => {
	uiStore.update(data => {
		data.mainNavOpened = !data.mainNavOpened
		return data
	})
}