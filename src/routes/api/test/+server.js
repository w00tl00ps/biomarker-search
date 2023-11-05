// api/test API endpoint to test functionality in SvelteKit

import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export function GET({ url }) {
    // console.log("api/test GET:", url);
    return json({message: url});   
}