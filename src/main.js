const tokenFile = require('./config.json');
const Discord = require('discord.js');
const client = new Discord.Client();
const request = require('request');
const frId = 46;
const l2Id = 177;
const constSpace = "         ";

const spaceArray = {
    "Lorient": "             ",
    "AC Ajaccio": "     ",
    "Troyes": "             ",
    "Sochaux": "          ",
    "Lens": "                 ",
    "Clermont": "       ",
    "Guingamp": "       ",
    "Grenoble": "         ",
    "Le Havre": "          ",
    "Nancy": "              ",
    "Rodez": "              ",
    "Auxerre": "             ",
    "Valenciennes": " ",
    "Caen": "                    ",
    "Niort": "                ",
    "Chateauroux": "  ",
    "Le Mans": "                   ",
    "Chambly": "        ",
    "Paris FC": "          ",
    "Orleans": "          ",
    "Amiens": "            ",
    "Pau FC": "             ",
    "Toulouse": "         ",
    "Dunkerque": "     ",
};


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.content === 'l2') {
        request('https://apiv2.apifootball.com/?action=get_standings&league_id=' + l2Id + '&APIkey=' + tokenFile.apiKey, {json: true}, (err, res, body) => {
            //console.log(body);
            let classementLigue2 = "\n__Classement Ligue 2__\n";
            body.forEach(function (club) {
                const position = club["overall_league_position"];
                classementLigue2 += ((position < 10) ? position + " " : position) + ": ";
                let clubName = club["team_name"];
                if (clubName === "Caen")
                    classementLigue2 += client.emojis.find(emoji => emoji.name === "smc");
                else if (clubName === "Le Mans")
                    classementLigue2 += client.emojis.find(emoji => emoji.name === "lemans");
                else
                    classementLigue2 += club["team_name"];

                classementLigue2 += spaceArray[club["team_name"]] + constSpace;
                classementLigue2 += club["overall_league_PTS"] + "pts";
                classementLigue2 += "\n";
            });

            msg.channel.send(classementLigue2);
        })
    }
});

client.login(tokenFile.token);