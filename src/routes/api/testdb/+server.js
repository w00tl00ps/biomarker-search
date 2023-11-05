/**
 * api/testdb
 * 
 * API endpoint to test a database query with a search string
 */

import { json } from '@sveltejs/kit';

import { biomarkers } from '../../../db/biomarkers';

/** @type {import('./$types').RequestHandler} */
export async function GET({url}) {

    const searchString = url.searchParams.get("search");
    console.log(searchString);

    // define the aggregation pipeline parameters
    const agg = [
        {
          '$search': {
            'index': 'cco-biomarker-search-index', 
            'text': {
              'query': searchString, 
              'path': {
                'wildcard': '*'
              }
            }
          }
        }
      ];

    // run the mongoDB query based on the search parameters
    const data = await biomarkers.aggregate(agg).toArray();

    const cleanedData = data.map( d => ({
        _id: d._id.toString(),
        ShortName: d.ShortName,
        OrganSite: d.OrganSite,
        Biomarkers: d.Biomarkers,
        Indication: d['Testing Indication'],
        FundedDate: d['CCO Funded Date'],
        TestingSite: d['Testing Sites']
    }))


    console.log(cleanedData);

    return json(cleanedData);   
}