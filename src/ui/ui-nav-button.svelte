<script>
	import { onMount, createEventDispatcher } from 'svelte'

	import{ uiStore, uiToggleMainNavOpened } from '../stores/ui-store.js'
	
	onMount(() => {
	
	})
</script>


	
	<button class={$uiStore.mainNavOpened ? 'opened' : ''} on:click={e => uiToggleMainNavOpened()}>
		<span></span>
	</button>

	<div class={$uiStore.mainNavOpened ? 'visible' : ''} on:click={e => uiToggleMainNavOpened()}></div>

<style>
	button {
		position: absolute;
		top:6px;
		left:12px;
		border:0;
		background:#FFF;
		width:30px;
		min-width: 30px;
		height:30px;
		max-height: 30px;
		float:right;
		margin:9px 6px;
		opacity:1;
		cursor: pointer;
		border-radius: 3px;
		padding:0;
		z-index:1100;
	}

	@media (min-width: 768px) {
		button {
			display:none;
		}
	}

	.opened {
		background:#1951C2;
	}

	.opened:hover {
		background:#FFF;
	}

	.opened:hover span {
		background: transparent;
	}

	.opened:hover span:before, .opened:hover span:after {
		background:#1951C2;
	}

	.opened span {
		background:transparent;
	}

	.opened span:before {
		margin:0;
		transform: translateX(-50%) translateY(-50%) rotateZ(45deg);
		transform-origin:50% 50%;
		background:#FFF;
	}

	.opened span:after {
		margin:0;
		transform: translateX(-50%) translateY(-50%) rotateZ(-45deg);
		transform-origin:50% 50%;
		background:#FFF;
	}

	button span, button span:before, button span:after {
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
		transition: all 100ms ease;
	}

	button span:before {
		margin:-5px 0 0 0;
	}

	button span:after {
		margin:5px 0 0 0;
	}

	button:hover {
		background:#1951C2;
	}

	button:hover span, button:hover span:before, button:hover span:after {
		background:#FFF;
	}

	div {
		display: none;
		position: fixed;
		left:270px;
		top:0;
		right:0;
		bottom:0;
		z-index:1050;
	}

	.visible {
		display: block;
	}

</style>