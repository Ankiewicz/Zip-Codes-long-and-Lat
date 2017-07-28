var MongoClient = require('mongodb').MongoClient
var assert = require('assert')
var fs = require('fs')

// Connection URL
var url = 'mongodb://localhost:27017/zipLongLat';


// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
  var collection = db.collection('zipLongLat');
    fs.readFile('2015_Gaz_counties_national.txt', "utf8", (err, data) => {
      if (err) throw err;
    	let libraryOfZipzLongLat = data.split('\n')
    	  for (var i = 0; i < libraryOfZipzLongLat[i].length; i++) {

          for (var i = 0; i < libraryOfZipzLongLat[i].length; i++){
            var val = libraryOfZipzLongLat[i].split("\t")
             obj = {
              ZIPCODEGEOID: val[1],
              STATE: val[0],
              COUNTY: val[3],
              INTPTLAT: val[8],
              INTPTLONG: val[9]
            }
            collection.insertOne(obj)
          }
          // delete obj
          // Thought maybe if I deleted the object after it was completed, I could resolve my --
          // FATAL ERROR: CALL_AND_RETRY_LAST Allocation failed - JavaScript heap out of memory
          //... Did not work
    	  }
        console.log(" documents inserted into DB")
        db.close()
      });
});
