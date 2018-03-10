
const Eris = require('eris');
 
const bot = new Eris(process.env.SECRET);   // Replace SECRET in .env with your bot accounts token
 
bot.on('ready', () => {                                // When the bot is ready
    console.log('Ready!');                             // Log "Ready!"
});
 
bot.on('messageCreate', (msg) => {                     // When a message is created
    /*if(msg.content.includes('1337')) {                 // If the message content includes "1337"
        bot.createMessage(msg.channel.id, 'damn it');  // Send a message in the same channel with "damn it"
      console.log("yes");
    }*/
  console.log(msg.channel.id);
});

bot.on('presenceUpdate', (member) => {
    member.guild.members.forEach(function(user){
      if (!user.bot){
        var game = "No Game";
        if (user.game != null){
          game = user.game.name;
        }
        console.log(user.username+" "+user.status+" "+game+ " "+ user.id);
      }
    });
});

bot.on('voiceChannelJoin', (member,nc) => {
  var filename = null;
  if (member.id == '191009347004792832'){
  filename = "https://dl42.y2mate.com/youtube/mp3/0/y2mate.com%20-%20john_cena_theme_short_best_quality_-LGHwFanLX4.mp3";
  } else if (member.id == '182305111685464064'){
    filename = "https://dl20.y2mate.com/youtube/mp3/3/y2mate.com%20-%20doot_doot_mr_skeltal_original_WTWyosdkx44.mp3";
  } else if (member.id == '177531707824668672'){
    filename = "https://download-sv1.y2mate.com/?file=5aa3546e94dc1678088b469e";
  } else if (member.id == '193958135969480705'){
    filename = "https://dl27.y2mate.com/youtube/mp3/2/y2mate.com%20-%20suh_dude_pIHYPaoh79I.mp3";
  } else {
  filename = null;
  }
  if (filename != null) {
    console.log(filename);
  bot.joinVoiceChannel(nc.id).then((connection) => {
    console.log(filename);
            if(connection.playing) { // Stop playing if the connection is playing something
                connection.stopPlaying();
            }
            connection.play(filename); // Play the file and notify the user
            console.log("Now playing Enter");
            connection.once("end", () => {
                console.log("Finished playing"); // Say when the file has finished playing
                bot.leaveVoiceChannel(nc.id);
            });
});
}
}); 

bot.on('voiceChannelLeave', (member,nc) => {
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
});

bot.connect();                                         // Get the bot to connect to Discord


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
