const config = require(`../../config.js`);
const Mongo = require(`../mongoFunctions/mongo.js`); 
const stub = require(`../ResponseStub/ResponseStub.js`);
const otp = require(`../../one-time-password/otp.js`);

async function apiDefaultWelcome(req,res){
    console.log(`Entering apiDefaultWelcome =========>`);
    let returnJsonObj = stub.welcomeSpeech;
    JSON.stringify(returnJsonObj);
    console.log(`Existing apiDefaultWelcome =========>`);
    return res.json(returnJsonObj);   
}

async function apiGetEmail(req,res){
    console.log(`Entering apiGetEmail =========>`);
    let EMAIL = req.body.result.parameters.email;
    let returnJsonObj = await stub.getEmail(EMAIL);
    JSON.stringify(returnJsonObj);
    let otpcode = await otp.sendOtp(EMAIL);
    await Mongo.insertEmail(EMAIL,otpcode);
    console.log(`Existing apiGetEmail =========>`);
    return res.json(returnJsonObj); 
}
async function apiGetEmailOtp(req,res){
    console.log(`Entering apiGetEmailOtp =========>`);
    let EMAIL = req.body.result.parameters.email;    
    let returnJsonObj = await stub.GetEmailOtp;
    JSON.stringify(returnJsonObj);
    let otpvaild =  await Mongo.checkOtpisValid(req);
    if(otpvaild == false){
        returnJsonObj = JSON.parse(JSON.stringify(stub.GetEmailOtp))
        returnJsonObj.speech = `You entered Wrong Otp. Please Try again.`;
        returnJsonObj.displayText = returnJsonObj.speech;
        return res.json(returnJsonObj);
    }
    else{
        //TASKS To be done here
        //1. check if user is new : get his registration
        //2. if he exists => check his date of last appeared/test 
            //if date < 6 months => no exams else proceed to test
        let user = await Mongo.checkUser(EMAIL); 
        if(user == false){//New  user
            returnJsonObj = JSON.parse(JSON.stringify(stub.GetEmailOtp))
            returnJsonObj.speech = `It seems like this is your first time.
            You need to get register first.
            Please tell me your name.`
            returnJsonObj.displayText = returnJsonObj.speech;
        }
        else{
            let examEligible = await Mongo.checkLastAppearance(EMAIL);
            if(examEligible == true){
                returnJsonObj = JSON.parse(JSON.stringify(stub.GetEmailOtp))
                returnJsonObj.speech = `You are eligible to Give Test. Please Proceed to test by saying 'Begin Test'`;
                returnJsonObj.displayText = returnJsonObj.speech;
            }
            else{
                returnJsonObj = JSON.parse(JSON.stringify(stub.GetEmailOtp))
                returnJsonObj.speech = `You are Not eligible to Give Test as you have already appeared  recently.
                A gap of 6 months is required.`;
                returnJsonObj.displayText = returnJsonObj.speech;
            }
        }
        console.log(`Existing apiGetEmailOtp =========>`);
        return res.json(returnJsonObj); 

    }
}

async function apiGetUserName(req,res){
    console.log(`Entering apiGetUserName =========>`);
    let USERNAME = req.body.result.parameters.username;
    let names = USERNAME.split(" ");
    let fname = names[0];
    console.log("inside apiGetUserName===>names ",names," fname ",fname);
    let returnJsonObj = await stub.getUsername(fname);
    JSON.stringify(returnJsonObj);
    console.log(`Existing apiGetUserName =========>`);
    return res.json(returnJsonObj);
}

async function apiGetUserPhone(req,res){
    console.log(`Entering apiGetUserName =========>`);
    let returnJsonObj = await stub.getPhone;
    JSON.stringify(returnJsonObj);
    console.log(`Existing apiGetUserName =========>`);
    return res.json(returnJsonObj);
}

async function apiGetUserDob(req,res){
    console.log(`Entering apiGetUserName =========>`);
    let returnJsonObj = await stub.getUserDob;
    JSON.stringify(returnJsonObj);
    Mongo.insertUser(req);
    console.log(`Existing apiGetUserName =========>`);
    return res.json(returnJsonObj);
}

module.exports.apiDefaultWelcome = apiDefaultWelcome;
module.exports.apiGetEmail = apiGetEmail;
module.exports.apiGetEmailOtp = apiGetEmailOtp;
module.exports.apiGetUserName = apiGetUserName;
module.exports.apiGetUserPhone = apiGetUserPhone;
module.exports.apiGetUserDob = apiGetUserDob;