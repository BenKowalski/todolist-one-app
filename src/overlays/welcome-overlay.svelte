<script>
	import { authStore, authSignInAnonymously } from '../stores/auth-store.js'
</script>


<div class="shadow"></div>
<div class="box">
	<h2>
		Welcome to Todolist.One!
	</h2>
	<p>
		It seems like you're new on Todolist.One! Please choose:
	</p>

	<button on:click={e => authSignInAnonymously()}>
		Start anonymously
	</button>
	<button on:click={e => alert('NOT READY YET')}>
		Sign In with eMail
	</button>
</div>

<style>
	.shadow {
		position: fixed;
		top:0;
		left:0;
		width:100%;
		height:100%;
		background:rgba(0, 0, 0, .5);
		z-index:1000;
	}

	.box {
		position: fixed;
		top:50%;
		left:50%;
		width:90%;
		max-width:360px;
		background:#FFF;
		z-index:1000;
		transform:translateX(-50%) translateY(-50%);
		padding:30px;
	}
</style>