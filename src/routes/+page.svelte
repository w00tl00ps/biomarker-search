<script>
	import Counter from './Counter.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="CCO Biomarker Search" />
</svelte:head>


<div class="drawer lg:drawer-open">
	<input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content flex flex-col items-center justify-center">
		<!-- Page content here -->
		<div class="flex flex-row">
			<!-- Search box -->
			<input type="text" placeholder="Search" class="input input-bordered input-primary w-full max-w-xs" />
			<!-- Search filters drawer button-->
			<label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">Search Filters</label>
		</div>
		
		<section>
			<p>Display search results here</p>
		</section>

	
	</div> 
	<div class="drawer-side top-20">
		<label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label> 
		<ul class="menu p-4 w-80 bg-base-200 text-base-content">
		<!-- Sidebar content here -->
		<li>Search Filters Here</li>
		<li><a>Sidebar Item 1</a></li>
		<li><a>Sidebar Item 2</a></li>
		</ul>
	
	</div>
</div>
	



<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

</style>
