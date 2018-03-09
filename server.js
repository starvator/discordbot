const Eris = require('eris');
 
const bot = new Eris(process.env.DISCORD_BOT_TOKEN);   // Replace DISCORD_BOT_TOKEN in .env with your bot accounts token
 
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
        console.log(user.username+" "+user.status+" "+game);
      }
    });
});
bot.connect();                                         // Get the bot to connect to Discord
