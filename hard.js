//Libraries
const mineflayer = require('mineflayer')
const Vec3 = require('vec3')
const { RaycastIterator } = require('prismarine-world').iterators
const { Webhook } = require('discord-webhook-node');
const hook = new Webhook("your_webhook");
const mc = require('minecraft-protocol')
const socks = require('socks').SocksClient


//Getting args
targetign=process.argv[2]
login=process.argv[3];
proxy=process.argv[4];
proxysplit=proxy.split(":");
loginsplit=login.split(":")

//Need these global variables
var name = "";
var ticks = 0;
var inMid = false;
var inSpawn = true;
let enabled = false;
var antiafk = 0;
var lobbycount = 10;
var lobbyfinder = false;
var lobbyfound = false;
var deadLobbyCheck = false;
var boty;
var damage = 0;
var reportign = ""
var lobbyFinderIgn = "ITruceYouOk"
var warpName = "ITruceYouOk";
var DeadLobbyPlayerCount = 6; //(default 8)
var blobmode = false;

//Setting mineflayer variables
const mcUsername=loginsplit[0];
const mcPassword=loginsplit[1];
const mcServerHost="mc.hypixel.net";
const mcServerPort="25565";
const proxyHost=proxysplit[0];
const proxyPassword=proxysplit[3];
const proxyPort=proxysplit[1];
const proxyUsername=proxysplit[2];

//Random func
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

//Async function to add delay. Function must be of type async and you use it with "await sleep {delay}"
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

bot.once('spawn', async () => {
    name = bot.username;
    hook.send(`**${bot.username}** has logged in.`);
    bot.chat('/p leave')
    bot.chat('/p disband')
    hook.send(`${mcUsername}/${bot.username} has joined with Proxy: ${proxyHost}:${proxyPort}:${proxyUsername}:${proxyPassword}`)
    console.log(`/party ${bot.username}`);
    await sleep(1000);
    bot.chat('/play pit');
})

bot.on('entityHurt', (entity) => {
  damage++;
  if (bot.entity.uuid === entity.uuid) {
      if (damage > 4) {
        damage = 0;
        bot.chat('/oof');
      }
  }
});

bot.on('messagestr', async (message) => {
  if (message.includes(`findstop`)) {
    if (bot.username === lobbyFinderIgn) {
      console.log("[HuysBotta] debug > lobbyfinder disabled")
    }
    lobbyfinder = false;
  }
});

bot.on('messagestr', async (message) => {
  if (message.includes(`findstart`)) {
    if (bot.username === lobbyFinderIgn) {
      bot.chat("/lobby");
      console.log("[HuysBotta] /l");
      console.log("[HuysBotta] debug > lobbyfinder enabled")
    }
    lobbyfinder = true;
  }
});

bot.on('messagestr', async (message) => {
  if (message.includes(`Party`)) {
    if (message.includes(`play`)) {
      bot.chat("/play pit");
    } else if (message.includes(`leave`)) {
      bot.chat("/l");
    } else if (message.includes(`start`)) {
      enabled = true
    } else if (message.includes(`stop`)) {
      enabled = false
      bot.chat("/oof")
    } else if (message.includes(`limbo`)) {
      for (let i = 0; i < 100; i++) {
        sleep(100)
        bot.chat("/");
    }
    }
  }
});

    bot.on('physicTick', () => {
          ticks++;
          if (ticks >= 40) {
            if (lobbyfinder) {
            lobbycount = Object.keys(bot.players).length
            if (bot.username === lobbyFinderIgn) {
              if (lobbycount <= DeadLobbyPlayerCount) {
                console.log('[HuysBotta] Dead lobby found with ' + lobbycount + ' players')
                hook.send('Dead lobby found with ' + lobbycount + ' players <@278650752832897025>');
                bot.chat(`/p transfer ${targetign}`)
                lobbyfound = true
                lobbyfinder = false;
              } else {
                bot.chat("/play pit")
                console.log('[HuysBotta] /play pit (' + lobbycount + ' players)')
              }
            }
          }
            ticks = 0;
          }
        });

//party joining ty kymp
bot.on('messagestr', async (message) => {
    if (message.includes(`${targetign} has invited you to join their party`)) {
      bot.chat('/p leave')
      bot.chat('/p disband')
      await sleep(1000)
      bot.chat(`/p accept ${targetign}`)
    }
});

//bot pathing to coordinates
bot.on('physicTick', () => {
  if(enabled)  {
    if (bot.getControlState('forward') == false) bot.setControlState('forward', true);
    if (bot.getControlState('sprint') == false) bot.setControlState('sprint', true);
    boty = (bot.entity.position.y)
    if (blobmode) {
      if (bot.entity.position.y > 85) {
        if (bot.getControlState('jump') == false) bot.setControlState('jump', true);
        bot.lookAt(new Vec3(0, boty, 0))
      } else {
        if (bot.getControlState('jump') == true) bot.setControlState('jump', false);
        bot.lookAt(new Vec3(0, boty, -13))
      }
    } else {
      bot.lookAt(new Vec3(0, boty, 0))
    }
  } else {
    if (bot.getControlState('forward') == true) bot.setControlState('forward', false);
    if (bot.getControlState('sprint') == true) bot.setControlState('sprint', false);
  }
});

bot.on('kicked', (reason, loggedIn) => {
    console.log(reason, loggedIn);
    if (name!="") { hook.send(`${name} has been kicked.`); }
    hook.send(`${mcUsername} has been kicked, probably banned. Proxy: ${proxyHost}:${proxyPort}:${proxyUsername}:${proxyPassword}`);
})

bot.on('error', err => {
  console.log(err)
})
bot.on('end', reason => {
  console.log(reason)
})