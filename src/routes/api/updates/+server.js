/**
 * api/updates
 * 
 * get the most recently updated biomarkers
 * 
 */

import { json } from '@sveltejs/kit';
import { biomarkers } from '$lib/db/biomarkers';

/** @type {import('../biomarkers/$types').RequestHandler} */
export async function GET({url}) {

  // run the mongoDB query based on the search parameters
  const data = await biomarkers.aggregate (
    [
      {
        '$group': {
          '_id': {
            '$dateToString': {
              'format': '%Y-%m-%d', 
              'date': '$CCO Funded Date'
            }
          }, 
          'biomarkers': {
            '$push': '$$ROOT'
          }
        }
      }, {
        '$sort': {
          '_id': -1
        }
      }, {
        '$limit': 1
      }
    ]
  ).toArray();
      
  console.log("GET from /api/updates",data);
  return json(data);   
}