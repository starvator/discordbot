
const Eris = require('eris');
 
const bot = new Eris(process.env.SECRET);   // Replace SECRET in .env with your bot accounts token
 
bot.on('ready', () => {                                // When the bot is ready
    console.log('Ready!');                             // Log "Ready!"
});
 
/*bot.on('messageCreate', (msg) => {                     // When a message is created
    if(msg.content.includes('1337')) {                 // If the message content includes "1337"
        bot.createMessage(msg.channel.id, 'damn it');  // Send a message in the same channel with "damn it"
      console.log("yes");
    }
});*/

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
  if (member.id == '191009347004792832'){
  console.log(member);
  console.log("xxxxx");
  var filename = "http://sv88.onlinevideoconverter.com/download?file=f5j9f5f5a0b1e4";
  bot.joinVoiceChannel(nc.id).then((connection) => {
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
  } else {}
});

bot.on('voiceChannelLeave', (member,nc) => {
  if (member.id == '191009347004792832'){
  console.log(member);
  console.log("xxxxx");
  var filename = "http://sv19.onlinevideoconverter.com/download?file=e4d3e4f5h7j9h7e4";
  bot.joinVoiceChannel(nc.id).then((connection) => {
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
  } else {}
});



bot.connect();                                         // Get the bot to connect to Discord
