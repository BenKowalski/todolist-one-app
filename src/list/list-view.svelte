<script>
	import { router } from '../stores/router-store.js'
	import { listsStore } from '../stores/lists-store.js'
	import { todosStore, todosStoreSetListener, todosStoreNewTodo, todosStoreToggleChecked } from '../stores/todos-store.js'
	import { onMount } from 'svelte'

	import UiViewNav from '../ui/ui-view-nav.svelte'
	import ListTodo from './list-todo.svelte'



	let listActiveId = null,
		newTodoPlaceholder = 'Click here to add todo',
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

		if(e.keyCode === 13 && newTodoTitle.length >= 1) {
			todosStoreNewTodo(listId, newTodoTitle, () => {
			
			})

			newTodoTitle = ''
		}
	}

	function changeTodo(e, todo) {
		todosStoreToggleChecked(todo.id, todo.checked)
	}
</script>

{#if $listsStore.listActive}
	<UiViewNav title={$listsStore.listActive.title} />

	<input
		type="text"
		bind:value={newTodoTitle}
		bind:this={newTodoInputEl}
		placeholder="{newTodoPlaceholder}"
		on:focus={e => newTodoPlaceholder = 'What\'s to do?'}
		on:blur={e => { newTodoPlaceholder = 'What\'s to do?'; newTodoTitle = '' }}
		on:keydown={e => controlKeyDown(e, $listsStore.listActive.id)} />

	<ul>
		{#each $todosStore.array[$listsStore.listActive.id] as todo}
			<li>
				<ListTodo 
					data={todo}
					on:change={e =>changeTodo(e, todo)} />
			</li>
		{/each}
	</ul>
{:else}
	<p>
		This list doesn't seem to exist
	</p>
{/if}

<style>

	input {
		margin:30px 36px 18px 36px;
		width:calc(100% - 36px - 36px);
		background:#E6EAF2;
		border:0;
		line-height:24px;
		padding:12px 24px;
		outline:none;
	}

	ul {
		margin:0 36px;
		padding:0;
		list-style: none;
	}

	li {
		margin:0;
		padding:0;
	}
</style>