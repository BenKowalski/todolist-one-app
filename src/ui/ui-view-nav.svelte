<script>
	export let title;
</script>



<header>
	<h2>
		{title}
		<!-- {#if $router.subview}
			/
			<span>
				{$router.subview.replace('-', ' ')}
			</span>
		{/if} -->
	</h2>
</header>



<style>
	header {
		display: block;
		position: relative;
		height:90px;
	}

	header:after {
		content:"";
		position: absolute;
		display:block;
		height:1px;
		left:12px;
		right:12px;
		bottom:0;
		background:#DDD;
		transform: scaleY(.5);
	}

	h2 {
		font-size:34px;
		font-family:Georgia, sans-serif;
		line-height: 90px;
		padding:0 36px;
		color:#111; /* #999; */
	}

	h2 span {
		color:#111;
	}
</style>