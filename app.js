var telegramBot = require('node-telegram-bot-api');
var tgtoken = process.env.TG_TOKEN;
var fs = require('fs');
var sys = require('sys');
var exec = require('child_process').exec;

var defaultVoice = 'Kathy';
var bot = new telegramBot(tgtoken, {polling: true});
var latestUpdate = 0;
var commandQueue = [];
var speaking = false;

bot.on('message', function (msg) {
  if(msg.message_id <= latestUpdate) {
    return;
  } else {
    latestUpdate = msg.message_id;
  }
  command = "";
  console.log(msg);
  var voice;
  var settings = fs.readFileSync("./voices.json", encoding="utf8");
  var ignore = false;
  var skipannounce = false;
  settings = JSON.parse(settings);
  if(settings[msg.chat.title] !== undefined) {  
    if(settings[msg.chat.title][msg.from.username] !== undefined) {
      if(settings[msg.chat.title][msg.from.username].ignore !== undefined) {
        ignore = settings[msg.chat.title][msg.from.username].ignore;
      }
      if(settings[msg.chat.title][msg.from.username].voice !== undefined) {
        voice = settings[msg.chat.title][msg.from.username].voice;
      } 
      if(settings[msg.chat.title][msg.from.username].skipannounce !== undefined) {
        skipannounce = settings[msg.chat.title][msg.from.username].skipannounce;
      }
    }
    if(ignore) {
      return;
    }
    if(voice !== undefined) {
      command = "say -v " + "\"" + voice +  "\" ";
      if(!skipannounce) {
        command += msg.from.first_name + " says ";
      }
      command += "\"" + msg.text + "\"";
    } else {
      command = "say -v "+ "\"" + defaultVoice +"\" " 
      if(!skipannounce) {
        command += msg.from.first_name + " says ";
      }
      command += "\"" + msg.text + "\"";
    }
    console.log("command: " + command);
    commandQueue.push(command);
    if(!speaking) {
      speaking=true;
      speak();
    }
  }
});

function speak() {
  if(commandQueue.length === 0) {
    speaking === false;
    return;
  }
  var command = commandQueue.shift();
  exec(command, function(error, stdout, stderr) {
    speak();
  });
}

