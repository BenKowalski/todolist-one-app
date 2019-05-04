<script>
	import { router } from '../stores/router-store.js';
	import { listsStore, listsStoreNewList } from '../stores/lists-store.js';
	import { onMount } from 'svelte'

	let newListPlaceholder = '+ Add List',
		newListTitle = '',
		newListInputEl

	function controlKeyDown(e) {

		if(e.keyCode === 13) {
			listsStoreNewList(newListTitle, () => {
			
			})

			newListPlaceholder = ''
			newListInputEl.blur()	
		}
	}
</script>



<nav>
	{#if $listsStore.array}
		<ul>
			{#each $listsStore.array as list}
				<li class="{ $router.subview === list.slug ? 'active' : ''}">
					<a href="/lists/{list.slug}/">
						{list.title}
					</a>
				</li>
			{/each}
			<li>
				<input
					type="text"
					bind:value={newListTitle}
					bind:this={newListInputEl}
					placeholder="{newListPlaceholder}"
					on:focus={e => newListPlaceholder = 'Untitled'}
					on:blur={e => { newListPlaceholder = '+ Add List'; newListTitle = '' }}
					on:keydown={e => controlKeyDown(e)} />
			</li>
		</ul>
	{/if}
</nav>




<style>
	nav {
		position: fixed;
		top:0;
		left:0;
		width:300px;
		height:100%;
		background:#1951C2;
		z-index:1000;
		overflow-x:hidden;
		overflow-x: auto;
		-webkit-overflow-scrolling: touch;
	}

	ul {
		display: block;
		list-style: none;
		margin:0;
		padding:48px 0 0 0;
	}

	li {
		margin:0;
		padding:0;
		position: relative;
	}

	li.active >a {
		color:#FFF;
	}

	a {
		display:block;
		padding:0 30px;
		line-height:48px;
		color:rgba(255, 255, 255, .75);
		font-family:Verdana, sans-serif;
		font-weight:400;
		font-size: 16.5px;
		transition:all 150ms ease;
	}

	a:hover {
		text-decoration: none;
		color:#FFF;
		background:rgba(255, 255, 255, .1);
	}

	input {
		display:block;
		width:100%;
		padding:0 30px;
		line-height:48px;
		color:rgba(255, 255, 255, .75);
		font-family:Verdana, sans-serif;
		font-weight:400;
		font-size: 16.5px;
		transition:all 150ms ease;
		background:transparent;
		border:0;
		color:#FFF;
		outline:none;
	}

	input:focus {
		background:rgba(0, 0, 0, .1);
	}

	input::-webkit-input-placeholder {
		color:rgba(255, 255, 255, .5);
	}
</style>