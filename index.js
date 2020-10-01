const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

client.login(process.env.TOKEN);

client.on('message', message => {
  if (message.content === '!jibblesbot buyskis') {
    message.channel.send('bought skis!');
  }
});
