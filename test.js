var chinesepoemhunter = require("./index")

var stuff1 = "temple";
var stuff2 = "";

chinesepoemhunter(stuff1, stuff2, function(err, result){
  if(err)throw err;
  console.log(result);
})
