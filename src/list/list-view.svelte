<script>
	import { router } from '../stores/router-store.js'
	import { listsStore } from '../stores/lists-store.js'
</script>

{#if $router && $listsStore && $listsStore.json && %$listsStore.json[$router.subview]}
	<h2>
		{$listsStore.json[$router.subview].title}
	</h2>
{:else}
	<p>
		This list doesn't seem to exist
	</p>
{/if}

<style>
	
</style>