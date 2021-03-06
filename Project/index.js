const mongodb = require('mongodb');
const hapi = require('hapi');


const MongoClient = mongodb.MongoClient;
//our host url
const url = 'mongodb://localhost:27017/';
// const url = 'mongodb://localhost:27017';
//specifying out database selection
const dbName = 'learning_mongo';
let database = '';

//create a server that listens on port 8080
const server = hapi.server({
    port: 8080,
    host: 'localhost'
});

server.route([
    // Get tour list
    {
        method: 'GET',
        path: '/api/tours',
        handler: async(request, reply)=>
        {
            const collection =  database.collection('tours');
            const result = await (collection.find().toArray((error, tours) =>
            {
                // return("Getting tour list!");

                // const response = reply.response(tours);
                // response.type('text/plain');
                return tours;

            }));
            return result;
        }
    },
    // Add new tour
    {
        method: 'POST',
        path: '/api/tours',
        handler: function(request, reply)
        {
            return("Adding new tour");
        }
    },
    // Get a single tour
    {
        method: 'GET',
        path: '/api/tours/{name}',
        handler: function(request, reply)
        {
            return("Retrieving " + request.params.name);
        }
    },
    // Update a single tour
    {
        method: 'PUT',
        path: '/api/tours/{name}',
        handler: function(request, reply)
        {
            // request.payload variables
            return("Updating " + request.params.name);
        }
    },
    // Delete a single tour
    {
        method: 'DELETE',
        path: '/api/tours/{name}',
        handler: function(request, reply)
        {
            return("Deleting " + request.params.name).code(204);
        }
    },
    // Home page
    {
        method: 'GET',
        path: '/',
        handler: function(request, reply)
        {
            return("Hello world from Hapi/Mongo example.")
        }
    }
]);

//finds info with requested data
// const findDocuments = (db, callback) =>
// {
//     //collection we are trying to access
//     const collection = db.collection('tours');
//     //searching within the collection
//     collection.find({"tourPackage": "Snowboard Cali"}).toArray((error, docs) =>
//     {
//         console.log(docs);
//         callback();
//     })
// };


MongoClient.connect(url, {useNewUrlParser: true}, (err, db) =>
{
    //If we can't connect
    if(err)
    {
        console.log('Error We could\'nt connect to the MongoDB');
        return process.exit(1);
    }
    console.log('Connected to your local hosted MongoDb Server!');

    // database selection
    // const database = db.db(dbName);
    database = db.db(dbName);
    //search in the passed database
    // findDocuments(database, () =>
    // {
    //     //close the connection to the database
    //     db.close();
    // })

    // collection = database.collection('tours');
    server.start( (err) => {
        console.log(`Hapi server started `);
    })
});

