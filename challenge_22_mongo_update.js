const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const dbName = 'task-app'
const ObjectId = mongodb.ObjectId;
mongoClient.connect(connectionURL, {
    useNewUrlParser: true
}, (error, client) => {
    if (error) {
        return console.log('Unable to connect')
    }

    const db = client.db(dbName)
    // returns a promise
    db.collection('tasks').updateOne({
        _id: ObjectId("61acc4b321736d514815691a")
    }, {
        $set: {
            task: "Buys milk"
        }

    }).then((result) => {
        console.log(result)
    }).catch((e) => {
        console.log(e)
    })
    

})