const config = require(`../../config.js`);
const globalMongo = require('../../global/mongo');


// function randomQues(){
//     var arr = [];
//     while(arr.length < config.num_of_ques){
//         var randomQid = Math.floor(Math.random()*config.total_ques) + 1;
//         if(arr.indexOf(randomQid) > -1) continue;
//         arr[arr.length] = randomQid;
//     }
//     console.log(arr);
//     return arr;
// }

async function getName(candidateEmail){
    let DB = await globalMongo.getdb();
    let result = await DB.collection('CandidateRecord').findOneAndUpdate(
        { email:candidateEmail,urlstatus:'live' },
        { $set: { urlstatus:'dead'} },
        {returnNewDocument:true}
    );
    console.log("Find Candidate",result);
    if(result.value != null){ //result exists and hence urlstatus = dead(updated)
        console.log("result===>",result);
        return result.value.name;
    }
    else{
        return false;
    }
}
 
let bulk = null;
let questions =[];
async function getQuestionsLoop(questionSet){
    let DB = await globalMongo.getdb();
    for(let i =0;i<questionSet.length;i++){
        let type = questionSet[i]['Type'];
        let cat = questionSet[i]['Cat'];
        let value = questionSet[i]['Value'];
        console.log("TypeOf Value====>",typeof value);
        value = parseInt(value,10);
        console.log("TypeOf Value====>",typeof value);
        
        console.log('Inside GetQuestion Loop Before Aggregate');
        //get (n=value) random documents matching criteria 
        let result = await DB.collection("QuestionBank").aggregate([
            { $match: { qsubcat: cat , qtype: type} },
            { $sample: { size: value } },
            { $project: { _id:0 , qid :0, qcat:0} }
        ],{
            allowDiskUse : true
        }).toArray();
        console.log('Inside GetQuestion Loop after Aggregate');        
        //result = JSON.stringify(result);
        console.log(result);
        result.forEach(function(obj){
            questions.push(obj);
        });
    }
    //return result;
}
async function getQuestions(questionSet){
    
    //questions = await getQuestionsLoop(questionSet);
    await getQuestionsLoop(questionSet);
    console.log('question inside Mongo====>',questions);
    return questions;
}
async function bulkInsertLoop(qa,email){
    qa.forEach(function(qaObj){
        qaObj.email = email
        bulk.insert(qaObj);
    });
}
async function insertInterviewRecord(qa,email){
    let DB = await globalMongo.getdb();
    bulk = DB.collection("InterviewRecord").initializeUnorderedBulkOp();
    await bulkInsertLoop(qa,email);
    await bulk.execute();
}
// module.exports.randomQues = randomQues;
module.exports.getName = getName;
module.exports.getQuestions = getQuestions;
module.exports.insertInterviewRecord = insertInterviewRecord;
