<script>
	import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import BiomarkerCard from '../components/BiomarkerCard.svelte';

	// INITIAL DATA ON PAGE LOAD
	/** @type {import('./$types').PageData} */
	export let data; // PageData type
	let {biomarkers} = data; // destructure the data prop to extract biomarkers array
	let {organSites} = data;

	// Debug logging when biomarkers updated (after query)
	$: console.log("/routes/+page.svelte -> biomarkers list updated, length:", biomarkers.length);

	// BIOMARKER SEARCH
	/** @type {string} */
	let searchString; // from textbox
	/** @type {string} */
	let selectOrganSite; // from select box
	/** @type {boolean} */
	let checkboxFundedInHouse = false; // from Funded in house checkbox
	$: console.log("/routes/+page.svelte -> checkboxFundedInHouse", checkboxFundedInHouse);

	// function to make GET call to API endpoint for biomarker data
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

	// APPLY FRONT-END FILTERS TO RESULTS
	// note: checkboxFundedInHouse is a parameter to trigger reactive call to function when checkbox is clicked
	/** @type {function(Array<any>, boolean): Array<any>} */
	const filterBiomarkers = (biomarkers, checkboxFundedInHouse) => {

		const inHouseSite = "Markham Stouffville Hospital"

		// apply funded in-house filter if checked
		if (checkboxFundedInHouse) { 
			return biomarkers.filter( (biomarker) => {
				if (biomarker.FundedSites.includes(inHouseSite) ) {
					return true;
				}
				else {
					return false;
				}
			});
		}
		return biomarkers;
	};

</script>

<svelte:head>
	<title>Biomarker Search</title>
	<meta name="description" content="CCO Biomarker Search" />
</svelte:head>


<div class="flex flex-col justify-center content-center w-full max-w-screen-xl">

	<!-- SEARCH BAR -->
	<select class="select select-primary w-full my-1" bind:value={selectOrganSite} on:change={queryBiomarkers}>
		<option selected>Select Organ Site</option>
		{#each organSites as organSite}
			<option>{organSite}</option>
		{/each}
	</select>
	
	<div class="flex flex-row my-1">
		<input type="text" placeholder="Search" class="input input-bordered input-primary w-full" bind:value={searchString} on:change={queryBiomarkers}/>
		<button class="btn btn-primary ml-2" on:click={queryBiomarkers}>Search</button>
	</div>

	<div class="form-control flex flex-row">
		<label class="cursor-pointer label">
		  <div class="label-text">Funded In-house</div> 
		  <input type="checkbox" class="toggle toggle-success mx-1" bind:checked={checkboxFundedInHouse} />
		</label>
	</div>
	
	<!-- SEARCH RESULTS -->
	{#each filterBiomarkers(biomarkers, checkboxFundedInHouse) as biomarker (biomarker._id)}
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
