<script>
	import { onMount } from 'svelte';
	import { router } from './stores/router-store.js'
	import { listsStore, listsStoreInit } from './stores/lists-store.js'
	import { authStore, authInit } from './stores/auth-store.js'

	import WelcomeOverlay from './overlays/welcome-overlay.svelte'
	import UiMainNav from './ui/ui-main-nav.svelte'
	import ListView from './list/list-view.svelte'

	onMount(() => {
		initFirebase()
		authInit()
		listsStoreInit()
	})

	const initFirebase = () => {
		firebase.initializeApp({
			apiKey: "AIzaSyBcMiBiqH2w0r4RlaInDIUKQ4N9hKd5gk4",
			authDomain: "todolist-one.firebaseapp.com",
			databaseURL: "https://todolist-one.firebaseio.com",
			projectId: "todolist-one",
			storageBucket: "todolist-one.appspot.com",
			messagingSenderId: "240442505368"
		})

		firebase.db = firebase.firestore()
		firebase.store = firebase.storage()

		firebase.db.settings({ 
			timestampsInSnapshots: true
		})

		firebase.db.enablePersistence({
			experimentalTabSynchronization: true
		}).catch(err => {
			console.log(err)
		})
	}
</script>

{#if $authStore.inited && $authStore.user != null}
	<UiMainNav />
	<main>
		{#if $router.view === 'lists' && $router.subview != null}
			<ListView />
		{/if}
	</main>
{:else if $authStore.inited && $authStore.user === null}
	<WelcomeOverlay />
{:else}
	Loading…
{/if}

<style>
	main {
		margin-left:300px;
	}
</style>