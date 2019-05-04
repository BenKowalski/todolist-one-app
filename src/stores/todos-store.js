import { writable } from 'svelte/store';
import { authStore } from '../stores/auth-store.js'

export const todosStore = writable({
	listId: null,
	json: {},
	array: []
})

let todosListener,
	listenerId


export function todosStoreInit() {
	firebase.db.collection('todos')
}



export function todosStoreSetListener(listId) {

	if(listId != null && listenerId != listId) {
		listenerId = listId

		todosStore.set({
			listId,
			json: {},
			array: []
		})

		if(todosListener) {
			todosListener()
		}

		todosListener = firebase.db.collection('todos').where("list", "==", listId).onSnapshot(snapshot =>
			snapshot.docChanges().forEach(change => {
								
				if (change.type === 'added' || change.type === 'modified') {

					const todoData = Object.assign({ 
						id: change.doc.id 
					}, change.doc.data())

					todosStore.update(data => {
						data.json[change.doc.id] = todoData
						data.array = Object.keys(data.json).map(el => data.json[el])
						return data
					})
				} else if (change.type === 'removed') {
					todosStore.update(data => {
						delete data.json[change.doc.id]
						data.array = Object.keys(data.json).map(el => data.json[el])
						return data
					})
				}
			})
		)
	}
}

export function todosStoreNewTodo(listId, title, callback) {

	firebase.db.collection('todos').doc().set({
		list: listId,
		title
	}).then(() => {
		console.log('document created');
		callback(true)
	}).catch(err => {
		console.error('error: ', err);
		callback(false)
	})
}