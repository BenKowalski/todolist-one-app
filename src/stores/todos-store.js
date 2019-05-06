import { writable } from 'svelte/store';
import { authStore } from '../stores/auth-store.js'

export const todosStore = writable({
	json: {},
	array: []
})

let todosListener = []


export function todosStoreInit() {
	firebase.db.collection('todos')
}



export function todosStoreSetListener(listId) {

	if(listId != null && !todosListener[listId]) {

		todosStore.update(data => {
			data.json[listId] = {}
			data.array[listId] = []
			return data
		})

		todosListener[listId] = firebase.db.collection('todos').where('list', '==', listId).onSnapshot(snapshot =>
			snapshot.docChanges().forEach(change => {
								
				if (change.type === 'added' || change.type === 'modified') {

					const todoData = Object.assign({ 
						id: change.doc.id 
					}, change.doc.data())

					todosStore.update(data => {
						data.json[todoData.list][todoData.id] = todoData
						data.array[todoData.list] = Object.keys(data.json[todoData.list]).map(el => data.json[todoData.list][el])
						return data
					})
				} else if (change.type === 'removed') {
					todosStore.update(data => {
						delete data.json[change.doc.change().list][change.doc.id]
						data.array[change.doc.change().list] = Object.keys(data.json[change.doc.change().list]).map(el => data.json[change.doc.change().list][el])
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
	}).then(() => callback(true)).catch(err => callback(false))
}



export function todosStoreToggleChecked(todoId, checked) {
	firebase.db.collection('todos').doc(todoId).update({
    	checked
	})
}