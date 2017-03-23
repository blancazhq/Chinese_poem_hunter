# Ancient Chinese Poem Hunter

* This module produce a piece of art include an Ancient Chinese poem of a category (or two categories) that you like and an ASCII art :)
* The poems are selected from the most well-know Tang-Dynasty Chinese poem collection <i>300 Tang Poems</i> (Tang Shi San Bai Shou)
* The source of the collection is http://www.shiren.org/xlib/lingshidao/hanshi/tang.htm

## Intallation

~~~~~~~
npm install chinesepoemhunter
~~~~~~~

## How to use

~~~~~~~
chinesepoemhunter(stuff1, stuff2, function(err, result){
  if(err)throw err;
  console.log(result);
})
~~~~~~~

* the "stuff" you can pass as a parameter can be one of these: "mountain", "sunset", "flower", "moon", "sun", "cloud", "desert", "thunder", "rainbow", "rain", "snow", "waterfall", "tree", "love", "home", "temple"

* if you only want to put in one category, you can pass an empty string ("") as the second parameter

## Examples

![tree](./1.png?raw=true "tree")
![temple](./2.png?raw=true "temple")
![love](./3.png?raw=true "love")
