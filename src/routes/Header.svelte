<script>
	import { page } from '$app/stores';
	import 'iconify-icon';
</script>

<header>
	<div class="navbar bg-primary text-primary-content">
		<div class="navbar-start">
			<div class="dropdown">
				<div tabindex="0" role="button" class="btn btn-ghost md:hidden">
				  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
				</div>
				<ul class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-primary rounded-box w-52">
					<li>
						<a href="/">Search</a>
					</li>
					<li>
						<a href="/updates">Recent Updates</a>
					</li>
					<li>
						<a href="/about">About</a>
					</li>
				</ul>
			</div>
		  <a class="btn btn-ghost normal-case text-xl" href="/">CCO Biomarker Search</a>
		</div>
		<div class="navbar-end hidden md:flex">
		  <ul class="menu menu-horizontal px-1">
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/"><iconify-icon icon="ic:baseline-search" width="25" height="25"></iconify-icon></a>
			</li>
			<li aria-current={$page.url.pathname === '/updates' ? 'page' : undefined}>
				<a href="/updates">Recent Updates</a>
			</li>
			<li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
				<a href="/about">About</a>
			</li>
		  </ul>
		</div>
	</div>
</header>

<style>

	/* create navigation arrow on top of link */
	li[aria-current='page']::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--color-theme-1);
	}


	a:hover {
		color: var(--color-theme-1);
	}
</style>
