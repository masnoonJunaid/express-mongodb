const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/';
const dbname = 'testServer';

MongoClient.connect(url,(err,client) => {
	assert.equal(err,null);
	console.log('Connected correctly to server');

	const db = client.db(dbname);
	const collection = db.collection('dishes');
	
	collection.insertOne({"name": "Uthappizza", "description":"test"}, (err,result) => {
	//check to make sure error is not null
		assert.equal(err, null); 

		console.log('After Insert:\n');
		//to check how many operations took
		console.log(result.ops);

		//Try to search all the collection in the record
		collection.find({}).toArray((err,docs) => {
			assert.equal(err, null);
 //To make sure the document that  we are inserted  in the previous operation is indeed in the  collection so we
                        //will print that out here


			console.log('Found:\n');
			

			//Will return all of the collection according to whatever criteria you provided
			console.log(docs);
			

//dropCollection method to drop the specific collection dishes

			db.dropCollection('dishes', (err,result) => {
//returns an error or an rusult
				assert.equal(err,null);
				client.close();
			});

		});
	});
})
