const fs = require("file-system");
const path = require("path").join(__dirname, "users");
const steamClient = require('./client.js');
const keepAlive = require('./server.js')
const json = require("/home/runner/steam-booster/users/user.json")

console.log(JSON.stringify(json));

const configsArray = [];
const botArray = [];

keepAlive();
fs.readdirSync(path).forEach(function(file) {
  const user = require("./users/" + file);
  configsArray.push(user);
});

console.log('Number of bots running: ' + configsArray.length);
 
for	(index = 0; index < configsArray.length; index++) {
	const config = configsArray[index];
	
	const bot = steamClient.newBot(config);
	bot.doLogin();
	botArray.push(bot);
}

console.log('Currently running ' + botArray.length + ' bot(s)');