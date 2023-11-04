<script>
	import Counter from './Counter.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';

	/** @type {import('./$types').PageData} */
	export let data; // PageData type
	
	$: ({biomarkers} = data) // destructure the data prop to extract biomarkers array

</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="CCO Biomarker Search" />
</svelte:head>


<div class="flex flex-col justify-center content-center w-full max-w-screen-xl">
	<input type="text" placeholder="Search" class="input input-bordered input-primary w-full" />

	{#each biomarkers as biomarker}
		<p>{biomarker.ShortName}</p>
		<ul>
			<li>{biomarker.OrganSite}</li>
			<li>{biomarker.Biomarkers}</li>
			<li>{biomarker.Indication}</li>
			<li>{biomarker.FundedDate}</li>
			<li>{biomarker.TestingSite}</li>
		</ul>
	{/each}
	
</div>



<style>
/* for troubleshooting element placement */
p {
	border: 1px solid white;
}
</style>
