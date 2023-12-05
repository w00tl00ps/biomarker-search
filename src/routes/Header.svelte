<script>
	import { page } from '$app/stores';
</script>

<header>
	<div class="navbar bg-primary text-primary-content">
		<div class="navbar-start">
		  <a class="btn btn-ghost normal-case text-xl" href="/">CCO Biomarker Search</a>
		</div>
		<div class="navbar-end">
		  <ul class="menu menu-horizontal px-1">
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/">Search</a>
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
