<script>
	import { onMount } from 'svelte';
	import { router } from './stores/router-store.js'
	import { authStore, authInit } from './stores/auth-store.js'
	import { listsStore, listsStoreInit } from './stores/lists-store.js'
	import { todosStore, todosStoreInit } from './stores/todos-store.js'
	import { uiStore } from './stores/ui-store.js'

	import WelcomeOverlay from './overlays/welcome-overlay.svelte'
	import UiLoader from './ui/ui-loader.svelte'
	import UiNavButton from './ui/ui-nav-button.svelte'
	import UiMainNav from './ui/ui-main-nav.svelte'
	import ListView from './list/list-view.svelte'

	onMount(() => {
		initFirebase()
		authInit()
		listsStoreInit()
		todosStoreInit()
		// TODO: uiStoreInit()
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
	<UiNavButton />
	<UiMainNav />
	<main class={$uiStore.mainNavOpened ? 'main-nav-opened' : ''}>
		{#if $router.view === 'lists' && $router.subview != null}
			<ListView />
		{/if}
	</main>
{:else if $authStore.inited && $authStore.user === null}
	<WelcomeOverlay />
{:else}
	<UiLoader />
{/if}

<!--<a href="/lists/haushalt/">Rock</a>-->

<style>

	main {
		transition: all 100ms ease;
	}

	.main-nav-opened {
		transform: translateX(270px);
	}

	@media (min-width: 768px) {
		main {
			margin-left:270px;
		}

		.main-nav-opened {
			transform: translateX(0);
		}
	}
</style>