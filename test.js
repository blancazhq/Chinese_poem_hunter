var chinesepoemhunter = require("./index")

chinesepoemhunter("flower", "", function(err, result){
  if(err)throw err;
  console.log(result);
})

chinesepoemhunter("tree", "", function(err, result){
  if(err)throw err;
  console.log(result);
})

chinesepoemhunter("home", "", function(err, result){
  if(err)throw err;
  console.log(result);
})
