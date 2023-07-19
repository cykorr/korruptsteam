const SteamUser = require('steam-user');
const SteamTotp = require('steam-totp');
const readlineSync = require('readline-sync');

const bots = {};
 
bots.newBot = function(config) {
	const bot = new SteamUser({
        promptSteamGuardCode: false,
		dataDirectory: "./temp",
		singleSentryfile: false
    });
	
	bot.username = process.env['USERNAME'];
	bot.password = process.env['PASSWORD'];
	bot.sharedSecret = process.env['SHAREDSECRET'];
	bot.games = config.games;
	bot.receivedMessages = {};
	
	bot.on('loggedOn', function() {
		console.log("[" + "Username:" + this.username + " Password:" + this.password + "] Logged into account");
		bot.setPersona(SteamUser.EPersonaState.Online);
		bot.gamesPlayed(this.games);
	});
 
	bot.on('error', function(e) {
		console.log("[" + this.username + "] " + e);
		setTimeout(function() { bot.doLogin(); }, 30*60*1000);
	});
 
	bot.doLogin = function () {
		this.logOn({ 
			"accountName": this.username,
			"password": this.password
		});
	}
	
	bot.on('steamGuard', function(domain, callback) {
		if (!this.sharedSecret) {
			const authCode = readlineSync.question("["+ Date() + " " + this.username + "] " + 'Steam Guard' + (!domain ? ' App' : '') + ' Code: ');
			callback(authCode);	
		} else {
			const authCode = SteamTotp.generateAuthCode( this.sharedSecret );
			console.log("["+ Date() + " " + this.username + "] Generated Auth Code: " + authCode);
			callback(authCode);	
		}
	});
	return bot;
}
 
module.exports = bots;