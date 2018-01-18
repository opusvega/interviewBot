var XLSX = require('xlsx');
var wb = XLSX.readFile('../Salesforce.xlsx');
var ws = wb.Sheets.Objective;
var data = XLSX.utils.sheet_to_json(ws);
console.log(data);  // excel file data
const mongo = require("../global/mongo.js");
var bulk = null;
var total_questions = data.length;
let count = 0;
//separate out objective and subjective questions
async function getCount(){
    for(let i = 0; i<total_questions ; i++ ){
        if(data[i]['Question Category'] == 'Subjective'){
            break;
        }
        count++;    //find total objective questions
    }   
    return count; 
}


//write bulk queries for inserting both objective and subjective questions

//bulk insert Objective Questions
async function bulkInsertLoop(count){
    for(let i = 0; i<count ; i++ ){
        let option = [
                        data[i]['Option A'],
                        data[i]['Option B']
                    ];
        if (data[i].hasOwnProperty('Option C')) {
            option.push(data[i]['Option C'])
        }
        if (data[i].hasOwnProperty('Option D')) {
            option.push(data[i]['Option D'])
        }
        let subcat = data[i]['Category'];
        subcat = subcat.replace(/[^a-zA-Z]/g, '').toLowerCase();
       // subcat = subcat.toLowerCase();
        bulk.insert( 
            { 
                qid: i+1 , 
                qcat: "salesforce",
                qsubcat: subcat , 
                qtype: data[i]['Question Category'] ,
                qtext : data[i]['Questions'] , 
                options: option,
                answer : data[i]['Answer'],
                marks : 1 ,
                difficulty : 0
            } 
        );
    }
    
    //Bulk insert Subjective Questions
    for(let i = count; i<total_questions ; i++ ){
        let q = await data[i]['Questions'];
        console.log("subjective for loop q===========>",q);
        let question = await q.substring((q.indexOf('.')+1)).trim(); // try this first
        bulk.insert( 
            { 
                qid: i+1 , 
                qcat: "salesforce",
                qsubcat: data[i]['Category'] , 
                qtype: data[i]['Question Category'] ,
                qtext : question , 
                answer : data[i]['Answer'],
                marks : 1 ,
                difficulty : 0
            } 
        );
    }
}
async function bulkInsertInit() {
    let db = await mongo.getdb();
    let count = await getCount();
    bulk = db.collection("QuestionBank").initializeUnorderedBulkOp();
    await bulkInsertLoop(count);
    let res = await bulk.execute();
    console.log("bulk======>",res)
}

bulkInsertInit();
