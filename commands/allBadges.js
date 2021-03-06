const badges = require("../badges.json");
const Discord = require("discord.js");

module.exports = {
  name: "allBadges",
  description: "Displays all available badges and their details.",
  execute(message, args) {
    const keys = Object.keys(badges);

    const embed = new Discord.RichEmbed()
      .setColor("ff4c4c")
      .setTitle("**List of All Available Badges**")
      .setDescription(
        "Description of all our badges. \n **Level:** If badge is levelable, the level it is at. \n **Tier:** The rarity of the badge, with 1-5 being common, uncommon, rare, epic, and legendary."
      );

    for (var i = 0; i < keys.length; ++i) {
      embed.addField(
        "__" + badges[keys[i]].emoji + badges[keys[i]].name + "__",
        "**" +
          badges[keys[i]].description +
          "**" +
          "\n" +
          "Level: " +
          badges[keys[i]].level +
          "\n" +
          "Tier: " +
          badges[keys[i]].rarity
      );
    }

    message.channel.send(embed);
  }
};
