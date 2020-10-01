module.exports = {
	name: 'buy',
	description: 'Buy stuff!',
  args: 1,
  usage: '<stuff>',
	execute(message, args) {
      let daysSinceSkisBought = 0;
      message.channel.setTopic(`${daysSinceSkisBought} day(s) since skis have been bought! Last one to buy skis: ${message.author.username}`)
        .then(updated => message.channel.send(`SPENT IT! ${message.author.username} bought skis! The channel topic has been updated.`));
	},
};
