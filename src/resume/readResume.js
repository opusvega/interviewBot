const fs = require('fs-extra');
var pdfUtil = require('pdf-to-text');
var pdfRegex = /[a-z_ 0-9]+(.pdf)/i;

var candidates = [];

async function parseResume(file){
    pathToPdf = __dirname + '/'+file;
    return new Promise((resolve,reject) => {
        pdfUtil.pdfToText(pathToPdf,async function(err, data) {
            if (err) throw(err);
            // console.log(data); //print all text  
            var candidate={};
            var name = await getName(data);
            var email = await getEmail(data);
            var contact = await getContact(data);
            //getSkills(data);
            candidate.Name = name;
            candidate.Email = email;
            candidate.Contact = contact;
            console.log("Person Details are :")
            console.log(candidate);  
            // candidates.push(candidate); 
            // console.log("current candidates array:",candidates);
            resolve(candidate)
            });

    })
}

async function getCandidate(file){
    if(file.match(pdfRegex)){
        var person = await parseResume(file);
        // console.log("GET Candidate -> person is : ",person)
        return person;
    }
    else{
        return false;
    }
}

async function processFiles(files){
    for (var file of files){
        var person = await getCandidate(file);
        if(person !=false){
            // console.log("person is : ",person)
            candidates.push(person);
        }
    }
}
async function candidatesRecord(){
    var files = await fs.readdir(__dirname);
    console.log(files);
    await processFiles(files);
    console.log("candidates are : ",candidates);
    return candidates;
}
// candidatesRecord();
function getName(data){
    let words = data.toString().match(/([a-z0-9](\.?[a-z0-9_-]){0,}@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6})|((\w ?\.? ?)+)/igm);
    // console.log(words);
    let index =0;

    if((words[index].match(/(^|\W)resume($|\W)/i) || words[0].match(/(^|\W)c[.]?v($|\W)/i) || words[0].match(/(^|\W)Curriculum Vitae($|\W)/)) ||
            isEmail(words[index])){
        index++;
    }
    if(words[index].match(/(^|\W)name($|\W)/i) || isEmail(words[index])){
        index++;
    }
    return words[index].trim();
    // candidate.Name = words[index].trim();
    //console.log('Name=====> ', words[index]);
    // console.log("index",index)
 }

function getEmail(data){
    let email = data.toString().match(/[a-z0-9](\.?[a-z0-9_-]){0,}@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}/);
    return email[0];
    // candidate.Email = email[0];
    // console.log(person.email)
 }
  
function getContact(data){
    let contact = data.toString().match(/[0-9]{10}/);
    return contact[0];
    // candidate.Contact = contact[0];
    // console.log(person.contact)
}

function getSkills(data){
     let javascript = data.toString().match(/(^|\W)javascript($|\W)/ig);
    console.log('javscript skill',javascript[0]);
    let java = data.toString().match(/(^|\W)java($|\W)/ig);
    console.log('javscript skill',java[0]);
    let node = data.toString().match(/(^|\W)node js($|\W)/ig);
    console.log('javscript skill',node[0]);
}
function isEmail(word){
    if(word.match(/[a-z0-9](\.?[a-z0-9_-]){0,}@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}/)){
        return true;
    }
    return false;
}

module.exports.candidatesRecord = candidatesRecord;
// module.exports.candidates = candidates;

