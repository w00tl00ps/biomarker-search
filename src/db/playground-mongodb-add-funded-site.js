use('cco-biomarkers');

const biomarkers = db.getCollection('biomarkers');

/**
 * Query to split the testing sites and place into a new field
 */

biomarkers.aggregate([
  {
    $addFields: {
      fundedSites: {$split: ["$Testing Sites", "\n"]}
    }
  },
  {
    $merge: {
      into: "biomarkers", // collection to merge
      whenMatched: "merge", // update existing documents
      whenNotMatched: "insert" // insert document if it's new
    }
  }

]);