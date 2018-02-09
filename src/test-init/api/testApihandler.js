const config = require(`../../config.js`);
const Mongo = require(`../mongoFunctions/mongo.js`); 
const stub = require(`../ResponseStub/ResponseStub.js`);
const encode = require('../../global/encode.js');
const chalk = require('chalk');

function apiTestInit(req,res){
    console.log(chalk.green(`Entering apiTestInit =========>`));
    let returnJsonObj = stub.testInit;
    JSON.stringify(returnJsonObj);
    console.log(chalk.green(`Existing apiTestInit =========>`));
    return res.json(returnJsonObj);
}

async function getEmail(req,res){
    console.log(chalk.green(`Entering getEmail =========>`));
    // find emial corresponding to this encrypted email
    // let eid = req.query.eid; //contains encrypted email
    let eid = req.params.eid; //contains encrypted email
    console.log(chalk.yellow("eid===>",eid));
    let email = await encode.decryptEmail(eid); //plaintext email
    console.log(chalk.yellow("email===>",email));
    let name = await Mongo.getName(email);
    console.log(chalk.yellow("name in GetMail====>",name));
    if(name != false){
        let returnJsonObj = stub.getEmail(name);
        JSON.stringify(returnJsonObj);
        console.log(chalk.green(`Exiting getEmail =========>`));
        return res.json(returnJsonObj);
    }
    else{
        let returnJsonObj = stub.urlExpired;
        JSON.stringify(returnJsonObj);
        console.log(chalk.green(`Exiting getEmail =========>`));
        return res.json(returnJsonObj);
        }
}

async function getSkills(req,res){
    let questionObj = req.query; // object {"Sales_cloud_Objective":5,"Apex_Subjective":5,"VF_Pages_Objective":5}
    let questions = [];
    let questionSet;
    let flag;
    Object.keys(questionObj).forEach(function(key,index) {
        flag =true;
        let type = key.substr(key.lastIndexOf('_')+1);
        let cat = key.substr(0,key.lastIndexOf('_')).replace(/[^a-zA-Z]/g, '');
        let obj = {};
        obj['Type'] = type.toLowerCase();
        obj['Cat'] = cat.toLowerCase();
        obj['Value'] = parseInt(questionObj[key],10);
        //console.log('QOBJ '+index+' =>'+obj);
        if(isNaN(obj.Value)){
            console.log(chalk.red(` Error in Fetching Skills `));
            res.status(500).json({ error: 'something blew up' });  // error
            flag = false;
            return;
        }
        questions.push(obj);
    });
    if(flag == false){
        console.log(chalk.red(`outside foreach loop==> `));
    }
    else{
        questionSet = await Mongo.getQuestions(questions);
        //console.log(questionSet);
        // return res.json(JSON.stringify(questionSet));
        res.json(questionSet);
    }
    return res.end();
}

let num_correct =0;
let score;

function checkScore(qa){
    score = 0;
    for(let i=0;i<qa.length;i++){
        //check Objective Questions
        if((qa[i]['qtype'] == 'objective') && (qa[i]['answer'] == qa[i]['userAnswer'])){
            num_correct++;
            score = score + qa[i]['marks'];
            qa[i]['score'] = qa[i]['marks'];
        }
        else{
            qa[i]['score'] = 0;
        }
        //check Subjective Questions
        //Insert Each qa record in new collection
    }
}
async function getResult(req,res){
    let qa = req.body.qa; //qa is array of all question & answer JSON
    let enc_email = req.body.email; // encrypted email 
    let email = await encode.decryptEmail(enc_email); //plaintext email
    await checkScore(qa);
    Mongo.insertInterviewRecord(qa,email);
    return res.json({"score" :score,"total_questions" : qa.length  , "total_correct": num_correct });
}



module.exports.apiTestInit= apiTestInit;
module.exports.getEmail= getEmail;
module.exports.getSkills= getSkills;
module.exports.getResult= getResult;
