<script>
	import { router } from '../stores/router-store.js'
	import { listsStore } from '../stores/lists-store.js'
	import { todosStore, todosStoreSetListener, todosStoreNewTodo } from '../stores/todos-store.js'
	import { onMount } from 'svelte'

	let listActiveId = null,
		newTodoPlaceholder = '+ Add Todo',
		newTodoTitle = '',
		newTodoInputEl

	onMount(() => {
		listsStore.subscribe(listsData => {
			if(listsData.listActive != null) {
				todosStoreSetListener(listsData.listActive.id)
			}
		})
	})


	function controlKeyDown(e, listId) {

		if(e.keyCode === 13) {
			todosStoreNewTodo(listId, newTodoTitle, () => {
			
			})

			newTodoPlaceholder = ''	
		}
	}
</script>

{#if $listsStore.listActive}
	<h2>
		{$listsStore.listActive.title}
	</h2>

	<input
		type="text"
		bind:value={newTodoTitle}
		bind:this={newTodoInputEl}
		placeholder="{newTodoPlaceholder}"
		on:focus={e => newTodoPlaceholder = 'Type your todo'}
		on:blur={e => { newTodoPlaceholder = '+ Add Todo'; newTodoTitle = '' }}
		on:keydown={e => controlKeyDown(e, $listsStore.listActive.id)} />

	<ul>
		{#each $todosStore.array as todo}
			<li>
				{todo.title}
			</li>
		{/each}
	</ul>
{:else}
	<p>
		This list doesn't seem to exist
	</p>
{/if}

<style>
	
</style>