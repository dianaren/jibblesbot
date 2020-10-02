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
        lastModified: true,
        'purchaseTime': { $type: 'timestamp' }
     }
  };
  await collection.updateOne({ uuid: uuid }, update, { upsert: true });
}

async function updateLastPurchasedBy(username, collection) {
  const query = { lastPurchasedBy: { $exists: true } };
  const update = {
    $set: {
      lastPurchasedBy: username
    }
  };
  await collection.updateOne(query, update, { upsert: true });
}

async function updateTotalPurchased(collection) {
  const query = { totalPurchased: { $exists: true } };
  const update = {
    $inc: {
      totalPurchased: 1
    }
  };
  await collection.updateOne(query, update, { upsert: true });
}

function updateMongoPurchases(stuffBought, username, mongo) {
  const collection = mongo.db('default').collection(stuffBought);
  addNewPurchase(username, collection);
  updateLastPurchasedBy(username, collection);
  //updateTotalPurchased(collection);
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
      let fakeCounter = 0;
      message.channel.setTopic(`${fakeCounter} day(s) since ${stuffBought} ${buyableStuff[stuffBought]} been bought! Last one to buy ${stuffBought}: ${message.author.username}`)
        .then(updated => message.channel.send(`SPENT IT! ${message.author.username} bought skis! The channel topic has been updated.`));
    }
	},
};

module.exports.buyableStuff = buyableStuff;
