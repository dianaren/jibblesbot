const stuff = {
  'skis': 'have',
  'gear': 'has'
}

module.exports = {
	name: 'bought',
	description: 'Just bought stuff!',
  args: 1,
  usage: '<stuff>',
	execute(message, args) {
    let stuffBought = args[0];
    if (!stuff[stuffBought]) {
      message.reply(`congrats on your new ${stuffBought} but I'm not tracking that yet!`);
    } else {
      // TODO: retrieve a real value indexed by stuffBought
      let fakeCounter = 0;
      message.channel.setTopic(`${fakeCounter} day(s) since ${stuffBought} ${stuff[stuffBought]} been bought! Last one to buy ${stuffBought}: ${message.author.username}`)
        .then(updated => message.channel.send(`SPENT IT! ${message.author.username} bought skis! The channel topic has been updated.`));
    }
	},
};
