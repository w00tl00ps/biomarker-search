/**
 * api/biomarkers
 * query parameters: search, and organSite
 * 
 * API endpoint to test a database query with a search string
 */

import { json } from '@sveltejs/kit';

import { biomarkers } from '../../../db/biomarkers';

/** @type {import('../biomarkers/$types').RequestHandler} */
export async function GET({url}) {

    // get the search string
    const searchString = url.searchParams.get("search");
    console.log("Search String:", searchString);

    const searchOrganSite = url.searchParams.get("organSite");
    console.log("Organ Site:", searchOrganSite);

    // filter organ sites, if defined in query parameter
    let matchOrganSite 
    if (searchOrganSite) {
        matchOrganSite = searchOrganSite
    }
    else {
        matchOrganSite = {'$exists': true };
    }
    

    // create the aggregation pipeline
    const agg = [
        {
            '$search': {
              'index': 'cco-biomarker-search-index', 
              'text': {
                'query': `${searchString}`, 
                'path': {
                  'wildcard': '*'
                }
            }
          }
        },
        {
            '$match': {
                'OrganSite': matchOrganSite
            }
        }
      ];

    // run the mongoDB query based on the search parameters
    const data = await biomarkers.aggregate(agg).toArray();

    // create a cleaned copy of the search results
    const cleanedData = data.map( d => ({
        _id: d._id.toString(),
        ShortName: d.ShortName,
        OrganSite: d.OrganSite,
        Biomarkers: d.Biomarkers,
        Indication: d['Testing Indication'],
        FundedDate: d['CCO Funded Date'],
        TestingSite: d['Testing Sites'],
        Notes: d['Notes']
    }))

    // return the Array of search results
    // DEBUG: console.log(cleanedData);
    return json(cleanedData);   
}