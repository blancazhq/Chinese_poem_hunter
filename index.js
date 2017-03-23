var fs = require("fs");
var request = require("request");
var cheerio = require('cheerio');
var _ = require("lodash");
var path = require('path');
var url = "http://www.shiren.org/xlib/lingshidao/hanshi/tang.htm"

var results = [];
var art_name_array = ["mountain", "sunset", "flower", "moon", "sun", "cloud", "desert", "thunder", "rainbow", "rain", "snow", "waterfall", "tree", "love", "home", "temple"]
var number;

function findArt(stuff, callback){
  fs.readFile(path.join(__dirname, "ascii.txt"),"utf8",function(err, data){
    if(err){
      callback(err);
    }
    var art_array = data.replace(/\n$/, '').split('\n\n\n');
    art = art_array[art_name_array.indexOf(stuff)];
    art = art.replace(/\n/g, "\n*  ")
    callback(null, art);
  })
}

function findMaxLength(art, new_text, callback){
  var art_lines = art.split("\n");
  var art_lines_length = art_lines.map(function(n){
    return n.length;
  })
  var poem_lines = new_text.split("\n");
  var poem_lines_length = poem_lines.map(function(n){
    return n.length;
  })
  var lines_length = art_lines_length.concat(poem_lines_length);
  max_line_length = _.max(lines_length);
  callback(null, max_line_length);
}

function rightFrameArt(art, maxlength, callback){
  var art_lines = art.split("\n");
  for(var i=0;i<art_lines.length;i++){
    if(i===0){
      art_lines[i] = art_lines[i]+" ".repeat(max_line_length-art_lines[i].length+4)+"*";
    }else{
      art_lines[i] = art_lines[i]+" ".repeat(max_line_length-art_lines[i].length+5)+"*";
    }
  }
  art_framed = art_lines.join("\n")
  callback(null, art_framed);
}

function rightFramePoem(poem, new_textmaxlength, callback){
  var poem_lines = poem.split("\n");
  for(var i=0;i<poem_lines.length;i++){
    poem_lines[i] = poem_lines[i]+" ".repeat(max_line_length-poem_lines[i].length+5)+"*";
  }
  poem_framed = poem_lines.join("\n")
  callback(null, poem_framed);
}

function generateNumber(){
  number = Math.floor((Math.random())*(results.length-1));
  if(results[number].length > 800 ){
    generateNumber()
  }
}


function chinesepoemhunter(stuff1, stuff2, callback){
  request.get(url, function(err, resp, html){
    if(err){
      callback(err);
    }
    $ = cheerio.load(html);
    $("p").each(function(i, elem){
      if($(this).html().includes(stuff1)){
        var result = "*  "+$(this).prev().html()+"\n*  "+$(this).prev().prev().html()+"\n*  \n*  "+$(this).html()+"\n*";
        results.push(result);
      }
    })
    generateNumber();
    var new_text = results[number];
    new_text = new_text.replace(/\<br\>/g, "\n*  ")

    findArt(stuff1, function(err, art){
      if(err){
        callback(err);
      }
      findMaxLength(art, new_text, function(err){
        if(err){
          callback(err);
        }
        rightFrameArt(art, max_line_length, function(err){
          if(err){
            callback(err);
          }
          rightFramePoem(new_text, max_line_length, function(err){
            if(err){
              callback(err);
            }
            var frame_up_down = "*".repeat(max_line_length+6);
            var full_line_space = " ".repeat(max_line_length+4);
            var art_work = "\n"+frame_up_down+"\n*"+full_line_space+"*\n*"+full_line_space+"*\n*"+art_framed+"\n*"+full_line_space+"*\n*"+full_line_space+"*\n"+poem_framed+"\n*"+full_line_space+"*\n*"+full_line_space+"*\n"+frame_up_down;
            callback(null, art_work);
          });
        });
      });
    });
  });
}

module.exports = chinesepoemhunter;
