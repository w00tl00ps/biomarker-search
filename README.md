# CCO Biomarker Search

The objective of this app is to create a search of funded CCO biomarker tests as published on the [CCO website](https://www.cancercareontario.ca/en/cancer-care-ontario/programs/clinical-services/pathology-laboratory-medicine).

This web application solely retrieves publicly accessible data and does not store, collect, or have access to any personally identifiable or sensitive health information.

## Built with

1. SvelteKit
2. TailwindCSS
3. DaisyUI
4. MongoDB
5. Vercel

## Key Features and App Design

1. Search From
	1. Simple textbox for text search
	2. Advanced filters: by organ site, by testing site
	3. Highlight if test funded or not
2. Display the search results with expandable details for each result
3. Data is retreived from a MongoDB database

### MongoDB Configuration

The connection to the MongoDB is defined in a `.env` file with the following fields:
```bash
MONGO_URL = URL + credentials to the MongoDB
MONGO_DB = the name of the database to connect to
```

Currently, the name of the collection inside the database must be called "biomarkers".

### MongoDB Data Structure Format

The data is currently stored in the following format. (Not all fields are currently being used in the app).

```json
{
  "_id": {
    "$oid": "65430bdb6382e17f87770f23"
  },
  "OrganSite": "Adrenal Gland",
  "Biomarkers": "MLH1, MSH2, MSH6, PMS2",
  "ShortName": "MMR (Adrenal)",
  "CCO Funded Status": "Funded",
  "CCO Funded Date": {
    "$date": "2023-01-31T05:00:00Z"
  },
  "Testing Indication": "Reflex testing on newly diagnosed tumours with adrenal cortical carcinoma",
  "Testing Sites": "Grand River Hospital\nHamilton Health Sciences/ St. Joseph’s Healthcare Hamilton\nHealth Sciences North\nHospital for Sick Children (SickKids)\nKingston Health Sciences Centre\nLakeridge Health\nLondon Health Sciences Centre\nMount Sinai Hospital\nSunnybrook Health Sciences Centre\nThe Ottawa Hospital\nTrillium Health Partners - Credit Valley Site\nUnity Health - St. Michael's Hospital\nUniversity Health Network\nWilliam Osler Health System\nDynacare",
  "OrganSiteID": 1,
  "BiomarkerID": 3,
  "fundedSites": [
    "Grand River Hospital",
    "Hamilton Health Sciences/ St. Joseph's Healthcare Hamilton",
    "Health Sciences North",
    "Hospital for Sick Children (SickKids)",
    "Kingston Health Sciences Centre",
    "Lakeridge Health",
    "London Health Sciences Centre",
    "Mount Sinai Hospital",
    "Sunnybrook Health Sciences Centre",
    "The Ottawa Hospital",
    "Trillium Health Partners - Credit Valley Site",
    "Unity Health - St. Michael's Hospital",
    "University Health Network",
    "William Osler Health System",
    "Dynacare"
  ]
}
```


## Design Roadmap

To-Do list of features to implement:
 - [ ] Sort testing sites by distance to the in-house institution

 Build out search capability
 - [x] Handle text based search from a textbox
 - [x] Serve results to a simple component

Completed tasks:
 - [x] Build link to MongoDB and a simple query
 - [x] Server query results to a page with basic formatting
 - [x] Build API endpoints for queries to support search capability
	 - [x] Build `/api/biomarkers`
		 - [x] Search string capability
		 - [x] Allow for filtering by organSite
 - [x] Highlight important keywords within the testing indication to improve clarity (e.g. "reflex testing")
   - [x] Emphasis on "Reflex Testing" 
 - [x] Allow for selecting and filtering by testing site
 - [x] Show a list of most recently updated / added tests (based on CCO Funded Date)

