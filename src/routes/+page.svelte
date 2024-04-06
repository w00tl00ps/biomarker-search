<script>
	import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import BiomarkerCard from '$lib/components/BiomarkerCard.svelte';

	// INITIAL DATA ON PAGE LOAD
	/** @type {import('./$types').PageData} */
	export let data; // PageData type
	let {biomarkers} = data; // destructure the data prop to extract biomarkers array
	let {organSites} = data;
	let {testingSites} = data;

	// Debug logging when biomarkers updated (after query)
	$: console.log("/routes/+page.svelte -> biomarkers list updated, length:", biomarkers.length);

	// BIOMARKER SEARCH AND FILTER PARAMETERS
	/** @type {string} */
	let searchString; // from textbox
	/** @type {string} */
	let selectOrganSite; // from select box
	/** @type {boolean} */
	let checkboxFundedInHouse = false; // from Funded in house checkbox
	/** @type {string}*/
	let selectedTestingSite; // from select box
	
	let numSearchResults = biomarkers.length;

	/**
	 * Make GET call to /api/biomarkers API endpoint to search biomarker data
	 */
	async function queryBiomarkers() {
		console.log("/routes/+page.svelte Search String:", searchString);
		
		// account for empty search string
		if (!searchString) {
			searchString = "";
		}

		// account for default select value
		let organSiteSearch;
		if (!organSites.includes(selectOrganSite)) {
			organSiteSearch = "";
		}
		else {
			organSiteSearch = selectOrganSite
		}
		const response = await fetch(`/api/biomarkers?search=${searchString}&organSite=${organSiteSearch}`);
		const result = await response.json();
		console.log("+page.js GET from /api/biomarkers?search: ", result);

		numSearchResults = result.length;
		biomarkers = result;
	}

	/**
	 * Apply front-end filters to search results
	 * 
	 * note: checkboxFundedInHouse is a parameter to trigger reactive call to function when checkbox is clicked
	 * 
	 * @type {function(Array<any>, boolean, string): Array<any>} 
	*/
	const filterBiomarkers = (biomarkers, checkboxFundedInHouse, selectedTestingSite) => {
		// apply funded in-house filter if checked
		if (checkboxFundedInHouse) { 
			let filteredBiomarkers = biomarkers.filter( (biomarker) => {
				if (biomarker.FundedSites.includes(selectedTestingSite) ) {
					return true;
				}
				else {
					return false;
				}
			});
			numSearchResults = filteredBiomarkers.length;
			return filteredBiomarkers;
		}
		else {
			numSearchResults = biomarkers.length;
			return biomarkers;
		}
	};

</script>

<svelte:head>
	<title>Biomarker Search</title>
	<meta name="description" content="CCO Biomarker Search" />
</svelte:head>


<div class="flex flex-col justify-center content-center w-full max-w-screen-lg">

	<!-- SEARCH BAR -->
	<div class="flex flex-row my-1">
		<input type="text" placeholder="Search" class="input input-bordered input-primary w-full" bind:value={searchString} on:change={queryBiomarkers}/>
		<button class="btn btn-primary ml-2" on:click={queryBiomarkers}>
			<iconify-icon icon="ic:baseline-search" width="20" height="20"></iconify-icon>
		</button>
	</div>

	<!-- SEARCH FILTERS -->
	<select class="select select-primary w-full my-1" bind:value={selectOrganSite} on:change={queryBiomarkers}>
		<option selected>--- Filter by Organ Site ---</option>
		{#each organSites as organSite}
			<option>{organSite}</option>
		{/each}
	</select>

	<div class="flex flex-row">
		<select class="select select-primary my-1 w-full" bind:value={selectedTestingSite}>
			<option selected>Markham Stouffville Hospital</option>
			{#each testingSites as testingSite}
				<option>{testingSite}</option>
			{/each}
		</select>
		<div class="flex flex-col p-2 items-center">
			<input type="checkbox" class="toggle toggle-success mx-1" bind:checked={checkboxFundedInHouse} />
			<p class="text-sm">
				{#if checkboxFundedInHouse}
					Filtered
				{:else}
					Funded
				{/if}
			</p>
		</div>
		
	</div>
	
	<!-- SEARCH RESULTS -->
	<!-- Number of results found -->
	<div class="flex justify-center">
		<em class="text-accent">{numSearchResults} results found</em>
	</div>

	<!-- Search Result - Cards -->
	{#each filterBiomarkers(biomarkers, checkboxFundedInHouse, selectedTestingSite) as biomarker (biomarker._id)}
		<div 
			out:fade={{ duration: 400 }}
			in:fade={{ delay: 400, duration: 400 }}
			animate:flip={{ delay: 450, duration: 400}}
		>
			<BiomarkerCard biomarkerData={biomarker} testingSite={selectedTestingSite}/>
		</div>
	{/each}
	
</div>
