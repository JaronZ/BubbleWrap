const { Client, RichEmbed } = require('discord.js');
const client = new Client();
const { token } = require('./config.json');
var messageAmount = 0;
var goal = 200;

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
    
    if (message.content == 'bubble goal') {
        const embedMsg = new RichEmbed()
            .setColor('#0000ff')
            .setAuthor(message.author.username, message.author.displayAvatarURL)
            .setThumbnail(message.author.displayAvatarURL)
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL)
            .addField('Message Goal', goal, true)
            .addField('Sent Messages', messageAmount, true);

        message.channel.send(embedMsg);
    }
    
    if (message.content.startsWith('bubble send') {
            
    }

    console.log("message amount: " + messageAmount);
    console.log("message goal: " + goal);
    if (messageAmount == goal) {
        message.channel.send("||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop|| ||pop||");
        messageAmount = 0;
    }
});
