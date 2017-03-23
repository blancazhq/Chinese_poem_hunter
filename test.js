var chinesepoemhunter = require("./index")

var stuff1 = "temple";
var stuff2 = "";

chinesepoemhunter("temple", "", function(err, result){
  if(err)throw err;
  console.log(result);
})
