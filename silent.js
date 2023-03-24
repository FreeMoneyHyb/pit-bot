const mineflayer = require('mineflayer')
const Vec3 = require('vec3')
const { RaycastIterator } = require('prismarine-world').iterators
const { Webhook } = require('discord-webhook-node');
const hook1 = new Webhook("your_webhook");
const hook2 = new Webhook("your_webhook");
const hook3 = new Webhook("your_webhook");
const hook4 = new Webhook("your_webhook");
const hook5 = new Webhook("your_webhook");
const hook6 = new Webhook("your_webhook");
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
var targetign = "Zoreveth"
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
const targetPlayerNames = ['seturn', 'boofage', 'RunAlong', 'Hydrate_bot', 'sstraw', 'squidytentacle', 'DDxDucK', 'Pjert', 'Moods30', 'parob', 'coffeecat15', 'SpotifyVibes', 'negjo'].map(name => name.toLowerCase());

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

    bot.on('physicTick', () => {
      if (enabled) {
          const ppx = Math.floor(Math.random() * 3) - 1;
          const ppz = Math.floor(Math.random() * 3) - 1;
          const ppzz = Math.floor(Math.random() * 3) - 1;
          if (!silents) {
            if (bot.getControlState('left') == true) bot.setControlState('left', false);
            if (bot.getControlState('right') == true) bot.setControlState('right', false);
            if (bot.getControlState('jump') == false) bot.setControlState('jump', true);
          }
          if (enabled) {
            if (bot.getControlState('forward') == false) bot.setControlState('forward', true);
            if (bot.getControlState('jump') == false) bot.setControlState('jump', true);
            boty = bot.entity.position.y;
            if (blobmode) {
              if (bot.entity.position.y > spawnY) {
                if (bot.getControlState('jump') == false) bot.setControlState('jump', true);
                bot.lookAt(new Vec3(0, boty, 0));
              } else {
                if (bot.getControlState('jump') == true) bot.setControlState('jump', false);
                bot.lookAt(new Vec3(0, boty, 0));
              }
            } else {
              if (silents) {
                strafes++;
                if (boty < spawnY) {
                  function wrapAngle(angle) {
                    return (angle + Math.PI) % (2 * Math.PI) - Math.PI;
                  }

                  const randomDelaytzr = () => Math.floor(Math.random() * (3 - 1 + 1) + 1);
                  const offsetz = Math.random() * (2 - 0.01) + 0.01;

                  const maxPlayerX = 3; // maximum x-coordinate of the player to look at
                  const minPlayerX = -3; // minimum x-coordinate of the player to look at

                  const playerFilter = e => e.type === 'player' && e.position.y - bot.entity.position.y <= 3 && e.position.x <= maxPlayerX && e.position.x >= minPlayerX;
                  const nearestPlayer = bot.nearestEntity(playerFilter);

                  if (nearestPlayer) {
                    const targetPos = nearestPlayer.position.offset(0, offsetz, 0);
                    const deltaX = targetPos.x - bot.entity.position.x;
                    const deltaY = targetPos.y - bot.entity.position.y;
                    const deltaZ = targetPos.z - bot.entity.position.z;
                    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ);
                    const targetYaw = Math.atan2(-deltaX, -deltaZ);
                    let yawDiff = wrapAngle(targetYaw - bot.entity.yaw);
                    const maxYawDiff = Math.PI / 3;
                    yawDiff = Math.max(Math.min(yawDiff, maxYawDiff), -maxYawDiff);
                    const numHeadMovements = Math.ceil(Math.abs(yawDiff) / (maxYawDiff / 8));
                    const yawStep = yawDiff / numHeadMovements;
                    const targetPitch = Math.asin(deltaY / distance);
                    let pitchDiff = targetPitch - bot.entity.pitch;
                    const maxPitchDiff = Math.PI / 75;
                    pitchDiff = Math.max(Math.min(pitchDiff, maxPitchDiff), -maxPitchDiff);
                    const numPitchMovements = Math.ceil(Math.abs(pitchDiff) / (Math.PI / 8));
                    const pitchStep = pitchDiff / numPitchMovements;
                    const maxPitch = 0;
                    const maxYaw = 145;
                    let clampedPitch = bot.entity.pitch;
                    let clampedYaw = bot.entity.yaw;
                    for (let i = 0; i < numPitchMovements; i++) {
                      clampedPitch = Math.max(Math.min(clampedPitch + pitchStep, maxPitch), -maxPitch);
                      clampedYaw = Math.max(Math.min(clampedYaw + yawStep, maxYaw), -maxYaw);
                      bot.look(clampedYaw, clampedPitch, true);
                      setTimeout(() => {
                        bot.look(clampedYaw, clampedPitch, true);
                      }, randomDelaytzr());
                    }
                  }
                  if (bot.getControlState('jump') == false) bot.setControlState('jump', true);
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
                  bot.lookAt(new Vec3(ppx, boty, ppz));
                  if (bot.getControlState('jump') == true) bot.setControlState('jump', false);
                }
              } else {
                if (bot.getControlState('jump') == true) bot.setControlState('jump', false);
                bot.lookAt(new Vec3(ppx, boty, ppzz));
              }
            }
          } else {
            if (bot.getControlState('left') == true) bot.setControlState('left', false);
            if (bot.getControlState('right') == true) bot.setControlState('right', false);
            if (bot.getControlState('jump') == true) bot.setControlState('jump', false);
            if (bot.getControlState('forward') == true) bot.setControlState('forward', false);
          }
        }
      });

    bot.once('spawn', () => {
      setInterval(() => {
        if (bot.entity && bot.entity.position && bot.entity.position.y < spawnY) {
          if (bot.getControlState('sprint') == true) {
            bot.setControlState('sprint', false);
          }
        } else {
          if (bot.getControlState('sprint') == false) {
            bot.setControlState('sprint', true);
          }
        }
      }, 100); 
    });
        
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

    bot.on('messagestr', async (message) => {
      if (message.toLowerCase().includes(`a player has been removed from your game`)) {
        bot.once('playerLeft', (player) => {
          hook3.send(`${bot.username}: has recorded a ban in the pit. The banned player is **${player.username}** ||https://pitpanda.rocks/players/${player.username}||`);
        });
      }
    });

    bot.on('kicked', (reason) => {
    console.log(mcUsername +":"+ mcPassword + ' has been kicked. Reason: ' + reason);
    hook5.send(mcUsername +":"+ mcPassword + ' has been kicked. Reason: ' + reason);
});
    bot.on('error', (error) => {
    console.log("error with: " + mcUsername +":"+ mcPassword);
    hook5.send(mcUsername +":"+ mcPassword + ' has been kicked. Reason: ' + error);
});
