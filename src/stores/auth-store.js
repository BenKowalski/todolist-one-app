import { writable } from 'svelte/store';



export const authStore = writable({
	inited: false,
	hasAuth: false,
	user: null
})



export function authInit() {
	firebase.auth().onAuthStateChanged(user => {
		if (user) {
			authStore.set({
				inited: true,
				hasAuth: true,
				user: {
					id: user.uid,
					email: user.email
				}
			})
		} else {
			authStore.set({
				inited: true,
				hasAuth: false,
				user: null
			})
		}
	})
}



export function authSignInAnonymously() {
	firebase.auth().signInAnonymously().catch(err =>
		alert(err.message)
	)
}