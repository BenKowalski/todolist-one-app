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

						var listIdOfTodo = null;
						Object.keys(data.json).forEach(listKey => {
							if( data.json[listKey][change.doc.id] ) {
								listIdOfTodo = data.json[listKey][change.doc.id].list;
							}
						});

						if(listIdOfTodo != null) {
							delete data.json[listIdOfTodo][change.doc.id]
							data.array[listIdOfTodo] = Object.keys(data.json[listIdOfTodo]).map(el => data.json[listIdOfTodo][el])
						}
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

export function todosStoreUpdateTitle(todoId, title) {
	firebase.db.collection('todos').doc(todoId).update({
    	title
	})
}

export function todosStoreDelete(todoId) {
	firebase.db.collection('todos').doc(todoId).delete()
}