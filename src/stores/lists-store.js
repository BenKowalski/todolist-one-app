import { writable } from 'svelte/store';
import { router } from '../stores/router-store.js'
import { authStore } from '../stores/auth-store.js'

export const listsStore = writable({
	listActive: null,
	json: {},
	array: []
})

let listener,
	routerSubview


export function listsStoreInit() {
	setListener()

	router.subscribe(routerData => {
		routerSubview = routerData.subview
		listsStore.update(data => {
			data.listActive = (data.json && data.json[routerSubview]) ? data.json[routerSubview] : null
			return data
		})
	})
}

function setListener() {
	authStore.subscribe(authData => {
		if(listener) {
			listener()
		}

		if(authData.hasAuth) {
			listener = firebase.db.collection('lists').where('users', 'array-contains', authData.user.id).onSnapshot(snapshot =>
				snapshot.docChanges().forEach(change => {
								
					if (change.type === 'added' || change.type === 'modified') {

						const listData = Object.assign({ 
							id: change.doc.id 
						}, change.doc.data())

						listsStore.update(data => {
							data.json[change.doc.data().slug] = listData
							data.array = Object.keys(data.json).map(el => data.json[el])
							data.listActive = (data.json && data.json[routerSubview]) ? data.json[routerSubview] : null
							return data
						})
					} else if (change.type === 'removed') {
						listsStore.update(data => {
							delete data.json[change.doc.data().slug]
							data.array = Object.keys(data.json).map(el => data.json[el])
							data.listActive = (data.json && data.json[routerSubview]) ? data.json[routerSubview] : null
							return data
						})
					}
				})
			)
		}
	})
}



export function listsStoreNewList(title, callback) {

	const unsubscribe = authStore.subscribe(authData => {
		firebase.db.collection('lists').doc().set({
			users: [authData.user.id],
			title,
			slug: slugify(title)
		}).then(() => {
			console.log('document created');
			callback()
		}).catch(err => {
			console.error('error: ', err);
		})
	})
	unsubscribe()
}



function slugify(string) {
  const a = 'àáäâãåăæçèéëêǵḧìíïîḿńǹñòóöôœṕŕßśșțùúüûǘẃẍÿź·/_,:;'
  const b = 'aaaaaaaaceeeeghiiiimnnnoooooprssstuuuuuwxyz------'
  const p = new RegExp(a.split('').join('|'), 'g')
  return string.toString().toLowerCase()
	.replace(/\s+/g, '-') // Replace spaces with -
	.replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
	.replace(/&/g, '-and-') // Replace & with ‘and’
	.replace(/[^\w\-]+/g, '') // Remove all non-word characters
	.replace(/\-\-+/g, '-') // Replace multiple - with single -
	.replace(/^-+/, '') // Trim - from start of text
	.replace(/-+$/, '') // Trim - from end of text
}