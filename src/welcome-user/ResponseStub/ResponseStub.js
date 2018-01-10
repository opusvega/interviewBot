const welcomeSpeech = {
    "speech" : `Hi , I am your Interview Bot. Please Tell me your Email ID to proceed.`,
    "displayText" : `Hi , I am your Interview Bot. Please Tell me your Email ID to proceed.`,
    "source" : `Opus-NLP`
}

function getEmail(email){
    let response = {
        "speech" : `An otp has been sent to ${email}.Please enter it to verify.`,
        "displayText" : `An otp has been sent to ${email}.Please enter it to verify.`,
        "source" : `Opus-NLP`
    }
    return response;
}
let GetEmailOtp= {
    "speech" : ``,
    "displayText" : ``,
    "source" : `Opus-NLP`
}
function getUsername(fname){
    let response = {
        "speech" : `Hi ${fname}. Please tell me your Phone number.`,
        "displayText" : `Hi ${fname}. Please tell me your Phone number.`,
        "source" : `Opus-NLP`
    }
   return response;
}

let getPhone = {
    "speech" : `Please enter your DOB (yyyy-mm-dd).`,
    "displayText" : `Please enter your DOB (yyyy-mm-dd).`,
    "source" : `Opus-NLP`
}

let getUserDob = {
    "speech" : `Thank You for the Details. You can start Test by stating 'Begin Test'.`,
    "displayText" : `Thank You for the Details. You can start Test by stating 'Begin Test'.`,
    "source" : `Opus-NLP`
}

module.exports.welcomeSpeech = welcomeSpeech;
module.exports.getEmail = getEmail;
module.exports.GetEmailOtp = GetEmailOtp;
module.exports.getUsername = getUsername;
module.exports.getPhone = getPhone;
module.exports.getUserDob = getUserDob;