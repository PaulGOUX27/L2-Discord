const tokenFile  = require('./config.json');
const Discord = require('discord.js');
const client = new Discord.Client();
const request = require('request');
const frId = 46;
const l2Id = 177;
const smc = "<:smc:382991999495831566>";
const lemans = "<:lemans:588053542451806208>";

//client.emojis est un enum int(id) -> emoji(object)
//const smc = client.emojis.find(emoji => emoji.name === "smc");
//const lemans = client.emojis.find(emoji => emoji.name === "lemans");
//develop

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

/*client.on('message', () => {
    console.log(client.emojis) // Return empty collection
});*/

client.on('message', msg => {
    if (msg.content === 'ping') {
        request('https://apiv2.apifootball.com/?action=get_standings&league_id=' + l2Id + '&APIkey=' + tokenFile.apiKey, {json: true}, (err, res, body) => {
            //console.log(body);
            let classementLigue2 = "__Classement Ligue 2__\n";
            body.forEach(function (club) {
                classementLigue2 += club["overall_league_position"] + ": ";
                let clubName = club["team_name"];
                if(clubName === "Caen")
                    classementLigue2 += `${smc}`;
                else if (clubName === "Le Mans")
                    classementLigue2 += `${lemans}`;
                else
                    classementLigue2 += club["team_name"];

                classementLigue2 += "             ";
                classementLigue2 += club["overall_league_PTS"] + "pts";
                classementLigue2 += "\n";
            });

            msg.channel.send(classementLigue2);
        })
    }
});

client.login(tokenFile.token);