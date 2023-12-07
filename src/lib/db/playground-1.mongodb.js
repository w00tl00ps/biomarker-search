/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

use('cco-biomarkers');

const biomarkers = db.getCollection('biomarkers');

// Simple regex option
//biomarkers.find({"OrganSite": /.*colo.*/i});

let searchTerm = "– ";
let searchRegex = new RegExp(".*" + searchTerm + ".*", "i");

// Find within an array
biomarkers.find({fundedSites: { $elemMatch: { $eq: "Kingston Health Sciences"}}});



// Use Regex to Match Results
/*
const regexSearchResult = biomarkers.aggregate([
  {
    $match: {
      $or: [
        {"OrganSite": searchRegex},
        {"Biomarkers": searchRegex},
        {"ShortName": searchRegex},
        {"Testing Indication": searchRegex}
      ]
      
    }
  }
]);

console.log(regexSearchResult);
*/

/* 2023-11-17 Used to update funded site array to correct typos / discrepancies in naming
biomarkers.update(
  { fundedSites: "Hamilton Health Sciences/ St. Joseph’s Healthcare Hamilton" }, // Query criteria
  { $set: { "fundedSites.$": "Hamilton Health Sciences/ St. Joseph's Healthcare Hamilton" } }, // Update operation
  { multi: true } // To update multiple documents that match the criteria  
);
*/