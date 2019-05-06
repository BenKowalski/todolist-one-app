<script>
	import { onMount, createEventDispatcher } from 'svelte'

	export let data;
	export let checked;
	export let description;

	const dispatch = createEventDispatcher();


	onMount(() => {

	})
</script>


<label>
	<input 
		type="checkbox" 
		bind:checked={checked} 
		on:change={e => dispatch('change', {checked})} />
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
		margin:0 0 12px 0;
	}

	label:hover div:before, label:hover div:after{
		border-color:#1951C2;
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
		padding:0 0 0 42px;
		cursor: pointer;
	}

	div p {
		-webkit-user-select: none;  
		-moz-user-select: none;    
		-ms-user-select: none;      
		user-select: none;
		font-size:16.5px;
		line-height:30px;
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
		top:4px;
		left:0;
		border:#1951C2 1px solid;
		border-radius: 2px;
		transition: all 150ms ease;
	}

	div:after {
		width:6px;
		height:11px;
		top:8px;
		left:9px;
		border:#1951C2 3px solid;
		border-top:0;
		border-left:0;
		border-radius: 0;
		/* transform: scale(0); */
		transform:rotateZ(0) scale(0);
	}
</style>