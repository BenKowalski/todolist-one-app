<script>
	import { onMount, createEventDispatcher } from 'svelte'
	import { todosStoreToggleChecked, todosStoreDelete } from '../stores/todos-store.js'

	export let data
	export let checked

	let navOpened = false

	const dispatch = createEventDispatcher();


	onMount(() => {

	})
</script>


<div class="todo {navOpened ? 'nav-opened' : ''}">
	<label>
		<input 
			type="checkbox" 
			bind:checked={data.checked} 
			on:change={e => dispatch('change', { checked: data.checked })} />
		<p>
			{data.title}
		</p>
	</label>
	<button class="nav-opener" on:click={e => navOpened = true}>
		<span></span>

		{#if navOpened}
			<div class="nav">
				<button class="nav-item">
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

	label {
		flex:1 100%;
	}

	.todo:hover, .todo.nav-opened {
		background:#F5F7FA;
	}

	input {
		width:1px;
		height:1px;
		position: absolute;
		top:0;
		left:-9999px;
		border-radius: 3px;
	}

	input:checked +p:after {
		transform:rotateZ(45deg) scale(1);
	}

	p {
		position: relative;
		padding:6px 6px 6px 48px;
		cursor: pointer;
		-webkit-user-select: none;  
		-moz-user-select: none;    
		-ms-user-select: none;      
		user-select: none;
		font-size:16.5px;
		line-height:30px;
		margin:0;
	}

	p:before, p:after {
		content:"";
		display:block;
		width:30px;
		height:30px;
		position:absolute;
		top:6px;
		left:6px;
		border:#1951C2 1px solid;
		border-radius: 2px;
		transition: all 150ms ease;
	}

	p:before {
		background:#FFF;
	}

	p:after {
		width:6px;
		height:11px;
		top:13px;
		left:18px;
		border:#1951C2 3px solid;
		border-top:0;
		border-left:0;
		border-radius: 0;
		transform:rotateZ(0) scale(0);
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