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
    	  for (var i = 0; i <= libraryOfZipzLongLat.length; i++) {
          if(libraryOfZipzLongLat[i]){
            var val = libraryOfZipzLongLat[i].split("\t")
          }
            console.log('val =', val, typeof val)
               var obj = {
                ZIPCODEGEOID: val[1],
                STATE: val[0],
                COUNTY: val[3],
                INTPTLAT: val[8],
                INTPTLONG: val[9]
              }
                collection.insertOne(obj)
                console.log(obj)
    	  }
        console.log(" documents inserted into DB", libraryOfZipzLongLat.length)
        db.close()
      });
});
