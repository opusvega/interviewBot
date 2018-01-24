const config = require(`../../config.js`);
const Mongo = require(`../mongoFunctions/mongo.js`); 
const stub = require(`../ResponseStub/ResponseStub.js`);
const encode = require('../../global/encode.js');

function apiTestInit(req,res){
    console.log(`Entering apiTestInit =========>`);
    let returnJsonObj = stub.testInit;
    JSON.stringify(returnJsonObj);
    console.log(`Existing apiTestInit =========>`);
    return res.json(returnJsonObj);
}

async function getEmail(req,res){
    console.log(`Entering getEmail =========>`);
    // find emial corresponding to this encrypted email
    // let eid = req.query.eid; //contains encrypted email
    let eid = req.params.eid; //contains encrypted email
    console.log("eid===>",eid);
    let email = await encode.decryptEmail(eid); //plaintext email
    console.log("email===>",email);
    let name = await Mongo.getName(email);
    console.log("name in GEtMeail====>",name);
    if(name != false){
        let returnJsonObj = stub.getEmail(name);
        JSON.stringify(returnJsonObj);
        console.log(`Exiting getEmail =========>`);
        return res.json(returnJsonObj);
    }
    else{
        let returnJsonObj = stub.urlExpired;
        JSON.stringify(returnJsonObj);
        console.log(`Exiting getEmail =========>`);
        return res.json(returnJsonObj);
        }
}

// async function getVerifyMail(req,res){
//     console.log('Entering getVerifyMail');
//     let mail = req.params.mail;
//     //generate otp and send it to salesforce
//     console.log('Exiting getVerifyMail');
// }

async function getSkills(req,res){
    let questionObj = req.query; // object {"Sales_cloud_Objective":5,"Apex_Subjective":5,"VF_Pages_Objective":5}
    let questions = [];
    Object.keys(questionObj).forEach(function(key,index) {
        let type = key.substr(key.lastIndexOf('_')+1);
        let cat = key.substr(0,key.lastIndexOf('_')).replace(/[^a-zA-Z]/g, '');
        let obj = {};
        obj['Type'] = type;
        obj['Cat'] = cat.toLowerCase();
        obj['Value'] = questionObj[key];
        //console.log('QOBJ '+index+' =>'+obj);
        console.log('QOBJ.type '+index+' =>'+obj.Type);
        console.log('QOBJ.cat '+index+' =>'+obj.Cat);
        console.log('QOBJ.value '+index+' =>'+obj.Value);
        questions.push(obj);
    });
    let questionSet = await Mongo.getQuestions(questions);
    //console.log(questionSet);
    // return res.json(JSON.stringify(questionSet));
    return res.json(questionSet);
}

let num_correct =0;
let score = 0;

function checkScore(qa){
    for(let i=0;i<qa.length;i++){
        //check Objective Questions
        if((qa[i]['qtype'] == 'Objective') && (qa[i]['answer'] == qa[i]['userAnswer'])){
            num_correct++;
            score = score + qa[i]['marks'];
        }
        //check Subjective Questions
        //Insert Each qa record in new collection
    }
}
async function getResult(req,res){
    let qa = req.body.qa; //qa is array of all question & answer JSON
    let enc_email = req.body.email; // encrypted email 
    let email = await encode.decryptEmail(enc_email); //plaintext email
   
    Mongo.insertInterviewRecord(qa,email);
    await checkScore(qa);
    return res.JSON(score);
}



module.exports.apiTestInit= apiTestInit;
module.exports.getEmail= getEmail;
module.exports.getSkills= getSkills;
module.exports.getResult= getResult;
