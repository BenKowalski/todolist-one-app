import { writable } from 'svelte/store';



export const authStore = writable({
	inited: false,
	hasAuth: false,
	user: null
})



export function authInit() {
	var timeStart = Date.now()

	console.log(Date.now() - loadedTime)

	firebase.auth().onAuthStateChanged(user => {
		console.log('T', 'AUTH STATE CHANGED', Date.now() - timeStart, firebase.auth().currentUser)
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