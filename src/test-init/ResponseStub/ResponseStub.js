
function getEmail(name){
    const getEmailSpeech = {
        "speech": `Hi ${name}`,
        "DisplayText" : `Hi ${name}`,
        "value": true,
        "source" : `Opus-NLP`
    }
    return getEmailSpeech;
}

const urlExpired = {
    "speech": `You test Link has expired.`,
    "DisplayText" : `You test Link has expired.`,
    "value": false,
    "source" : `Opus-NLP`
}

module.exports.getEmail = getEmail;
module.exports.urlExpired = urlExpired;

