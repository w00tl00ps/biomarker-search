<script>
	import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import BiomarkerCard from '../components/BiomarkerCard.svelte';

	// INITIAL DATA ON PAGE LOAD
	/** @type {import('./$types').PageData} */
	export let data; // PageData type
	let {biomarkers} = data; // destructure the data prop to extract biomarkers array
	let {organSites} = data;
	console.log("Biomarker Data from /routes/+page.js:", data);
	console.log("organSites Data from /routes/+page.js:", organSites);

	// Debug logging when biomarkers updated (after query)
	$: console.log("biomarkers list updated", biomarkers);

	// BIOMARKER SEARCH
	/** @type {string} */
	let searchString; // from textbox
	/** @type {string} */
	let selectOrganSite; // from select box


	async function queryBiomarkers() {
		console.log("/routes/+page.svelte Search String:", searchString);
		
		// account for empty search string
		if (!searchString) {
			searchString = "";
		}

		// account for default select value
		let organSiteSearch;
		if (selectOrganSite == "Select Organ Site") {
			organSiteSearch = "";
		}
		else {
			organSiteSearch = selectOrganSite
		}
		const response = await fetch(`/api/biomarkers?search=${searchString}&organSite=${organSiteSearch}`);
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
	<select class="select select-primary w-full my-2" bind:value={selectOrganSite} on:change={queryBiomarkers}>
		<option selected>Select Organ Site</option>
		{#each organSites as organSite}
			<option>{organSite}</option>
		{/each}
	</select>
	<div class="flex flex-row">
		<input type="text" placeholder="Search" class="input input-bordered input-primary w-full" bind:value={searchString} on:change={queryBiomarkers}/>
		<button class="btn btn-primary ml-2" on:click={queryBiomarkers}>Search</button>
	</div>
	
	<!-- SEARCH RESULTS -->
	{#each biomarkers as biomarker (biomarker._id)}
		<div 
			out:fade={{ duration: 400 }}
			in:fade={{ delay: 400, duration: 400 }}
			animate:flip={{ delay: 450, duration: 400}}
		>
			<BiomarkerCard biomarkerData={biomarker}/>
		</div>
	{/each}
	
</div>



<style>
/* for troubleshooting element placement 
p {
	border: 1px solid white;
} */
</style>
