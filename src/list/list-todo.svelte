<script>
	import { onMount, createEventDispatcher } from 'svelte'

	export let data;
	export let checked;

	const dispatch = createEventDispatcher();


	onMount(() => {

	})
</script>


<label>
	<input 
		type="checkbox" 
		bind:checked={data.checked} 
		on:change={e => dispatch('change', { checked: data.checked })} />
	<div>
		<p>
			{data.title}
		</p>
		<!-- {#if description && description.length > 0}
			<small>
				{description}
			</small>
		{/if}-->
	</div>
</label>


<style>
	label {
		display:block;
		margin:0 0 6px -6px;
	}

	label:hover{
		background:#F5F7FA;
	}

	input {
		width:1px;
		height:1px;
		position: absolute;
		top:0;
		left:-9999px;
		opacity:0;
	}

	input:checked +div:after {
		transform:rotateZ(45deg) scale(1);
	}

	div {
		position: relative;
		padding:6px 6px 6px 42px;
		cursor: pointer;
	}

	div p {
		-webkit-user-select: none;  
		-moz-user-select: none;    
		-ms-user-select: none;      
		user-select: none;
		font-size:16.5px;
		line-height:30px;
		margin:0;
	}

	div small {
	    color: #999;
	    font-size: 12px;
	    line-height: 18px;
	    max-width: 660px;
	    display: block;
	    margin-top: 6px;
	}

	div:before, div:after {
		content:"";
		display:block;
		width:24px;
		height:24px;
		position:absolute;
		top:9px;
		left:6px;
		border:#1951C2 1px solid;
		border-radius: 2px;
		transition: all 150ms ease;
	}

	div:after {
		width:6px;
		height:11px;
		top:13px;
		left:15px;
		border:#1951C2 3px solid;
		border-top:0;
		border-left:0;
		border-radius: 0;
		/* transform: scale(0); */
		transform:rotateZ(0) scale(0);
	}
</style>