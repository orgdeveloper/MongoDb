const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;
const url = 'mongodb://localhost:27017/learning_mongo';
// const url = 'mongodb://localhost:27017';
// const dbName = 'learning_mongo';


const findDocuments = (db, callback) => {
    const collection = db.collection('tours');

    collection.find({"tourPackage":"Snowboard Cali"}).toArray( (error, docs) => {
        console.log(docs);
        callback();
    })
};


MongoClient.connect(url, { useNewUrlParser: true } , (err, db) => {
    if (err) return process.exit(1);
    console.log('Connected to your local hosted MongoDb Server!');

    const database = db.db('learning_mongo');

    findDocuments(database, () => {
        db.close();
    })
});

