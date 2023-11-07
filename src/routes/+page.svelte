<script>
	import Counter from './Counter.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
	import BiomarkerCard from '../components/BiomarkerCard.svelte';

	// INITIAL DATA ON PAGE LOAD
	/** @type {import('./$types').PageData} */
	export let data; // PageData type
	$: ({biomarkers} = data) // destructure the data prop to extract biomarkers array
	$: ({organSites} = data)
	$: console.log("Data from /routes/+page.js:", data);

	// BIOMARKER SEARCH
	/** @type {string} */
	let searchString; // from textbox

	async function queryBiomarkers() {
		console.log("Search String:", searchString);
		const response = await fetch(`/api/biomarkers?search=${searchString}`);
		const result = await response.json();
		console.log("+page.js GET from /api/biomarkers?search: ", result);
		biomarkers = result;
	}

</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="CCO Biomarker Search" />
</svelte:head>


<div class="flex flex-col justify-center content-center w-full max-w-screen-xl">

	<!-- SEARCH BAR -->
	<select class="select select-primary w-full my-1">
		<option disabled selected>Select Organ Site</option>
		{#each organSites as organSite}
			<option>{organSite}</option>
		{/each}
	</select>
	<div class="flex flex-row">
		<input type="text" placeholder="Search" class="input input-bordered input-primary w-full" bind:value={searchString} on:change={queryBiomarkers}/>
		<button class="btn btn-primary" on:click={queryBiomarkers}>Search</button>
	</div>
	<div>
		Placeholder for additional filter options.
	</div>
	
	<!-- SEARCH RESULTS -->
	{#each biomarkers as biomarker}
		<BiomarkerCard biomarkerData={biomarker}/>
	{/each}
	
</div>



<style>
/* for troubleshooting element placement 
p {
	border: 1px solid white;
} */
</style>
