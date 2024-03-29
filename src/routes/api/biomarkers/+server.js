/**
 * api/biomarkers
 * query parameters: search, and organSite
 * 
 * API endpoint to test a database query with a search string
 */

import { json } from '@sveltejs/kit';

import { biomarkers } from '$lib/db/biomarkers';

/** @type {import('../biomarkers/$types').RequestHandler} */
export async function GET({url}) {

    // get the search string
    const searchString = url.searchParams.get("search");
    console.log("/api/biomarkers/ Search String:", searchString);

    const searchOrganSite = url.searchParams.get("organSite");
    console.log("/api/biomarkers/ Organ Site:", searchOrganSite);

    // filter organ sites, if defined in query parameter
    let matchOrganSite 
    if (searchOrganSite) {
        matchOrganSite = searchOrganSite
    }
    else {
        matchOrganSite = {'$exists': true };
    }
    
    // create the aggregation pipeline
    let agg = [];

    // allow for partial matches by using $match stage and a RegExp
    let searchRegex = new RegExp(".*" + searchString + ".*", "i");
    const searchStage = {
      $match: {
        $or: [
          {"OrganSite": searchRegex},
          {"Biomarkers": searchRegex},
          {"ShortName": searchRegex},
          {"Testing Indication": searchRegex}
        ]
        
      }
    };
    
    const matchStage = {
      '$match': {
          'OrganSite': matchOrganSite
      }
    };

    const sortStage = {
      $sort: {
        'ShortName': 1
      }
    }

    // only add aggregation stages if parameters are valid / exists
    if (searchString != "") {
      agg.push(searchStage);
    }
    if (matchOrganSite) {
      agg.push(matchStage);
    }
    agg.push(sortStage);
  
    console.log("/api/biomarkers/: Search pipeline: ", agg);

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
        FundedSites: d['fundedSites'],
        Notes: d['Notes']
    }))

    // return the Array of search results
    // DEBUG console.log(cleanedData);
    return json(cleanedData);   
}