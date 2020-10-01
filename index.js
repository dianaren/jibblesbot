const Discord = require('discord.js');
const { prefix } = require('./config.json');
const client = new Discord.Client();
let daysSinceSkisBought = 0;

client.once('ready', () => {
	console.log('Ready!');
});

client.login(process.env.TOKEN);

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

  switch (command) {
    case 'buyskis':
      daysSinceSkisBought = 0;
      message.channel.setTopic(`${daysSinceSkisBought} day(s) since skis have been bought! Last one to buy skis: ${message.author.username}`)
        .then(updated => message.channel.send(`SPENT IT! ${message.author.username} bought skis! The channel topic has been updated.`));
      break;
    default:
      break;
  }
});
