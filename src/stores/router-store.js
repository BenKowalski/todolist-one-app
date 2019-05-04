import { writable } from 'svelte/store';
import Page from 'page'



export const router = writable({
  view: 'index',
  subview: null
})



Page({
	hashbang: true
})

Page('/', data => 
	router.set({
		view: 'start',
		subview: null
	})
)

Page('/:view/', data => 
	router.set({
		view: data.params.view,
		subview: null
	})
)

Page('/:view/:subview/', data => 
	router.set({
		view: data.params.view,
		subview: data.params.subview
	})
)

Page()