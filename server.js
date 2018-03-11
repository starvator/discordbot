const Eris = require('eris');
const bot = new Eris(process.env.SECRET);

//global variables
var mute = false;
var storage = {
    users: [{
            id: '191009347004792832',
            song: 'https://dl42.y2mate.com/youtube/mp3/0/y2mate.com%20-%20john_cena_theme_short_best_quality_-LGHwFanLX4.mp3',
            songName: 'John Cena',
            name: 'starvator'
        },
        {
            id: '182305111685464064',
            song: 'https://dl20.y2mate.com/youtube/mp3/3/y2mate.com%20-%20doot_doot_mr_skeltal_original_WTWyosdkx44.mp3',
            songName: 'Mr. Skeltal',
            name: 'bloodwyrm'
        },
        {
            id: '177531707824668672',
            song: 'https://download-sv1.y2mate.com/?file=5aa3546e94dc1678088b469e',
            songName: 'Triple kill',
            name: 'snowman'
        },
        {
            id: '193958135969480705',
            song: 'https://dl27.y2mate.com/youtube/mp3/2/y2mate.com%20-%20suh_dude_pIHYPaoh79I.mp3',
            songName: 'Suh dude',
            name: 'jay'
        }
    ]
};

bot.on('ready', () => { // When the bot is ready
    console.log('Ready!'); // Log "Ready!"
    //bot.editStatus("online",{name:"you", type:3});
});

bot.on('messageCreate', (msg) => {
    if (msg.content.startsWith('!!help') || (msg.mentions[0] && msg.mentions[0].id == '421839675758608396')) {
        var userSongsToPrint = "";
        storage.users.forEach(function(user) {
            userSongsToPrint += user.name + " - " + user.songName + "\n";
        });
        bot.createMessage(msg.channel.id, "This is what I can do!:\n```Markdown\n#Commands\n!!help     For this page\n!!mute     To mute me\n!!unmute   To unmute me\n!!restart  To restart the bot if it glitches out\n\n#Currently\nmute=" + mute + "\nchannel=Gathering Hall\n\n#Configured Users\n" + userSongsToPrint + "```");
    } else if (msg.content.startsWith('!!mute')) {
        bot.createMessage(msg.channel.id, "Ok... I'll be quiet now :(");
        mute = true;
        console.log("muted");
        bot.editStatus("idle", {});
    } else if (msg.content.startsWith('!!unmute')) {
        bot.createMessage(msg.channel.id, 'yay!');
        mute = false;
        console.log("unmuted");
        bot.editStatus("online", {
            name: "join music",
            type: 0
        });
    } else if (msg.content.startsWith('!!restart')) {
        bot.leaveVoiceChannel('182304878851391489');
        mute = false;
        bot.createMessage(msg.channel.id, "Bot restarted.");
        bot.editStatus("online", {
            name: "join music",
            type: 0
        });
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

bot.on('voiceChannelJoin', (member, nc) => {
    if (member.bot)
        return;
    if (nc.id != '182304878851391489') //if not gathering hall
        return;
    if (mute)
        return;

    storage.users.forEach(function(user) {
        if (member.id == user.id) {
            bot.joinVoiceChannel(nc.id).then((connection) => {
                if (connection.playing)
                    return;
                connection.play(user.song);
                console.log("Now playing " + user.name + " music");
                connection.once("end", () => {
                    console.log("Finished playing " + user.name + " music");
                    bot.leaveVoiceChannel(nc.id);
                });
            });
            return;
        }
    });
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
