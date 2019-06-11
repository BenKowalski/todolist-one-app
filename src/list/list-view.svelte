<script>
	import { router } from '../stores/router-store.js'
	import { listsStore } from '../stores/lists-store.js'
	import { todosStore, todosStoreSetListener, todosStoreNewTodo } from '../stores/todos-store.js'
	import { onMount } from 'svelte'

	import UiViewNav from '../ui/ui-view-nav.svelte'
	import ListTodo from './list-todo.svelte'



	let listActiveId = null,
		newTodoPlaceholder = 'Click here to add todo!',
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
</script>

{#if $listsStore.listActive}
	<UiViewNav title={$listsStore.listActive.title} />

	<input
		type="text"
		bind:value={newTodoTitle}
		bind:this={newTodoInputEl}
		placeholder="{newTodoPlaceholder}"
		on:focus={e => newTodoPlaceholder = 'What shoud be done?'}
		on:blur={e => { newTodoPlaceholder = 'What shoud be done?'; newTodoTitle = '' }}
		on:keydown={e => controlKeyDown(e, $listsStore.listActive.id)} />

	{#if $todosStore.array[$listsStore.listActive.id]
		&& $todosStore.array[$listsStore.listActive.id].length > 0}
		<ul>
			{#each $todosStore.array[$listsStore.listActive.id] as todo}
				<li>
					<ListTodo data={todo} />
				</li>
			{/each}
		</ul>
	{:else}
		<p>
			This list doesn't have any todo items. click into the field above to add one. If you need some help using Todolist One, please visit the <a href="https://todolist.one/help/" target="_blank">help section</a>.
		</p>
	{/if}
{:else}
	<p>
		This list doesn't seem to exist
	</p>
{/if}

<style>

	input {
		margin:18px 24px 18px 24px;
		width:calc(100% - 24px - 24px);
		background:#E6EAF2;
		border:0;
		line-height:24px;
		padding:12px 18px;
		outline:none;
	}

	ul {
		margin:0 24px;
		padding:0;
		list-style: none;
	}

	li {
		position: relative;
		margin:0;
		padding:0;
	}

	li:after {
		content:"";
		display:block;
		position: absolute;
		top:0;
		left:6px;
		right:6px;
		height:1px;
		background: #DDD;
    	transform: scaleY(.5);
	}

	li:first-child:after {
		display:none;
	}

	li:hover:after, li:hover + li:after {
		display: none;
	}

	p {
		color:#555;
		margin:30px auto;
		padding:0 36px;
		max-width: 660px;
		text-align: center;
	}

	@media (min-width:768px) {
		input {
			margin:24px 24px 18px 24px;
			width:calc(100% - 24px - 24px);
			background:#E6EAF2;
			border:0;
			line-height:24px;
			padding:12px 18px;
			outline:none;
		}
	}
</style>