const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

const url = 'mongodb://localhost:27017/learning_mongo';
MongoClient.connect(url, { useNewUrlParser: true } , (err, db) => {
    console.log('Connected to your local hosted MongoDb Server!');
    db.close();
});
