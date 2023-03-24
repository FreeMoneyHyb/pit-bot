//Libraries
const mineflayer = require('mineflayer')
const Vec3 = require('vec3')
const { RaycastIterator } = require('prismarine-world').iterators
const { Webhook } = require('discord-webhook-node');
const mc = require('minecraft-protocol')
const socks = require('socks').SocksClient

//Getting args
targetign=process.argv[2]
login=process.argv[3];
proxy=process.argv[4];
proxysplit=proxy.split(":");
loginsplit=login.split(":")

//Setting mineflayer variables
const mcUsername=loginsplit[0];
const mcPassword=loginsplit[1];
const mcServerHost="mc.hypixel.net";
const mcServerPort="25565";
const proxyHost=proxysplit[0];
const proxyPassword=proxysplit[3];
const proxyPort=proxysplit[1];
const proxyUsername=proxysplit[2];

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

//Create client using variables
const client = mc.createClient({
  connect: client => {
      socks.createConnection({
          proxy: {
              host: proxyHost,
              port: parseInt(proxyPort),
              type: 5,
              userId: proxyUsername,
              password: proxyPassword
          },
          command: 'connect',
          destination: {
              host: mcServerHost,
              port: parseInt(mcServerPort)
          }
      }, (err, info) => {
          if (err) {
              console.log(err)
              return
          }

          client.setSocket(info.socket)
          client.emit('connect')
      })
  },

  host: mcServerHost,
  port: parseInt(mcServerPort),
  username: mcUsername,
  password: mcPassword,
  auth: 'microsoft',
  version: '1.8.9',
})

//Create bot using client
const bot = mineflayer.createBot({ client: client, hideErrors: true });

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

let messageLogged = false;

   bot.on('login', () => {
      console.log(bot.username + ' Connected');
      sleep(3000)
    });
  const words = [
  "I have a lot of vile and need new pants for battle.",
  "I want fresh pants and have enough vile to buy them.",
  "My old pants are worn out, time to trade my vile for new ones.",
  "I'm ready to trade my vile for fresh pants.",
  "I need new pants for fighting and have plenty of vile to spend.",
  "I've saved up vile to buy new pants for battle.",
  "Merchants in town have new pants, time to trade my vile for them.",
  "I want to trade my vile for fresh pants to replace my worn-out ones.",
  "I have vile to spend and need new pants for the Pit.",
  "Time to buy fresh pants with my pile of vile.",
  "I need fresh pants and have vile to trade for them.",
  "I'm ready to trade in my vile for some new pants.",
  "I've got vile to spend on new pants for the Pit.",
  "I'm trading vile for fresh pants to replace my old ones.",
  "My vile can buy me some fresh pants for battle.",
  "I need new pants and have enough vile to buy them.",
  "I want fresh pants for fighting and have saved up enough vile to get them.",
  "Merchants are selling new pants, time to trade in my vile.",
  "I have vile to spare, might as well buy some new pants.",
  "Time to use my vile to buy new pants for the Pit.",
  "In search of powerful gear, willing to trade for mystic items. /trade me",
  "Looking for an edge in the Pit, seeking to purchase mystic items. /p me",
  "Want to buy mystic items to dominate in the Pit. /trade me",
  "My foes won't stand a chance with my new mystic gear. /party me",
  "Need to beef up my arsenal with mystic items, ready to buy. /trade me",
  "Hunting for powerful items to take down my enemies, offering vile for mystic gear. /p me",
  "Mystic items are the key to victory, I'm looking to buy. /trade me",
  "Ready to dominate the Pit with new mystic gear. /party me",
  "Buying mystic items to help me climb to the top of the leaderboard. /trade me",
  "Seeking mystic items to increase my strength and power. /p me",
  "Mystic gear is essential to success in the Pit, I'm looking to buy. /trade me",
  "In need of mystical weapons and armor for the ultimate battle. /party me",
  "Looking to purchase powerful items to help me conquer the Pit. /trade me",
  "Buying mystic items to become a true champion of the Pit. /p me",
  "New mystical gear will help me become the ultimate warrior. /trade me",
  "Seeking the power of mystic items to crush my foes. /party me",
  "Ready to buy mystical weapons and armor to dominate in the Pit. /trade me",
  "Buying mystic items to enhance my abilities and crush my competition. /p me",
  "In search of the ultimate weapons and armor for the most epic battles. /trade me",
  "Mystic items are the key to becoming a legend in the Pit. /party me",
  "I'm looking to buy pants bundles for 20-25 vile each. /trade me",
  "Want to buy pants bundles for the Pit. /p me",
  "Looking for pants bundles, willing to pay 20-25 vile. /friend me",
  "In need of pants bundles, have plenty of vile to trade. /trade me",
  "Buying pants bundles for 20-25 vile, DM me. /party me",
  "Searching for pants bundles to purchase with vile. /p me",
  "Willing to trade 20-25 vile for pants bundles. /friend me",
  "Want to buy pants bundles for the Pit, offering 20-25 vile. /trade me",
  "Looking to purchase pants bundles with my stash of vile. /p me",
  "Trading vile for pants bundles, offering 20-25 vile per bundle. /party me",
  "Looking for tips on how to dominate the competition. /p me",
  "Want to step up my game and become a top player. /party me",
  "Need advice on how to improve my fighting skills. /friend me",
  "Looking for someone to teach me new strategies. /p me",
  "Want to learn how to make the most out of my gear. /party me",
  "Need help with my playstyle and decision making. /friend me",
  "Looking for tips on how to grind more efficiently. /p me",
  "Want to master the art of combos and chaining. /party me",
  "Need guidance on how to outsmart my opponents. /friend me",
  "Looking for advice on how to optimize my perks and kits. /p me",
  "I'm searching for a quiet lobby. /p me",
  "Looking for an empty lobby to grind. /party me",
  "I need a peaceful lobby to focus on my grinding. /friend me",
  "Trying to find a dead lobby for uninterrupted gameplay. /p me",
  "Need to find a quiet lobby for optimal grinding. /friend me",
  "I want to avoid crowded lobbies, looking for a dead one. /p me",
  "Hoping to find an empty lobby to improve my gameplay. /party me",
  "Looking for a less busy lobby for smooth gameplay. /p me",
  "Trying to find a deserted lobby for some peaceful gaming. /friend me",
  "I'm searching for a dead lobby to dominate. /party me",
]; 
   
// Function to choose a random word from the array
    function chooseRandomWord() {
      const index = Math.floor(Math.random() * words.length);
      return words[index];
    }

    setInterval(() => {
      bot.chat("/play pit")
      setTimeout(() => {
        const delay = Math.floor(Math.random() * 2000) + 3000;
        setTimeout(() => {
          const word = chooseRandomWord();
          bot.chat(word);
        }, delay);
      }, 4000);
    }, 3000);

    bot.on('kicked', console.log)
    bot.on('error', console.log)
