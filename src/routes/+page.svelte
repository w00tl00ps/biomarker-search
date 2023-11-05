<script>
	import Counter from './Counter.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';

	// INITIAL DATA ON PAGE LOAD
	/** @type {import('./$types').PageData} */
	export let data; // PageData type
	$: ({biomarkers} = data) // destructure the data prop to extract biomarkers array

	// BIOMARKER SEARCH
	let searchString; // from textbox

	async function queryBiomarkers() {
		console.log("Search String:", searchString);
		const response = await fetch(`/api/biomarkers?search=${searchString}`);
		const result = await response.json();
		console.log(result);
		biomarkers = result;
	}

</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="CCO Biomarker Search" />
</svelte:head>


<div class="flex flex-col justify-center content-center w-full max-w-screen-xl">
	<input type="text" placeholder="Search" class="input input-bordered input-primary w-full" bind:value={searchString} on:change={queryBiomarkers}/>
	<button class="btn btn-primary" on:click={queryBiomarkers}>Search</button>

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
