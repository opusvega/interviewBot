var pdfText = require('pdf-text')

 var pathToPdf = __dirname + "/Taha2.pdf"

// pdfText(pathToPdf, function(err, chunks) {
//   //chunks is an array of strings 
//   //loosely corresponding to text objects within the pdf

//   //for a more concrete example, view the test file in this repo
//     console.log(chunks);
//     chunks.forEach(chunk => {
//         result = chunk.match(/[0-9]{6}/);
//         if(result != null){
//             console.log('PINCODE ======>',result[0]);
//         } 
//     });
// })


// var PdfReader = require("pdfreader").PdfReader;
// let result;
// let email;
// new PdfReader().parseFileItems(pathToPdf, function(err, item){
//   if (item && item.text){
//       console.log(item.text);
//       str = item.text;
//       result = str.toString().match(/[0-9]{10}/);
//       if(result != null){
//           console.log('contact ======>',result[0]);
//       }
//       email = str.toString().match(
//         /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
//   }
//   if(email !=null){
//       console.log('EMAIL========>',email);
//   }
// });

// let fs = require('fs'),
//         PDFParser = require("pdf2json");
 
//     let pdfParser = new PDFParser();
 
//     pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
//     pdfParser.on("pdfParser_dataReady", pdfData => {
//         fs.writeFileSync(__dirname+"/ksm.fields.json", JSON.stringify(pdfData));
//     });
 
//     pdfParser.loadPDF(pathToPdf);

var pdfUtil = require('pdf-to-text');

pdfUtil.pdfToText(pathToPdf, function(err, data) {
    if (err) throw(err);
    console.log(data); //print all text    
    let contact = data.toString().match(/[0-9]{10}/);
    console.log('contact ======>',contact[0]);
    let email = data.toString().match(/[a-z0-9](\.?[a-z0-9_-]){0,}@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}/);
    console.log('EMAIL========>',email[0]);
    // let javascript = data.toString().match(/(^|\W)javascript($|\W)/ig);
    // console.log('javscript skill',javascript[0]);
    // let java = data.toString().match(/(^|\W)java($|\W)/ig);
    // console.log('javscript skill',java[0]);
    // let node = data.toString().match(/(^|\W)node js($|\W)/ig);
    // console.log('javscript skill',node[0]);
    let words = data.toString().match(/[a-z .]+/ig);
    console.log(words);
    let index =1;
    if(words[1].match(/(^|\W)name($|\W)/i)){
        index = 2;
    }
    console.log('Name=====> ', words[index]);
  });

