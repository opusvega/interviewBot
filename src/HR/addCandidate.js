const mongo = require("../global/mongo.js");
const encode = require('../global/encode.js');
const mail = require('./mail');
const resumeParser = require('../resume/readResume');
//assuming candidates record are stored in excel
 var XLSX = require('xlsx');
// let wb = XLSX.readFile('../Candidates.xlsx');
// var ws = wb.Sheets.Default;
// var data = XLSX.utils.sheet_to_json(ws);
//console.log("data==>",data);  // excel file data
//console.log(data);  // excel file data
var data;
//let emails= [];
var bulk = null;
var total_candidates;


function bulkInsertLoop(){
    for(let i=0;i<total_candidates;i++){
        bulk.insert({
            email: data[i]['Email'],
            name: data[i]['Name'],
            contact: data[i]['Contact'],
            urlstatus: 'live'
        });
        
    }
}

async function bulkInsertInit(){
    let DB = await mongo.getdb();
    bulk = DB.collection("CandidateRecord").initializeUnorderedBulkOp();
    await bulkInsertLoop();
    let res =  bulk.execute();
    console.log("bulk======>",res);
    DB.close();
}


async function getEncryption() {
    for (let i = 0; i < total_candidates; i++) {
        //emails.push(data[i]['Email']); 
        let encryptedEmail = await encode.encryptEmail(data[i]['Email']);
        data[i].EncryptEmail = encryptedEmail;        
   }
}
function Workbook() {
	if(!(this instanceof Workbook)) return new Workbook();
	this.SheetNames = [];
	this.Sheets = {};
}

async function writeXlxs(){
    await getEncryption();    //call to start encryption of emails
    let new_ws = await XLSX.utils.json_to_sheet(data);
    var new_wb = new Workbook();    //create new workbook
    new_wb.SheetNames.push('Candidates');
    new_wb.Sheets['Candidates'] = new_ws;   //add newly created worksheet
    XLSX.writeFile(new_wb,'./updatedCandidates.xlsx');  //write this file
}
async function sendToHR(){
    await writeXlxs();
    //send this file to HR
    mail.sendMail();
}
async function addCandidates(){
    data = await resumeParser.candidatesRecord();
    total_candidates = data.length;
    console.log("total candidates",total_candidates);
    await bulkInsertInit(); //call to start bulk insertion
    sendToHR();
}

addCandidates();