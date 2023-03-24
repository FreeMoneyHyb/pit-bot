const mineflayer = require('mineflayer')
const mc = require('minecraft-protocol')
const socks = require('socks').SocksClient
const fs = require("fs");

//Getting args
targetign=process.argv[2]
login=process.argv[3];
proxy=process.argv[4];
proxysplit=proxy.split(":");
loginsplit=login.split(":")

//Setting mineflayer variables
const mcUsername=loginsplit[0];
const mcPassword=loginsplit[1];
const mcServerHost="forums.hypixel.net";
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

bot.on("kicked", (reason) => {
  if (typeof reason === "string") {
    const parsedData = JSON.parse(reason);
    if (parsedData.extra) {
      parsedData.extra.forEach((extra) => {
        if (extra.text && extra.text.includes("is")) {
          if (extra.text.includes("code, please contact")) {
            return;
          }
          const verificationCode = extra.text.split("is ")[1].split(".")[0];
          console.log(mcUsername + "'s Verification Link: https://hypixel.net/link-minecraft/?key="+verificationCode);

          // Write the verification code to a file
          fs.appendFileSync("appeals.txt", "https://hypixel.net/link-minecraft/?key="+verificationCode + "\n", function (err) {
            if (err) throw err;
            console.log("Verification code written to file!");
          });
        }
      });
    }
  }
});

setInterval(() => {}, Number.MAX_SAFE_INTEGER);

bot.on('error', (error) => {
    console.log("error with: " + bot.username);
});
