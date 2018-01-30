'use strict';
console.log('Entering router.js...');
//let config = require('./config.js');
const apiWelcomeUserFunctionController = require(`./welcome-user/api/userApiHandler.js`);
const apiTestFunctionController = require('./test-init/api/testApihandler.js');
let fs = require('fs');
const chalk = require('chalk');


let appRouter = function(app) {
    // Configuration and Property Lookup type requests
    // app.get("/PaymentType", function(req, res) {
    //     //res.send("Hello World");
    //     let PaymentType = config.PaymentType;
    // 	res.send(PaymentType);
    // });


    app.get('/',function(req,res){
        console.log(chalk.green('Inside=====GEt'));
        res.json('Hello World');
    });
    app.get('/getCandidate/:eid',async function(req,res){
        console.log(chalk.green('Entering GET Candidate'));
        await apiTestFunctionController.getEmail(req,res);
        console.log(chalk.green('Exiting GET Candidate'));
    });
    // app.get('/getCandidate',async function(req,res){
    //     console.log('Entering GET Candidate');
    //     await apiTestFunctionController.getEmail(req,res);
    //     console.log('Exiting GET Candidate');
    // });
    // app.get('/verifymail/:mail',function(req,res){
    //     console.log('Entering GET Verify Mail');
    //     await apiTestFunctionController.getVerifyMail(req,res);
    //     console.log('Exiting GET Verify Mail');
    // });
    app.get('/getSkills',async function(req,res){
        //receives skill set for candidate and generates random question bag accordingly
        console.log(chalk.green('Entering GET SKills'));
        await apiTestFunctionController.getSkills(req,res);
        console.log(chalk.green('Exiting GET SKills'));
    });

    app.post('/getResult',async function(req,res){
        console.log(chalk.green('Entering GET getResult'));
        await apiTestFunctionController.getResult(req,res);
        console.log(chalk.green('Exiting GET getResult'));
    });


    app.post('/hook', async function(req, res) {
        console.log("inside router app.post: ");
        console.log(req.body);

        
        if (req.body.result.metadata.intentName == "welcome-intent") {   
            console.log("welcome-intent");
            await apiWelcomeUserFunctionController.apiDefaultWelcome(req, res);
            console.log("Exiting welcome-intent---->");
        }
        
        if (req.body.result.metadata.intentName == "get-email") {   
            console.log("get-email");
            await apiWelcomeUserFunctionController.apiGetEmail(req, res);
            console.log("Exiting get-email---->");
        }
        
        if (req.body.result.metadata.intentName == "get-email-otp") {   
            console.log("get-email-otp");
            await apiWelcomeUserFunctionController.apiGetEmailOtp(req, res);
            console.log("Exiting get-email-otp---->");
        }
        if (req.body.result.metadata.intentName == "get-new-user-name") {   
            console.log("get-new-user-name");
            await apiWelcomeUserFunctionController.apiGetUserName(req, res);
            console.log("get-new-user-name---->");
        }
        if (req.body.result.metadata.intentName == "get-new-user-phone") {   
            console.log("get-new-user-phone");
            await apiWelcomeUserFunctionController.apiGetUserPhone(req, res);
            console.log("get-new-user-phone---->");
        }
        if (req.body.result.metadata.intentName == "get-new-user-dob") {   
            console.log("get-new-user-dob");
            await apiWelcomeUserFunctionController.apiGetUserDob(req, res);
            console.log("get-new-user-dob---->");
        }
        if (req.body.result.metadata.intentName == "test-init") {   
            console.log("test-init");
            await apiTestFunctionController.apiTestInit(req, res);
            console.log("test-init---->");
        }
        
        

    });

}

module.exports = appRouter;
console.log('Exiting router.js...');
