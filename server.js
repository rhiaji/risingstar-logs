const http = require('http')
var fs = require('fs');



const server = http.createServer((req, res) => {
    
    var star = fs.readFileSync('sb.json');
    var starObject= JSON.parse(star);
    var skill = fs.readFileSync('skill.json');
    var skillObject= JSON.parse(skill);
    
    

    if (req.url == '/starbits') {
        
        res.write(JSON.stringify(starObject));
        res.end();
        
    }

    if (req.url == '/skill') {
        
        res.write(JSON.stringify(skillObject));
        res.end();
        
    }


});

server.listen(3000)
console.log('listening on port 3000.....')



 






