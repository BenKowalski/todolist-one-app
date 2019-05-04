<script>
	import { router } from '../stores/router-store.js'
	import { listsStore } from '../stores/lists-store.js'
</script>

<h2>
	{$listsStore.json[$router.subview].title}
</h2>

<style>
	
</style>