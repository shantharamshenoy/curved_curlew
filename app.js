
const express = require("express");
const path = require("path");
const config = require("./config.js");

const app = express();
const port = process.env.PORT || 1987;


function generateName(count) {
    var nameList = [];
    for (i = 0; i < count; i++) {
        let adj = config.adjectives[Math.floor(Math.random() * config.adjectives.length)];
        let animalName = config.animalNames[Math.floor(Math.random() * config.animalNames.length)];
        let birdName = config.birdNames[Math.floor(Math.random() * config.birdNames.length)];
        let name = [animalName, birdName];

        var randomName = adj + " " + name[Math.floor(Math.random() * 2)];
        nameList.push(titleCase(randomName));
    }
    return nameList;

}

function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
}


// Static Files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/img', express.static(__dirname + 'public/img')); 

// app.get('', (req, res) => {
//     res.sendFile(__dirname + '/views/index.html')
// })
app.set('views', './views');
app.set('view engine', 'ejs');

app.get('', (req, res) => {
    var as = generateName(1);
    res.render('index', { projectNames: as, status: "OK"});
});

app.get('/generate', (req, res) => {
    if(req.query && req.query.count){
        var reg = /^\d+$/;
        console.log(reg.test(req.query.count));
        var nameList = generateName(req.query.count);
        res.render('index', {projectNames: nameList, status : "OK"})
    }
    else {
        res.render('index', {text : "Incorrect values", status : "ERROR"})
    }
    
});


app.listen(port, () => {
    console.log(`Listenting to requests on port: ${port}`);
})