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
		height:60px;
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
		font-size:16.5px;
		font-family:Georgia, sans-serif;
		line-height: 60px;
		padding:0 24px;
		color:#111;
		flex:1 100%;
	}

	button {
		width:48px;
		height: 48px;
		border:0;
		cursor:pointer;
		margin:6px 6px 0 0;
		background:transparent;
		padding:14px;
	}

	button img {
		display:block;
		width:20px;
		height:20px;
	}

	@media (min-width: 768px) {
		header {
			height:72px;
		}

		h2 {
			font-size:34px;
			line-height: 72px;
			padding:0 24px;
		}

		button {
			margin:12px 24px 0 0;
		}
	}
</style>