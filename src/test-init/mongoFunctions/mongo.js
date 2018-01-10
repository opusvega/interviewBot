const config = require(`../../config.js`);
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

function randomQues(){
    var arr = [];
    while(arr.length < config.num_of_ques){
        var randomQid = Math.floor(Math.random()*config.total_ques) + 1;
        if(arr.indexOf(randomQid) > -1) continue;
        arr[arr.length] = randomQid;
    }
    console.log(arr);
    return arr;
}