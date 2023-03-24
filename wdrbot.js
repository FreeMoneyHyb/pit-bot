const mineflayer = require('mineflayer')
const Vec3 = require('vec3')
const { RaycastIterator } = require('prismarine-world').iterators
const { Webhook } = require('discord-webhook-node');
const hook = new Webhook("your_webhook");
const hook3 = new Webhook("your_webhook");
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
    return Math.floor(Math.random() * (max - min) + min);
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

const randomDelay = () => Math.floor(Math.random() * (25000 - 15000 + 1) + 15000);

let intervalId = setInterval(async () => {
  const wordsList = ["bhop", "killaura", "reach", "autoblock", "speed", "fly", "velocity", "autoclicker", "noknockback"];
  const blacklistedPlayers = ["ICream2Rhune", "Bait2Rhune", "Jhhasdd8239", "HuntingBounties", "Conduwu", "Axsolo", "Jhhasdd8239", "Cryptshift", "AgentPiggy", "ezocy", "Wumple", "PegOHub", "Mqcksi", "Mqcksi2", "SmhMatthew", "BirchLeaves", "EvilMorty", "NotGladiator", "BrokenIntel", "ShashumgaMan", "RaykGFX", "Baass_", "Fartta", "Rangsoldier", "plseit", "PetcoStore", "Nibion", "Cykuv", "Hadhayosh", "sehoyy_", "NeutralPitPlayer", "Uberhunter", "mattywtf", "foldism", "Iods1", "Rektyyy", "MaksKitten", "OnlyMaks", "4KSO", "ilovekfcomg", "MaksOMG", "7714", "CheesierCheese", "CheeseCheesier", "CheeserCheese", "wallaby_twitch", "HubStorage", "CavemanBooga", "XxMichaelz", "SalmonEvent", "GOONSLAYER9000", "Zoreveth", "BUNNYHOPPERBLERZ", "LieutenantMonkey", "DomoZz", "EDancer"];

  const players = Object.values(bot.players);
  if (players.length > 0) {
    await bot.chat("/play pit");
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const randomPlayer = players[Math.floor(Math.random() * players.length)].username;
    if (randomPlayer === bot.username) {
      console.log("\x1b[31m", `${bot.username} Has Attempted To Report Themselfs They Are Silly Goose >:(`);
      bot.chat("/l")
      setTimeout(async () => {
        await bot.chat("/play pit");
       }, 3000);
      return;
    }
    if (blacklistedPlayers.includes(randomPlayer)) {
      console.log("\x1b[31m", `${randomPlayer} is blacklisted and will not be reported. sorry ${bot.username}`);
      hook.send(`:x: ${randomPlayer} is blacklisted, sorry ${bot.username}`)
      return;
    }
    const randReport = wordsList[Math.floor(Math.random() * wordsList.length)];
    bot.chat(`/wdr ${randomPlayer} ${randReport}`);
    hook.send(`:smirk_cat: **${bot.username}** Has Reported **${randomPlayer}** For **${randReport}** Delay: **${randomDelay()}ms**`)
    console.log("\x1b[32m", `${bot.username} Has Reported ${randomPlayer} For ${randReport}`);
  } else {
    return;

    setTimeout(async () => {
      await bot.chat("/play pit");
    }, 2000);
  }
}, randomDelay());

bot.on('messagestr', async (message) => {
  if (message.toLowerCase().includes(`a player has been removed from your game`)) {
    bot.once('playerLeft', (player) => {
      hook3.send(`${bot.username}: has recorded a ban in the pit. The banned player is **${player.username}** ||https://pitpanda.rocks/players/${player.username}||`);
    });
  }
});

bot.on('kicked', (reason) => {
    console.log(bot.username + ' has been kicked. Reason: ' + reason);
});
bot.on('error', (error) => {
    console.log("error with: " + bot.username);
});
