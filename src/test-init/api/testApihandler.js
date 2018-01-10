const config = require(`../../config.js`);
const Mongo = require(`../mongoFunctions/mongo.js`); 
const stub = require(`../ResponseStub/ResponseStub.js`);


function apiTestInit(req,res){
    console.log(`Entering apiTestInit =========>`);
    let returnJsonObj = stub.testInit;
    JSON.stringify(returnJsonObj);
    console.log(`Existing apiTestInit =========>`);
    return res.json(returnJsonObj);
}