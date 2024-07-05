require("dotenv").config();
const { Client, Embed } = require("guilded.js");

let messageAmount = 0;
const goal = 5;
const msg = Array(40).fill("||pop||").join(" ");

function main() {
    const client = new Client({
        token: process.env.GUILDED_TOKEN
    });

    client.once("ready", () => {
        console.log("bot is ready!");
    });

    client.on("error", (reason, error) => {
        console.error("The websocket connection encountered an error:", reason, error);
    });

    process.on("unhandledRejection", error => {
        console.error("Unhandled promise rejection:", error);
    });

    client.on("messageCreated", async (message) => {
        if (message.author && message.author.type === 0) return;

        const embed = new Embed()
            .setColor("#0000FF")
            .setAuthor(message.author.name, message.author.avatar)
            .setThumbnail(message.author.avatar)
            .setTimestamp()
            .setFooter(client.user.name, client.user.avatar);

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
            return message.reply("Coming soon!");
        }

        console.log("Message amount:", messageAmount);
        console.log("Message goal:", goal);

        if (messageAmount === goal) {
            messageAmount = 0;
            await message.send(msg);
        }
    });

    client.login();
}

void main();