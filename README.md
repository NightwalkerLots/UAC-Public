<div align="center">
  <br />
    <p>
      <a href="https://unityentertainment.xyz/"><img src="https://i.imgur.com/XSoKqE1.png" width="600" alt="Unity Entertainment" /></a>
    </p>

UAC is an anticheat designed for Minecraft Bedrock edition realms or servers ran by BDS. This has been tested on many Major Networks and has never had a false positive.

## Acknowledgements

 - [Hydra Anticheat v1](https://discord.gg/DD53B8QwEQ)
 - [RomanMender](https://github.com/romanmender)
  
## Authors

- [@NightwalkerLots](https://twitter.com/LastoftheSorrow)
- [@Catastrophy](https://twitter.com/LastoftheSorrow)

  
## Deployment

To get started with applying UAC to your realm, you'll first want to make a local world. Make sure this world has all experimental features enabled as well as cheats enabled as well. After you spawn in you may save & quit. Now, you'll replace the world on your realm with this world. This is to make sure that everything in UAC works properly on the realm. For access to Github and early updates, as well as the ability to report bugs, please join the discord!! https://discord.gg/7Us7ER8WUw

When you join you'll be welcomed with a few messages along with being prompted on what the help command is. By performing the help command while having staff access, you'll see this message.

![Logo](https://my.mcpedl.com/storage/addons/8434/images/unity-anticheat--uac-v21_2.png)

You will be able to toggle features within UAC by using the toggle command

![Logo](https://my.mcpedl.com/storage/addons/8434/images/unity-anticheat--uac-v21_3.png)
  
## Features

- Customizable
- No false positives
- No command blocks
- No ticking areas
- Simple and easy to use 

Features (Toggleabled)

Item Commands
When enabled, will allow players to use commands via dropping items.
By naming an item one of the following: home - spawn - setspawn - stats
and then dropping the item will allow the player to perform the corresponding commands.

Auto Lag Clear
This does not work on a timer. This instead works on an entity count. When the number of entities (hostile mobs and dropped items) reaches 100, UAC will do a Lag Clear Automatically by removing those entities. This is good for TPS control.. The current amount of entities that are present can be seen when going into creative mode

Anti-Frostwalker
This prevents players from using the frost walker enchantment. The frost walker enchant has a history of tanking a realm's TPS, and in some cases like in an anarchy realm environment, can be modified by third-party clients to crash a realm instantly. UAC gives the option to prevent this by forcing players to wear boots that they cannot drop/move in their inventory.

Time played Tracker
This will keep track of how long players have played on the realm. Their Time Played can be viewed by using the stats command on them. A play can also check their own time played, along with other stats by stopping an item called "stats" if Item commands are enabled.

Anti-Fly
If UAC detects a non-staff member using fly hacks, the player will be temporarily kicked from the realm. It acts as a good deterrent that will discourage players from flying around freely. However, it will also disable the elytra. This is useful for kitpvp realms and such.

Disable-Echests
UAC has the option to disable the use of ender chests.

Anti-CBE
This will prevent players from using the CBE (Command Block Exploit). This is a very dangerous exploit which players can use do perform the command in realms without the need to be the operator. However, this will disable the use of beehives/nests as well as all fish buckets.

Anti-Spawneggs
This prevents non-staff players from obtaining/using Spawn eggs in your realm.

Extra Lag Prevent
Should only be enabled in extreme cases, such as anarchy/factions realms. This does a number of things such as prevents wither spamming, teleports XP orbs to the player closest to it (so that they don't take up entity space), auto clears rotten flesh off the ground (as they do not have a crafting recipe) as well as other small methods of TPS control that won't be noticeable or have any big impact besides the methods stated.

Unobtainable Items Protection
If the item is not obtainable (Bedrock, barriers, end portal frames, fire tiles, etc..), it will be auto cleared from non-staff players if this module is enabled.

Auto Replace Bottom Bedrock Layer
This will automatically replace the bottom bedrock layer which can prove useful in some anarchy environments or minigames in the overworld. Just be aware that this will also do the same in every dimension. 

World Border (10 - 100k radius)
When enabled, will keep players from going past 70k blocks from spawn. The size of the world border is customizable

Fake Staff Protection Modules 
This is meant for more add-on savvy realm owners and provides an extra layer of security. When this is toggled, a key is needed to be executed on a player to give the staff. The tag staff will automatically be removed from all players who haven't had the key executed on them. The key can be found in the code of UAC and is made of two UUIDs. Changing the key with new UUIDs is extremely recommended to make sure the key is unique to your realm.

Mining Detection Modules
When this is toggled, staff will receive notifications when players come across specific ores. The list of ores they get notifications for is customizable.

WorldSpawn Randomizer
This will randomize the realm's worldspawn point within a 1k radius from the center.
The current world spawn coords can be seen when going into creative mode.

Kill/Death Counter 
This is on by default, and cannot be toggled off. UAC will keep track of your kills and deaths as well as your current killstreak.

Useful tools/commands for staff members to use
UAC comes with commands for staff to use that can help with managing/moderating players. You can ban/unban, clear players' ender chests, see players' stats, and so much more.

Special effects/sounds apon player death
When a player dies, lightning will strike as well as a particle explosion followed with a cool sound effect.
## Documentation

[Documentation](https://linktodocumentation)

  UAC is an Anti Cheat that utilizes functions to protect your Minecraft Realm. By simply applying this behavior pack to your realm, you will have access to a tool that better protects your realm against exploits that may crash/lag your realm. UAC is not a plugin, and cannot prevent people from cheating on your realm. However, it does act as a good deterrent to prevent game-breaking exploits from being used, as well as a few other tools for staff members to use. Staff tools such as good TPS control from the "Auto Lag Clear" and the "Extra Lag Prevent" modules as well as tools to better manage players, and even view in-game info about those players such as their current infraction amount, their current game mode, and other important details that UAC will keep track of for you. It is customizable in the sense that you can toggle the features you want on/off without ever touching the addon files or using command blocks. Without anything turned on, UAC by default will keep anyone who isn't a staff member from entering creative mode. UAC has too much to cover on this page, so the developer has provided a showcase/tutorial that you may view below on how to better use UAC. Any comments that you may want to share with us below, will be seen much faster if you provide that feedback within our UAC Discord Server (https://discord.gg/7Us7ER8WUw).
## Support

Be sure to join the UAC Discord (https://discord.gg/7Us7ER8WUw)
Also, click HERE to see a showcase/tutorial video on how to use the AntiCheat
as there is too much to simply say on this page.

  
