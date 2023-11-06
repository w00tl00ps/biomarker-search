/**
 * api/organsites
 * 
 * API endpoint to obtain a list of organsites in the biomarker collection
 */

import { json } from '@sveltejs/kit';

import { biomarkers } from '../../../db/biomarkers';

/** @type {import('../biomarkers/$types').RequestHandler} */
export async function GET() {

    const data = await biomarkers.distinct("OrganSite");

    console.log(data);

    return json(data);   
}