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
const responses = ["Sorry, I'm busy ignoring you right now.", "I'd love to talk, but I'm currently giving someone else the silent treatment.", "I'm not saying I don't want to talk to you, but I'm not saying I do either.", "I'm afraid I can't spare any attention for you right now.", "I'm practicing my nonverbal communication skills right now. Can you tell?", "I was just thinking how great it would be to not talk to you right now.", "I'm trying to cut down on my talking-to-people-I-don't-like time.", "I would love to engage in some casual conversation, but unfortunately, I'm allergic to boring people.", "I'm sorry, I'm not accepting calls from people who annoy me.", "I'm currently at full capacity for fake conversations, but thanks for asking."];
const socks = require('socks').SocksClient

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
var targetign = "DomoZz"
var enabled = false;
var silents = false;
var blobmode = false;
var find = true;
var ticks = 0;
var boty;
const fovDegrees = 165;
var damage = 0;
var strafes = 0;
var spawnY = 85;
const targetPlayerNames = ['seturn', 'boofage', 'RunAlong', 'Hydrate_bot', 'sstraw', 'squidytentacle', 'DDxDucK', 'Pjert', 'Moods30', 'parob', 'coffeecat15', 'SpotifyVibes', 'negjo', "crosspearl", 'Seruadu', "Zombeasts", "Tumasu", "NeverGlitch", "plippy_", "Bcdlam", "Jmh0", "Eli4", "darze_", "xd_joe", "reptaxi", "pythqn", "khanyskitten", "sillymunkey", "timmythepod", "botanikthefish", "russiapit", "slokk", "etangy", "gargantuansalmon", "homozz", "chrisbrownv2", "milkyashell", "deadashell", "heymanninja", "allykat", "wawi", "ezsmoked", "plaigatyt", "immuffinl", "f3r25", "mysticalitems", "muteadru", "sickbf", "cosna", "nojoin", "burpsinear", "newbigstar", "qstw", "apinapit", "okraokraokra", "slayersebie", "pvpmaster12351", "objectification", "foxov", "milkyashell", "pittacts", "jojoplaysgamezzz"].map(name => name.toLowerCase());

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
          const ppx = Math.floor(Math.random() * 9) - 4;
          const ppz = Math.floor(Math.random() * 9) - 4;
          const ppzz = Math.floor(Math.random() * 9) - 4;
          if (!silents) {
            if (bot.getControlState('left') == true) bot.setControlState('left', false);
            if (bot.getControlState('right') == true) bot.setControlState('right', false);
            if (bot.getControlState('jump') == false) bot.setControlState('jump', true);
          }
          if (enabled) {
            if (bot.getControlState('forward') == false) bot.setControlState('forward', true);
            if (bot.getControlState('sprint') == false) bot.setControlState('sprint', true);
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
                  const offsetz = Math.random() * (2 - .01) + .01;
                  const nearestPlayer = bot.nearestEntity(e => e.type === 'player' && e.position.y - bot.entity.position.y <= 3);

                  if (nearestPlayer) {
                    const targetPos = bot.nearestEntity(e => e.type === 'player').position.offset(0, offsetz, 0);
                    const deltaX = targetPos.x - bot.entity.position.x;
                    const deltaY = targetPos.y - bot.entity.position.y;
                    const deltaZ = targetPos.z - bot.entity.position.z;
                    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ);
                    const targetYaw = Math.atan2(-deltaX, -deltaZ);
                    let yawDiff = wrapAngle(targetYaw - bot.entity.yaw);
                    const maxYawDiff = Math.PI / 3; // 75 degrees FOV
                    yawDiff = Math.max(Math.min(yawDiff, maxYawDiff), -maxYawDiff);
                    const numHeadMovements = Math.ceil(Math.abs(yawDiff) / (maxYawDiff / 8));
                    const yawStep = yawDiff / numHeadMovements;
                    const targetPitch = Math.asin(deltaY / distance);
                    let pitchDiff = targetPitch - bot.entity.pitch;
                    const maxPitchDiff = Math.PI / 144;
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
            if (bot.getControlState('sprint') == true) bot.setControlState('sprint', false);
          }
        }
      });

    const randomDelaytr = () => Math.floor(Math.random() * (150000 - 50000 + 1) + 50000);
    setInterval(() => {
      enabled = false
      silents = false
      bot.chat('/play pit');
      let playerCount = Object.keys(bot.players).filter(name => !bot.players[name].isBot).length;
      hook1.send(`${bot.username}: Found New Lobby (Size ${playerCount})`)
      console.log(`${bot.username}: Switched Lobbys (Size ${playerCount})`);
      sleep(1500)
      enabled = false
      silents = false
    }, randomDelaytr());
    
    bot.on('messagestr', async (message) => {
      if (message.includes(`PIT LEVEL UP!`)) {
        const levelUpMatch = message.match(/\[(\d+)\] ➟ \[(\d+)\]/);
        if (levelUpMatch) {
          const previousLevel = parseInt(levelUpMatch[1]);
          const newLevel = parseInt(levelUpMatch[2]);
          console.log(`${bot.username}: LEVEL UP! ${newLevel}`);
          hook2.send(`${bot.username}: has leveled up from level ${previousLevel} to level ${newLevel}`);
        }
      }
    });

    bot.on('messagestr', async (message) => {
      if (message.toLowerCase().includes(`a player has been removed from your game`)) {
        bot.once('playerLeft', (player) => {
          hook3.send(`${bot.username}: has recorded a ban in the pit. The banned player is **${player.username}** ||https://pitpanda.rocks/players/${player.username}||`);
        });
      }
    });
    
    bot.on('spawn', () => {
      const players = bot.players;
      for (const playerName in players) {
        const lowercasePlayerName = playerName.toLowerCase();
        if (targetPlayerNames.includes(lowercasePlayerName)) {
          const player = players[playerName];
          if (player.entity) { // add a check here
            const xLevel = player.entity.position.x;
            const yLevel = player.entity.position.y;
            if (yLevel >= 86) {
              console.log(` `);
            } else if (yLevel <= 85 && (xLevel > 20 || xLevel < -20)) {
              hook6.send(`[**PERMED**]: ${playerName} status ACTIVE **STREAKING OUTSKIRTS** /p ${bot.username}`)
            } else if (yLevel <= 85) {
              hook6.send(`[**PERMED**]: ${playerName} status ACTIVE **STREAKING MID** /p ${bot.username}`)
            }
            console.log(`${playerName} permed ign spotted by ${bot.username}`);
          }
        }
      }
    });

    bot.on('messagestr', async (message) => {
      if (message.toLowerCase().includes('assist!') && message.includes('%')) {
        console.log(`${bot.username}: ${message}`);
        }
    });

    bot.on('messagestr', async (message) => {
      if (message.toLowerCase().includes('death! by')) {
        const regex = /DEATH! by \[\d+\] (\S+) VIEW RECAP/;
        const match = message.match(regex);
        if (match) {
          const playerName = match[1];
          console.log(`${bot.username} Died To ${playerName}`);
        } else {
          console.log(`ERROR: ${message}`);
        }
      }
    });

    bot.on('messagestr', async (message) => {
      if (message.toLowerCase().includes('kill! on')) {
        console.log(`${bot.username}: ${message}`);
        }
    });

    let timeoutExecuted = false;

    bot.on('messagestr', async (message) => {
      if (message.includes('GOONSLAYER9000') || message.includes('xFreeMoneyHub') || message.includes('Zoreveth')) {
        let timeoutExecuted = false;
        bot.chat("/p accept " + "GOONSLAYER9000")
        if (!timeoutExecuted) {
          await new Promise(resolve => setTimeout(resolve, 6500))
          timeoutExecuted = true;
        }
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        bot.chat("/pc " + randomResponse)
        bot.chat("/p leave")
      }
    });

    bot.on('messagestr', async (message) => {
      if (message.toLowerCase().includes('bounty claimed!')) {
        hook4.send(`${message}`);
        }
    });

    bot.on('kicked', (reason) => {
    console.log(mcUsername +":"+ mcPassword + reason);
    hook5.send(mcUsername +":"+ mcPassword + '  ' + proxyHost);
});
    bot.on('error', (error) => {
    console.log("error with: " + mcUsername +":"+ mcPassword);
    hook5.send(mcUsername +":"+ mcPassword + ' has been kicked. Reason: ' + error);
});
