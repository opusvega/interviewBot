var obj = {
    name: "Simon",
    age: "20",
    clothing: {
        style: "simple",
        hipster: false
    }
}

for(var propt in obj){
    console.log(propt + ': ' + obj[propt]);
}

Object.keys(obj).forEach(function(key,index) {
    // key: the name of the object key
    // index: the ordinal position of the key within the object
    console.log(index+'=>'+key +'=>'+obj[key]); 
});

var nn = {"Sales_cloud_Objective":5,"Apex_Subjective":5,"VF_Pages_Objective":5 ,"Reports & Dashboard_Objective":5}
Object.keys(nn).forEach(function(key,index) {
    //key = key.toLowerCase()
    let type = key.substr(key.lastIndexOf('_')+1);
    let cat = key.substr(0,key.lastIndexOf('_')).replace(/[^a-zA-Z]/g, '');;
    // console.log(type);
    // console.log(cat);
    // console.log(key.toLowerCase());
    // console.log(type+'=>'+cat +'=>'+nn[key]); 
    console.log('Type : '+type)
    console.log('Cat : '+cat.toLowerCase())
    console.log('Value : '+nn[key]);
});


