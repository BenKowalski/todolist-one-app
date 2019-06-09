<script>
	import { fade } from 'svelte/transition';
</script>

<div class="ripple"> <!-- out:fade -->
	<div></div>
	<div></div>
</div>



<style>
	.ripple {
		display: block;
		width: 60px;
		height: 60px;
		position: fixed;
		top:50%;
		left:50%;
		transform:translateX(-50%) translateY(-50%);
	}
	.ripple div {
		position: absolute;
		border: 4px solid #1951C2;
		opacity: 1;
		border-radius: 50%;
		animation: ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
	}
	.ripple div:nth-child(2) {
		animation-delay: -0.5s;
	}
	@keyframes ripple {
		0% {
			top: 28px;
			left: 28px;
			width: 0;
			height: 0;
			opacity: 1;
		}
		100% {
			top: -1px;
			left: -1px;
			width: 58px;
			height: 58px;
			opacity: 0;
		}
	}
</style>