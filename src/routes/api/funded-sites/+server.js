/**
 * api/funded-sites
 * 
 * API endpoint to obtain a list of funded testing sites in the biomarker collection
 */

import { json } from '@sveltejs/kit';

import { biomarkers } from '$lib/db/biomarkers';

/** @type {import('../biomarkers/$types').RequestHandler} */
export async function GET() {

    const data = await biomarkers.distinct("fundedSites");

    //console.log(data);

    return json(data);   
}