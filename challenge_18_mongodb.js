const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const dbName = 'task-app'

mongoClient.connect(connectionURL, {useNewUrlParser:true}, (error,client) => {
    if(error){
        return console.log('Unable to connect')
    }

    const db = client.db(dbName)
    db.collection('tasks').insertMany([
        {
            task:"Teams meeting at 9 A.M",
            completed:"false"
        },
        {
            task:"Meeting Alex at 5 P.M",
            completed:"false"
        }
    ], (error,result) => {
        if(error){
            return console.log("Unable to Insert record")
        }
        console.log("Record Inserted ")
        client.close()
    })
    
})