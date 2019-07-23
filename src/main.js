const tokenFile  = require('./config.json');
const Discord = require('discord.js');
const client = new Discord.Client();
const request = require('request');
const frId = 46;
const l2Id = 177;

//develop

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.content === 'ping') {
        request('https://apiv2.apifootball.com/?action=get_standings&league_id=' + l2Id + '&APIkey=' + tokenFile.apiKey, {json: true}, (err, res, body) => {
            console.log(body);

        })
    }
});


client.login(tokenFile.token);