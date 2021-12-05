const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const dbName = 'task-app'
const ObjectId = mongodb.ObjectId;
mongoClient.connect(connectionURL, {useNewUrlParser:true}, (error,client) => {
    if(error){
        return console.log('Unable to connect')
    }

    const db = client.db(dbName)
    db.collection('tasks').findOne({_id: ObjectId("61acc4b321736d514815691a")},(error, result)=>{
        if (error){
            return console.log(error)
        }
        console.log(result)
        client.close()
    })
    // 
    
})