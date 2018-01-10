let http = require('http');
let urlencode = require('urlencode');
let fs = require('fs');
let cmd = require('node-cmd');
let username='pkul3003@gmail.com';
let hash='99e1c0cd7732fa602d7e2b43182249f315ebf37c1386d29d5d333ab70ad21eb1'; 
// The hash key could be found under Help->All Documentation->Your hash key. Alternatively you can use your Textlocal password in plain text.


async function sendMail(mailId, otp){
  console.log("inside sendMail====>otp is ",otp);
let mailbody = `To: ${mailId}
From: parag.kulkarni@opusconsulting.com
Subject: Your OTP 
Your OTP is ${otp}.`;

  await fs.writeFile(`${mailId}.txt`, mailbody, function(err){
      if(err){
        console.log(err);
      }
      console.log("data written successfully!");
  });
  await cmd.run(`ssmtp ${mailId} < ${mailId}.txt` );
}

async function sendOtp(mailId){
  console.log("in sendOtp====>", mailId);
  let otp = await Math.floor(1000 + Math.random() * 9000);
  //await sendSMS(contact, otp);
  console.log("inside sendOtp========>otp is ",otp);
  await sendMail(mailId, otp);
  return otp;
}

//url encode instalation need to use $ npm install urlencode
exports.sendOtp = sendOtp;
//exports.otp = otp;