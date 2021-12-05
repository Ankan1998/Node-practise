const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const dbName = 'task-app'
mongoClient.connect(connectionURL, {useNewUrlParser:true}, (error,client) => {
    if(error){
        return console.log('Unable to connect')
    }

    const db = client.db(dbName)
    // find return cursor instead of documents as findOne
    db.collection('tasks').find({completed:"false"}).toArray((error,result)=>{
        if(error){
            return console.log("Error occured during fetching")
        }
        console.log(result)
        client.close()
    })
    // 
    
})