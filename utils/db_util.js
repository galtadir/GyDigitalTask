const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionUrl = 'mongodb://127.0.0.1:27017'
const databaseName = 'GYdigital'

async function getUrlsFromString(url){
    try{
        const client = await MongoClient.connect(connectionUrl, {useNewUrlParser:true})
        const db = client.db(databaseName)
        const findItem = await db.collection('Imposters').findOne({url})
        client.close()
        if(findItem){
            return findItem.imposters
        }
        else{
            return null
        }
    }
    catch(error){
        return null
    }
}

async function addOneToDb(url,imposters){
    try{
        const client = await MongoClient.connect(connectionUrl, {useNewUrlParser:true})
        const db = client.db(databaseName)
        await db.collection('Imposters').insertOne({
            url ,
            imposters
        })
        client.close()
        return
    }
    catch(error){
        return 
    }
}

async function deleteByUrl(url){
    try{
        const client = await MongoClient.connect(connectionUrl, {useNewUrlParser:true})
        const db = client.db(databaseName)
        let deleted = await db.collection("Imposters").deleteMany({url})
        client.close()
        if(deleted.deletedCount>0){
            return true
        }
        else{
            return false
        }

    }
    catch(error){
        return false
    }
}

async function deleteAll(){
    try{
        const client = await MongoClient.connect(connectionUrl, {useNewUrlParser:true})
        const db = client.db(databaseName)
        let deleted = await db.collection("Imposters").deleteMany({})
        client.close()
        if(deleted.deletedCount>0){
            return true
        }
        else{
            return false
        }
    }
    catch(error){   
        return false
    }
}

exports.getUrlsFromString = getUrlsFromString;
exports.addOneToDb = addOneToDb;
exports.deleteByUrl = deleteByUrl;
exports.deleteAll = deleteAll;




