<script>
	import { onMount } from 'svelte';
	import { router } from './stores/router-store.js'
	import { authStore, authInit } from './stores/auth-store.js'

	import WelcomeOverlay from './overlays/welcome-overlay.svelte'

	onMount(() => {
		initFirebase()
		authInit()
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
	}
</script>

{#if $authStore.inited && $authStore.user != null}
	<a href="/">
		Start
	</a>
	<a href="/settings/">
		Settings
	</a>

	<div>
		{#if $router.view === 'start'}
			Start
		{:else if $router.view === 'settings'}
			Settings
		{/if}
	</div>
{:else if $authStore.inited && $authStore.user === null}
	<WelcomeOverlay />
{:else}
	Loading…
{/if}

<style>

</style>