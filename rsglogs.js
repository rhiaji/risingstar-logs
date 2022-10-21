const WebSocket = require('ws')
var fs = require('fs');


const ws = new WebSocket('wss://gateway.discord.gg/?v=6&encoding=json')
var interval = 0;

// YOU NEED TO USE YOUR OWN TOKEN TO GET THE AUTHORIZATION OF A SPECIFIED DISCORD SERVERS // 
// CLICK F12 AND GO TO NETWORK AND THEN TYPE SOMETHING IN ANY CHANNEL OF YOUR CHOSEN SERVER // 
// REFRESH THE PAGE AND THEN INPUT ON FILTER "TYPING" AND GET THE AUTHORIZATION TOKEN UNDER THE REQUEST HEADRER //
// IF YOU WANT TO USE MY TOKEN FOR RISINGSTAR LOGS YOU CAN USE IT. ITS A DUMMY ACCOUNT//

token = 'MTAzMjY1NDc4NzE0NzIyMzA1MA.GM4EHV.9W4bIrtzdWbi5J97wnkBHEdAFyoCoWXzdWuGmc'
payload = {
    op:2,
    d:{
        token: token,
        properties: {
            $os: 'linux',
            $browser: 'chrome',
            $device: 'chrome'
        }
    }
}

ws.on('open', function open() {
    ws.send(JSON.stringify(payload))
})


    var star = fs.readFileSync('sb.json');
    var starObject= JSON.parse(star);
    var skill = fs.readFileSync('skill.json');
    var skillObject = JSON.parse(skill);


    ws.on('message', function incoming(data) {
   let payload = JSON.parse(data)
   const {t, event, op, d} = payload;

   switch (op){
    case 10:
        const {heartbeat_interval} = d;
        interval = heartbeat(heartbeat_interval)
        break;
   }
   
   
 

   switch (t) {
        case 'MESSAGE_CREATE':

            let author = d.author.username
            let content = d.content
            let timenow = d.timestamp

// ---- YOU CAN TRY TO CONSOLE CONTENT TO SEE WHAT YOU NEED TO SPLIT --------//

        if (author == "Game Log"){

            let firstword = content.split("***")[1];
            let username = content.split(" ")[0];
            let timeagain = timenow.split("T")[1];
            let lastword = content.split(" ego")[0];
            let filter = lastword.split("gained")[1];
            
           
   // ----------------------------- CONFIGURATION FOR PLAY STARBITS & EGO GAINED ---------------------//

            if (content.match("Starbits") == "Starbits"){

                let earned = firstword.split(" Starbits")[0];
                let starbits_earned = Number(earned);
                let ego = filter.split("***")[1];
                let filter2 = ego.split(" ")[0];
                let ego_earned = Number(filter2);
                let time = timeagain.split(".")[0];
                

                var playerstarbits = {
                    
                    "username": username,                    
                    "starbits_earned": starbits_earned,
                    "ego_earned": ego_earned,
                    "timestamp": time
                    
                    
                }
                
                
                starObject.push(playerstarbits)
                
                var newData = JSON.stringify(starObject,null,4);

                fs.writeFile('sb.json',newData,function(err){
                    
                })


                console.log(playerstarbits)
            }

// ----------------------------- CONFIGURATION FOR PLAY SKILL GAINED ---------------------//

            let middleword = content.split("Skill")[0];

            if (content.match("Skill") == "Skill"){

                let skill = middleword.split("***")[1];
                let skill_earned = Number(skill);
                let time = timeagain.split(".")[0];
                

                var playerskill = {
                    
                    "username": username,                    
                    "skill_earned": skill_earned,
                    "timestamp": time
                    
                    
                }
                
                
                skillObject.push(playerskill)
                
                var newData = JSON.stringify(skillObject,null,4);

                fs.writeFile('skill.json',newData,function(err){
                    
                })


                console.log(playerskill)
            }

            
           
        }        
          
    }
    
    
    

});

const heartbeat = (ms) => {
    return setInterval(() => {
        ws.send(JSON.stringify({op: 1,d: null}))
        
    }, ms);
}

