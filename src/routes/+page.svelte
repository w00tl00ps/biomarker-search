<script>
	import Counter from './Counter.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="CCO Biomarker Search" />
</svelte:head>


<div class="flex flex-col justify-center content-center w-full max-w-screen-xl">
	<input type="text" placeholder="Search" class="input input-bordered input-primary w-full" />
	<p>Search results go here</p>
	<p>Multiple search results in a column</p>
</div>



<style>
/* for troubleshooting element placement */
p {
	border: 1px solid white;
}
</style>
