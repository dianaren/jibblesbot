const uuidv4 = require('uuid').v4;

const buyableStuff = {
  'skis': 'have',
  'gear': 'has'
}

async function addNewPurchase(username, collection) {
  const uuid = uuidv4();
  const update = {
    $set: {
      uuid: uuid,
      username: username,
    },
    $currentDate: {
        purchaseTime: true,
     }
  };
  await collection.updateOne({ uuid: uuid }, update, { upsert: true });
}

async function updateGlobalStats(username, collection) {
  const query = { globalStats: { $exists: true } };
  const update = {
    $set: {
      'globalStats.lastPurchasedBy': username,
      'globalStats.daysSincePurchased': 0
    },
    $inc: {
      'globalStats.totalPurchased': 1
    }
  };
  await collection.updateOne(query, update, { upsert: true });
}

function updateMongoPurchases(stuffBought, username, mongo) {
  const collection = mongo.db('default').collection(stuffBought);
  // TODO: these can fail independently of each other. make them atomic
  addNewPurchase(username, collection).then(updateGlobalStats(username, collection));
}

module.exports = {
	name: 'bought',
	description: 'Just bought stuff!',
  args: 1,
  usage: '<stuff>',
	execute(message, args, mongo) {
    let stuffBought = args[0];
    if (!buyableStuff[stuffBought]) {
      message.reply(`congrats on your new ${stuffBought} but I'm not tracking that yet!`);
    } else {
      // TODO: retrieve a real value indexed by stuffBought
      updateMongoPurchases(stuffBought, message.author.username, mongo);
      message.channel.setTopic(`0 day(s) since ${stuffBought} ${buyableStuff[stuffBought]} been bought! Last one to buy ${stuffBought}: ${message.author.username}`)
        .then(updated => message.channel.send(`SPENT IT! ${message.author.username} bought skis! The channel topic has been updated.`));
    }
	},
};

module.exports.buyableStuff = buyableStuff;
