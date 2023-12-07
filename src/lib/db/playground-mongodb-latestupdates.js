// Latest updates
use('cco-biomarkers');

const biomarkers = db.getCollection('biomarkers');

biomarkers.aggregate (
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
);