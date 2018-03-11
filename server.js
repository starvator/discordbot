const Eris = require('eris');

const bot = new Eris(process.env.SECRET);

bot.on('ready', () => { // When the bot is ready
    console.log('Ready!'); // Log "Ready!"
    //bot.editStatus("online",{name:"you", type:3});
});

bot.on('messageCreate', (msg) => {
  if (msg.mentions[0]){
    if (msg.mentions[0].id == '421839675758608396'){
        bot.createMessage(msg.channel.id, "You can !!help for this page, !!mute to mute me, !!unmute to unmute me :)");
      if(msg.content.startsWith('!!mute'))  
        console.log("ASD");
      return;
    }
  }
    if(msg.content.startsWith('!!help')) {
      bot.createMessage(msg.channel.id, "You can !!mute to mute me, !!unmute to unmute me :)");
    }
    else if(msg.content.startsWith('!!mute')) {
        bot.createMessage(msg.channel.id, "Ok... I'll be quiet now :(");
        mute = true;
        console.log("muted");
        bot.editStatus("online",{name:"nothing", type:3});
    }  else if (msg.content.startsWith('!!unmute')) {
        bot.createMessage(msg.channel.id, 'yay!');
        mute = false;
        console.log("unmuted");
        bot.editStatus("online",{name:"Join music", type:3});
    }
});

/*bot.on('presenceUpdate', (member) => {
    member.guild.members.forEach(function(user){
      if (!user.bot){
        var game = "No Game";
        if (user.game != null){
          game = user.game.name;
        }
        console.log(user.username+" "+user.status+" "+game+ " "+ user.id);
      }
    });
});*/
var mute = false;
bot.on('voiceChannelJoin', (member, nc) => {
    if (member.bot)
        return;
    if (nc.id != '182304878851391489')//if not gathering hall
        return;
    if (mute)
        return;
    var filename = null;

    switch (member.id) {
        case '191009347004792832':
            filename = "https://dl42.y2mate.com/youtube/mp3/0/y2mate.com%20-%20john_cena_theme_short_best_quality_-LGHwFanLX4.mp3";
            break;
        case '182305111685464064':
            filename = "https://dl20.y2mate.com/youtube/mp3/3/y2mate.com%20-%20doot_doot_mr_skeltal_original_WTWyosdkx44.mp3";
            break;
        case '177531707824668672':
            filename = "https://download-sv1.y2mate.com/?file=5aa3546e94dc1678088b469e";
            break;
        case '193958135969480705':
            filename = "https://dl27.y2mate.com/youtube/mp3/2/y2mate.com%20-%20suh_dude_pIHYPaoh79I.mp3";
            break;
        default:
            filename = null;
    }

    if (filename != null) {
        bot.joinVoiceChannel(nc.id).then((connection) => {
            if (connection.playing)
                return;
            connection.play(filename);
            console.log("Now playing Enter");
            connection.once("end", () => {
                console.log("Finished playing");
                bot.leaveVoiceChannel(nc.id);
            });
        });
    }
});

/*bot.on('voiceChannelLeave', (member,nc) => {
  if (member.bot)
    return;
  if (member.id == '191009347004792832'){
  var filename = "https://dl36.y2mate.com/youtube/mp3/8/y2mate.com%20-%20so_long_shrimp_XOgy-RKEZsQ.mp3";
  bot.joinVoiceChannel(nc.id).then((connection) => {
            if(connection.playing) { // Stop playing if the connection is playing something
                connection.stopPlaying();
            }
            connection.play(filename); // Play the file and notify the user
            console.log("Now playing Exit");
            connection.once("end", () => {
                console.log("Finished playing"); // Say when the file has finished playing
                bot.leaveVoiceChannel(nc.id);
            });
});
  } else {}
});*/

bot.connect(); // Get the bot to connect to Discord


//keep alive
const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
    console.log(Date.now() + " Ping Received");
    response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
    http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
