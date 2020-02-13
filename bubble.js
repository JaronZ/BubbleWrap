const { Client } = require('discord.js');
const client = new Client();
const { token } = require('./config.json');
var messageAmount = 0;
var goal = Math.floor((Math.random() * 20) + 1);

client.once('ready', () => {
    console.log('bot is ready!');
});

client.login(token);

client.on('error', error => {
    console.error('The websocket connection encountered an error:', error);
});

process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});

client.on('message', message => {
    if (message.author.bot) return;
    messageAmount++;
    console.log("message amount: " + messageAmount);
    console.log("message goal: " + goal);
    if (messageAmount == goal) {
        message.channel.send("||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop||");
        messageAmount = 0;
        goal = Math.floor((Math.random() * 20) + 1);
        console.log("new message goal: " + goal);
    }
});