const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectId

const id = new ObjectID
console.log(id)
console.log(id.id.length)
console.log(id.toHexString().length)
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }
    console.log('connected')
    const db = client.db(databaseName)
    db.collection('users').insertOne({
        _id:id,
        name: 'ruchi',
        age: 25
    })
    // db.collection('users').insertOne(
    //     { name: "Barronette Peak" },
    //     function(error, result) {
    //       if (!error) {
    //         console.log(`Operation completed successfully: ${result.ok}`);
    //       } else {
    //         console.log(`An error occurred: ${error}`);
    //       }
    //     },
    //   );

})