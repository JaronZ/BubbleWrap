require("dotenv").config();
const { Client, EmbedBuilder, IntentsBitField, Partials } = require("discord.js");
const { ActivityType } = require("discord-api-types/v10");

let messageAmount = 0;
const goal = 5;
const msg = "||pop||".repeat(40);

async function main() {
    const client = new Client({
        intents: [
            IntentsBitField.Flags.Guilds,
            IntentsBitField.Flags.GuildMessages,
            IntentsBitField.Flags.MessageContent,
            IntentsBitField.Flags.DirectMessages
        ],
        partials: [
            Partials.Channel,
            Partials.User
        ]
    });

    client.once("ready", () => {
        console.log("bot is ready!");
        client.user.setActivity("bubble send", { type: ActivityType.Playing });
    });

    client.on("error", error => {
        console.error("The websocket connection encountered an error:", error);
    });
    
    process.on("unhandledRejection", error => {
        console.error("Unhandled promise rejection:", error);
    });

    client.on("messageCreate", async (message) => {
        if (message.author.bot) return;

        const embed = new EmbedBuilder()
            .setColor("#0000ff")
            .setAuthor({
                name: message.author.username,
                iconURL: message.author.displayAvatarURL()
            })
            .setThumbnail(message.author.displayAvatarURL())
            .setTimestamp()
            .setFooter({
                text: client.user.username,
                iconURL: client.user.displayAvatarURL()
            });

        messageAmount++;

        if (message.content === "bubble goal") {
            embed.addFields([
                {
                    name: "Message Goal",
                    value: goal.toString()
                },
                {
                    name: "Sent Messages",
                    value: messageAmount.toString()
                }
            ]);

            return message.reply({
                embeds: [embed]
            });
        }

        if (message.content === "bubble send") {
            try {
                await message.author.send(msg);
                embed.setDescription("Message sent");
            } catch {
                embed
                    .setColor("#FF0000")
                    .setDescription("could not send message. are your DM's blocked?");
            } finally {
                await message.reply({ embeds: [embed] });
            }
        }

        console.log("Message amount:", messageAmount);
        console.log("Message goal:", goal);

        if (messageAmount === goal) {
            message.channel.fetch().then((channel) => {
                channel.send(msg);
            });
            messageAmount = 0;
        }
    });

    await client.login();
}

void main();