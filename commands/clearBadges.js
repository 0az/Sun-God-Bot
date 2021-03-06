const Discord = require("discord.js");
const badges_json = require("../badges.json");

module.exports = {
	name: 'clearBadges',
	description: 'Deletes all the badges from a user',
	execute(message, args, client, sql) {
    
    //CLEAR BADGE removes all badges to 0
    function clearBadge(columnName, id) {
      var statement =
        "UPDATE badges SET " +
        columnName +
        " = " +
        null +
        ' WHERE id = "' +
        id +
        '";';
      console.log(statement);
      client.removeBadges = sql.prepare(statement);
      client.removeBadges.run();
    }
    
    //GET USER function for getting ID
    function getUserID(mention) {
      if (!mention) return;

      if (mention.startsWith("<@") && mention.endsWith(">")) {
        mention = mention.slice(2, -1);
      }
      if (mention.startsWith("!")) {
        mention = mention.slice(1);
      }

      let guild = client.guilds.get("425866519650631680");

      return guild.member(mention);
    }
    
		const keys = Object.keys(badges_json);
    var user_id;
    
    //Make sure its Irene only
    if (message.author.id !== "433774411682938890") {
      message.channel.send("You are not authorized to use this command!");
      return;
    }
    
    //Check if an ID or mention was passed in
    //parse the members to receive badges
    let guild = client.guilds.get("425866519650631680");
    var mentioned = message.mentions.members.first();
    if (mentioned === undefined) {
      message.channel.send("None mentioned, looking for ids instead...");
      if (args[0] === undefined) {
        message.channel.send("No ids were mentioned. Exiting...");
        return;
      } else {
        //check if the IDs are valid.
        if(!guild.members(args[0])) {
          message.channel.send("User ID invalid. Exiting...");
        } else {
          user_id = args[0];
        }
      } 
    } else {
      user_id = getUserID(args[0]).id;
    
    }
    
    
    for (var i = 0; i < keys.length; i++) {
      let id = `${message.guild.id}-${user_id}`
      clearBadge(keys[i], id);
    }
    message.channel.send("Badges cleared.");
	}
};


