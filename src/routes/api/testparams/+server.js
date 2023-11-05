/**
 * api/testparams
 * 
 * API endpoint to test GET with parameters in SvelteKit
 * Returns JSON object with key-value pairs of all query parameters
 */

import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export function GET({ url }) {

    console.log("url.searchParams:", url.searchParams);

    const queryParams = url.searchParams;

    // Initialize an object to store key-value pairs
    const paramsObject = {};

    // Loop through the parameters and store key-value pairs in the object
    for (const [key, value] of queryParams) {
        paramsObject[key] = value;
      }
    
    return json(paramsObject);   
}