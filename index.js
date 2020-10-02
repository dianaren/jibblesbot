const fs = require('fs');
const Discord = require('discord.js');
const MongoClient = require('mongodb').MongoClient;

const { prefix, mongoConnectionStringTemplate } = require('./config.json');
const mongoConnectionString = mongoConnectionStringTemplate.replace('%%PASSWORD%%', process.env.MONGODB_PW)
const mongo = new MongoClient(mongoConnectionString, { useNewUrlParser: true });

const discord = new Discord.Client();
discord.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  discord.commands.set(command.name, command);
}

function handleMessage(message) {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  if (!discord.commands.has(commandName)) {
    return message.reply('Command not found!');
    // TODO: print valid commands
  }

  const command = discord.commands.get(commandName);

  if (command.args && args.length != command.args) {
    let reply = `incorrect number of arguments. Expected ${command.args}; received ${args.length}`;

    if (command.usage) {
      reply += `\nUsage: \`${prefix} ${command.name} ${command.usage}\``;
    }

    return message.channel.send(reply);
  }

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('there was an error trying to execute that command!');
  }
}

discord.once('ready', () => {
  try {
    mongo.connect();
    mongo.db("default").command({ ping: 1 });
    console.log("Connected successfully to mongo");
  } finally {
    mongo.close();
  }
  console.log('Ready!');
});

discord.login(process.env.TOKEN);

discord.on('message', handleMessage);

module.exports = {
  handleMessage: handleMessage
}
