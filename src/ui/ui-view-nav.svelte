<script>
	export let title;
</script>



<header>
	<h2>
		{title}
	</h2>

	<button>
		<img src="/img/cog.svg" alt="Einstellungen" />
	</button>
</header>



<style>
	header {
		display: block;
		position: relative;
		height:90px;
		display:flex;
		flex-direction: row;
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
		color:#111;
		flex:1 100%;
	}

	button {
		width:48px;
		height: 48px;
		border:0;
		cursor:pointer;
		margin:24px 24px 0 0;
		background:transparent;
		padding:14px;
	}

	button img {
		display:block;
		width:20px;
		height:20px;
	}
</style>