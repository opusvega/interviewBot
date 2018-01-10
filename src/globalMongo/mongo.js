const config = require(`../config.js`);
const MongoClient = require(`mongodb`).MongoClient;
var DateDiff = require('date-diff');
var db = null;

async function getdb() {
    try{
        if(db){
            return db;
        }
        else{
            const database = await MongoClient.connect(config.mongourl);
            db = database;
            console.log("Mongo Connected.......");
            return db;
        }
        
    }
    catch (err){
        console.log(`ERROR DB :=========> `,err);
    }
}

module.exports.getdb = getdb;