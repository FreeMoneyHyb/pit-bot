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

var targetign = "LieutenantMonkey"
var enabled = true;
var silents = true;
var blobmode = false;
var find = true;
var ticks = 0;
var boty;
const fovDegrees = 165;
var damage = 0;
var strafes = 0;
var spawnY = 85;

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

    
    bot.on('messagestr', async (message) => {
        if (message.includes(`GreenHats has invited you to join their party`)) {
          bot.chat(`/p accept GreenHats`)
        }
    });


    bot.on('physicTick', () => {
      if (!silents) {
        if (bot.getControlState('left') == true) bot.setControlState('left', false);
        if (bot.getControlState('right') == true) bot.setControlState('right', false);
      }
      if (enabled)  {
        const targetPlayer = bot.players[targetign];
        if (targetPlayer && targetPlayer.entity.position.y <= 85) {
          if (bot.getControlState('forward') == false) bot.setControlState('forward', true);
          if (bot.getControlState('sprint') == false) bot.setControlState('sprint', true);
          boty = (bot.entity.position.y);
          if (silents) {
            if (bot.getControlState('jump') == false) bot.setControlState('jump', true);
            strafes++;
            if (boty < spawnY) {
              bot.lookAt(targetPlayer.entity.position.offset(0, 1.6, 0));
              if (bot.getControlState('jump') == false) bot.setControlState('jump', true);
              strafes++;
              if (strafes < 10) {
                if (bot.getControlState('left') == false) bot.setControlState('left', true);
                if (bot.getControlState('right') == true) bot.setControlState('right', false);
              } else {
                if (bot.getControlState('left') == true) bot.setControlState('left', false);
                if (bot.getControlState('right') == false) bot.setControlState('right', true);
                if (strafes > 20) {
                  strafes = 0;
                }
              }
              const radius = Math.floor(Math.random() * (4.5 - 4 + 1) + 4);
              const player = bot.nearestEntity(entity => entity.type === 'player' && bot.entity.position.distanceTo(entity.position) <= radius);
              if (player) {
                bot.attack(player);
              }
            } else {
              bot.lookAt(new Vec3(0, boty, 0))
              if (bot.getControlState('jump') == true) bot.setControlState('jump', false);
            }
          } else {
            if (bot.getControlState('jump') == true) bot.setControlState('jump', false);
            bot.lookAt(new Vec3(0, boty, 0))
          }
        } else {
          bot.chat("/oof");
          enabled = false;
          silents = false;
        }
      } else {
        if (bot.getControlState('left') == true) bot.setControlState('left', false);
        if (bot.getControlState('right') == true) bot.setControlState('right', false);
        if (bot.getControlState('jump') == true) bot.setControlState('jump', false);
        if (bot.getControlState('forward') == true) bot.setControlState('forward', false);
        if (bot.getControlState('sprint') == true) bot.setControlState('sprint', false);
      }
    });

    setInterval(() => {
      enabled = true;
      silents = true;
    }, 10000);

  bot.once('spawn', async () => {
      if (find) {
        while (true) {
            playerlist=bot.players
            if (targetign in playerlist) {
              enabled = true
              silents = true
              await sleep(15000);
            } else {
              if (bot.getControlState('forward') == true) bot.setControlState('forward', false);
              if (bot.getControlState('jump') == true) bot.setControlState('jump', false);
              enabled = false
              silents = false 
              bot.chat("/play pit");
              console.log(`${bot.username} switching lobbies.`)
              await sleep(6000);
            }
        }
       }
      })
    
    // Log errors and kick reasons:
    bot.on('kicked', console.log)
    bot.on('error', console.log)
