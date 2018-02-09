'use strict';
console.log('Entering router.js...');
//let config = require('./config.js');
const apiWelcomeUserFunctionController = require(`./welcome-user/api/userApiHandler.js`);
const apiTestFunctionController = require('./test-init/api/testApihandler.js');
let fs = require('fs');
const chalk = require('chalk');


let appRouter = function(app) {
 
    app.get('/',function(req,res){
        console.log(chalk.green('Inside /'));
        //console.log(chalk.green(req.ip));
        res.json('Hello World');
    });
    app.get('/getCandidate/:eid',async function(req,res){
        console.log(chalk.green('Entering GET Candidate'));
        await apiTestFunctionController.getEmail(req,res);
        console.log(chalk.green('Exiting GET Candidate'));
    });
    app.get('/getSkills',async function(req,res){
        //receives skill set for candidate and generates random question bag accordingly
        console.log(chalk.green('Entering GET SKills'));
        await apiTestFunctionController.getSkills(req,res);
        console.log(chalk.green('Exiting GET SKills'));
    });

    app.post('/getResult',async function(req,res){
        console.log(chalk.green('Entering POST getResult'));
        await apiTestFunctionController.getResult(req,res);
        console.log(chalk.green('Exiting POST getResult'));
    });  
}

module.exports = appRouter;
console.log('Exiting router.js...');
