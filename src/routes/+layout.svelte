<script>
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { webVitals } from '$lib/vitals';
	import { fade } from 'svelte/transition';
	import logo from '$lib/images/svelte-logo.svg';
	import github from '$lib/images/github.svg';
	import Header from './Header.svelte';
	import './styles.css';
	import "../app.css";


	/** @type {import('./$types').LayoutData} */
	export let data;

	$: if (browser && data?.analyticsId) {
		webVitals({
			path: $page.url.pathname,
			params: $page.params,
			analyticsId: data.analyticsId
		});
	}
</script>

<div class="app">
	<Header />

	<!-- key elements for page transitions-->
	{#key data.pathname}
	<main in:fade={{ duration: 300, delay: 400 }} out:fade={{ duration: 300 }}>
		<slot />
	</main>
	{/key}

	<footer>
		<div>2023 Created by Howard Yang</div>
		<div class="corner">
			<a href="https://kit.svelte.dev">
				<img src={logo} alt="SvelteKit" />
			</a>
		</div>
		<p>Built using <a href="https://kit.svelte.dev">SvelteKit - kit.svelte.dev</a></p>
		<div class="corner">
			<a href="https://github.com/w00tl00ps/biomarker-search">
				<img src={github} alt="GitHub" />
			</a>
		</div>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		margin: 0 auto;
		box-sizing: border-box;
		justify-content: flex-start;
		align-items: center;
	}

	footer {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}

	.corner {
		width: 3em;
		height: 3em;
	}

	.corner a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.corner img {
		width: 2em;
		height: 2em;
		object-fit: contain;
	}
</style>
