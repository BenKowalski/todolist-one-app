<script>
	import { onMount, afterUpdate, createEventDispatcher } from 'svelte'
	import { todosStoreUpdateTitle, todosStoreDelete } from '../stores/todos-store.js'

	export let data
	export let checked

	let navOpened = false,
		titleInputOpened = false,
		titleInputEl

	afterUpdate(() => {
		if(titleInputOpened)
			titleInputEl.select()

		if(navOpened && titleInputOpened)
			navOpened = false
		
	})
</script>


<div class="todo {navOpened ? 'nav-opened' : ''}">
	<div 
		class="checkbox {data.checked ? 'checkbox-active' : ''}"
		on:click={e => {console.log(data); todosStoreToggleChecked(data.id, !data.checked)}}></div>

	{#if !titleInputOpened}
		<p on:dblclick={e => titleInputOpened = true}>
			{data.title}
		</p>
	{:else}
		<input
			type="text"
			bind:this={titleInputEl}
			value={data.title} 
			on:blur={e => titleInputOpened = false}
			on:change={e => todosStoreUpdateTitle(data.id, titleInputEl.value)}
			on:keydown={e => e.keyCode === 13 ? titleInputEl.blur() : ''}/>
	{/if}
	
	<button class="nav-opener" on:click={e => navOpened = true}>
		<span></span>

		{#if navOpened}
			<div class="nav">
				<button class="nav-item" on:click|stopPropagation={e => titleInputOpened = true}>
					Change Task
				</button>
				<button class="nav-item" on:click|stopPropagation={e => todosStoreDelete(data.id)}>
					Delete Todo
				</button>
			</div>
		{/if}
	</button>
</div>

{#if navOpened}
	<div class="nav-shadow" on:click={e => navOpened = false}></div>
{/if}


<style>
	.todo {
		margin:0 0 6px -6px;
		display: flex;
		flex-direction: flex-row;
	}

	.todo:hover, .todo.nav-opened {
		background:#F5F7FA;
	}

	input, p {
		display:block;
		position: relative;
		padding:6px;
		cursor: pointer;
		font-size:16.5px;
		line-height:30px;
		margin:0;
		flex:1 100%;
		border:0;
		background:transparent;
		box-sizing: border-box;
		outline:none;
	}

	input {
		height:42px;
	}

	.checkbox {
		width:30px;
		height:30px;
		margin:6px;
		position: relative;
		border:#1951C2 1px solid;
		border-radius: 3px;
		transition: all 150ms ease;
		background:#FFF;
		cursor: pointer;
	}

	.checkbox:after {
		content:"";
		display:block;
		width:6px;
		height:11px;
		position: absolute;
		top:7px;
		left:10px;
		border:#1951C2 3px solid;
		border-top:0;
		border-left:0;
		border-radius: 0;
		transform:rotateZ(0) scale(0);
		transition:all 200ms ease;
	}

	.checkbox-active:after {
		transform:rotateZ(45deg) scale(1);
	}

	.nav-opener {
		position: relative;
		border:0;
		background:#FFF;
		width:30px;
		height:30px;
		float:right;
		margin:6px;
		opacity:0;
		cursor: pointer;
		border-radius: 3px;
	}

	.nav-opener span, .nav-opener span:before, .nav-opener span:after {
		content:"";
		display:block;
		position: absolute;
		top:50%;
		left:50%;
		width:18px;
		height:2px;
		background:#1951C2;
		transform: translateX(-50%) translateY(-50%);
		cursor:pointer;
	}

	.nav-opener span:before {
		margin:-5px 0 0 0;
	}

	.nav-opener span:after {
		margin:5px 0 0 0;
	}

	.todo:hover .nav-opener, .todo.nav-opened .nav-opener {
		opacity: 1;
	}

	.nav-opener:hover {
		background:#1951C2;
	}

	.nav-opener:hover span, .nav-opener:hover span:before, .nav-opener:hover span:after {
		background:#FFF;
	}

	.nav {
		position:absolute;
		top:0;
		right:0;
		z-index:1001;
		width:240px;
		background:#FFF;
		border-radius: 3px;
		overflow:hidden;
		box-shadow: 0 3px 6px rgba(0, 0, 0, .2);
	}

	.nav-item {
		font-size:14px;
		line-height:42px;
		cursor:pointer;
		display:block;
		border:0;
		background:#FFF;
		text-align: left;
		padding:0 18px;
		margin:0;
		width:100%;
		transition: all 200ms ease;
	}

	.nav-item:hover {
		padding:0 18px 0 24px;
		color:#1951C2;
	}

	.nav-shadow {
		position: fixed;
		top:0;
		left:0;
		width:100%;
		height:100%;
		z-index: 1000;
	}


</style>