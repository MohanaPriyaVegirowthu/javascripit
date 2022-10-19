const { MongoClient, ObjectID, ObjectId } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName)
    
    // db.collection('users').findOne({ _id: new ObjectID("5c1113239cbfe605241f9071") }, (error, user) => {
    //     if (error) {
    //         return console.log('Unable to fetch')
    //     }

    //     console.log(user)
    // })

    db.collection('users').find({ age: 27 }).toArray((error, users) => {
       
        console.log(users)
    })

    db.collection('tasks').findOne({ _id: new ObjectId("634d68c88b5bc18cc3ea4386") }
    )

    db.collection('tasks').find({ completed: false }).toArray((error,tasks) =>{
             console.log(tasks)
    }  )
})