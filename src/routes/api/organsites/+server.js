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
    // create a cleaned copy of the search results
    /*const cleanedData = data.map( d => ({
        _id: d._id.toString(),
        ShortName: d.ShortName,
        OrganSite: d.OrganSite,
        Biomarkers: d.Biomarkers,
        Indication: d['Testing Indication'],
        FundedDate: d['CCO Funded Date'],
        TestingSite: d['Testing Sites'],
        Notes: d['Notes']
    }))*/

    // return the Array of search results
    // DEBUG: console.log(cleanedData);
    return json(data);   
}