const { Client, RichEmbed } = require('discord.js');
const client = new Client();
const { token } = require('./config.json');
var messageAmount = 0;
var goal = 200;
var msg = "||pop||".repeat(40);

client.once('ready', () => {
    console.log('bot is ready!');
    client.user.setActivity("bubble send", { type: "PLAYING" });
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
    
    const embedMsg = new RichEmbed()
            .setColor('#0000ff')
            .setAuthor(message.author.username, message.author.displayAvatarURL)
            .setThumbnail(message.author.displayAvatarURL)
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL);

    messageAmount++;
    
    if (message.content == 'bubble goal') {
        embedMsg
            .addField('Message Goal', goal, true)
            .addField('Sent Messages', messageAmount, true);

        message.channel.send(embedMsg);
    }
    
    if (message.content.startsWith('bubble send')) {
        var sendAmount = message.content.match(/send/g).length;
        for(var i = 0; i < sendAmount; i++){
            message.author.send(msg).then(() => {
                embedMsg.setDescription('message sent');
                message.channel.send(embedMsg);
            }).catch((err) => {
                embedMsg
                    .setDescription('could not send message. are your DM\'s blocked?')
                    .setColor('#ff0000');
                message.channel.send(embedMsg);
            });
        }
    }

    console.log("message amount: " + messageAmount);
    console.log("message goal: " + goal);
    if (messageAmount == goal) {
        message.channel.send(msg);
        messageAmount = 0;
    }
});
