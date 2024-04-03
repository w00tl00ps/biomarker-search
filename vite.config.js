import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';

const file = fileURLToPath(new URL('package.json', import.meta.url));
const json = readFileSync(file, 'utf8');
const pkg = JSON.parse(json);

export default defineConfig({
	plugins: [sveltekit()],
	define: {
        VERSION: JSON.stringify(pkg.version)
    },
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});