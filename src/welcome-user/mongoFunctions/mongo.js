const config = require(`../../config.js`);
const MongoClient = require(`mongodb`).MongoClient;
var DateDiff = require('date-diff');
var mongo = require("../../global/mongo.js");


async function insertEmail(EMAIL, otpcode){
    var DB = await mongo.getdb()
    let res = await DB.collection("CandidateRecord").updateOne({email:EMAIL},{$set : {otp : otpcode}},{upsert:true});
    //console.log(res);
}

async function checkOtpisValid(req){
    let EMAIL = req.body.result.parameters.email;
    let otpcode = req.body.result.parameters.otp;
    console.log("inside checkOtpisValid====>email ",EMAIL," otpcode ",otpcode);
    var DB = await mongo.getdb()
    let result = await DB.collection('CandidateRecord').find({email:EMAIL}).toArray();
    console.log("inside checkOtpisValid======>result ",result);
    if(result[0].otp == otpcode){
        return true;
    }
    else{
        return false;
    }
}

async function checkUser(EMAIL){
    var DB = await mongo.getdb()
    let result = await DB.collection('CandidateRecord').find({email:EMAIL,name:{$exists:true}}).toArray();
    if(result.length == 0){
        return false; //new user
    }
    else{
        return true;
    }
}
async function checkLastAppearance(EMAIL){
    var DB = await mongo.getdb()
    let result = await DB.collection('CandidateRecord').find({email:EMAIL}).toArray();
    //find date diff
    console.log("inside checkLastAppearance=====> result ",result," result[0]",result[0]);
    let examDate = new Date(result[0].lastAppeared);
    let diff = new DateDiff(new Date(), examDate);
    let months = diff.months();
    console.log(`Months DIff======>`,months);
    if(months > 6){
        return true;
    }
    else{
        return false;
    }
}
async function insertUser(req){
    let EMAIL = req.body.result.parameters.email;
    let USERNAME = req.body.result.parameters.username;
    let DOB = req.body.result.parameters.dob;
    let PHONE = req.body.result.parameters.phone;
    var DB = await mongo.getdb()
    await DB.collection('CandidateRecord').updateOne({email: EMAIL},
        {
        $set : 
            {
            name:USERNAME,
            phone: PHONE,
            dob: new Date(DOB),
            lastAppeared : new Date()
            }
        },
    {
        upsert:true
    });

}

module.exports.insertEmail = insertEmail;
module.exports.checkOtpisValid = checkOtpisValid;
module.exports.checkUser = checkUser;
module.exports.checkLastAppearance = checkLastAppearance;
module.exports.insertUser = insertUser;
