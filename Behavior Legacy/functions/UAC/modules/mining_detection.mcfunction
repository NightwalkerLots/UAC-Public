#alert messages
execute @s[scores={mdmtoggle=1}] ~~~ execute @s[scores={diamondmd=1}] ~~~ execute @s[scores={diamondfnd=0}] ~~~ execute @e[type=item,name="diamond",r=5] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §b► §6Mining Detection §d"},{"selector":"@a[r=5]"},{"text":" §¶§bHas come across DIAMONDS."}]}
execute @s[scores={mdmtoggle=1}] ~~~ execute @s[scores={emeraldmd=1}] ~~~ execute @s[scores={emeraldfnd=0}] ~~~ execute @e[type=item,name="emerald",r=5] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §b► §6Mining Detection §d"},{"selector":"@a[r=5]"},{"text":" §¶§bHas come across §2EMERALDS."}]}
execute @s[scores={mdmtoggle=1}] ~~~ execute @s[scores={goldmd=1}] ~~~ execute @s[scores={goldfnd=0}] ~~~ execute @e[type=item,name="raw gold",r=5] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §b► §6Mining Detection §d"},{"selector":"@a[r=5]"},{"text":" §¶§bHas come across §6GOLD."}]}
execute @s[scores={mdmtoggle=1}] ~~~ execute @s[scores={goldmd=1}] ~~~ execute @s[scores={goldfnd=0}] ~~~ execute @e[type=item,name="gold nugget",r=5] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §b► §6Mining Detection §d"},{"selector":"@a[r=5]"},{"text":" §¶§bHas come across §6Nether GOLD."}]}
execute @s[scores={mdmtoggle=1}] ~~~ execute @s[scores={lapizmd=1}] ~~~ execute @s[scores={lapizfnd=0}] ~~~ execute @e[type=item,name="Lapis Lazuli",r=5] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §b► §6Mining Detection §d"},{"selector":"@a[r=5]"},{"text":" §¶§bHas come across §1LAPIS LAZULI."}]}
execute @s[scores={mdmtoggle=1}] ~~~ execute @s[scores={scrapmd=1}] ~~~ execute @s[scores={scrapfnd=0}] ~~~ execute @e[type=item,name="ancient debris",r=5] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §b► §6Mining Detection §d"},{"selector":"@a[r=5]"},{"text":" §¶§bHas come across §dNETHERITE SCRAP."}]}
execute @a[scores={mdmtoggle=1}] ~~~ execute @s[scores={ironmd=1}] ~~~ execute @s[scores={ironfnd=0}] ~~~ execute @e[type=item,name="raw iron",r=5] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §b► §6Mining Detection §d"},{"selector":"@a[r=5]"},{"text":" §¶§bHas come across §8IRON."}]}

#This will keep the alert from spamming staff's chat when near the ore
#Alert already sent : goes back to false when the item is picked up
scoreboard players set @s[scores={mdmtoggle=1}] diamondfnd 0
scoreboard players set @s[scores={mdmtoggle=1}] emeraldfnd 0
scoreboard players set @s[scores={mdmtoggle=1}] goldfnd 0
scoreboard players set @s[scores={mdmtoggle=1}] lapizfnd 0
scoreboard players set @s[scores={mdmtoggle=1}] scrapfnd 0
scoreboard players set @s[scores={mdmtoggle=1}] ironfnd 0

#Alert already sent : stays true until the item is picked up
execute @s[scores={mdmtoggle=1}] ~~~ execute @s[scores={diamondmd=1}] ~~~ execute @e[type=item,name="diamond",r=5] ~~~ scoreboard players set @a[r=5] diamondfnd 1
execute @s[scores={mdmtoggle=1}] ~~~ execute @s[scores={emeraldmd=1}] ~~~ execute @e[type=item,name="emerald",r=5] ~~~ scoreboard players set @a[r=5] emeraldfnd 1
execute @s[scores={mdmtoggle=1}] ~~~ execute @s[scores={goldmd=1}] ~~~ execute @e[type=item,name="raw gold",r=5] ~~~ scoreboard players set @a[r=5] goldfnd 1
execute @s[scores={mdmtoggle=1}] ~~~ execute @s[scores={goldmd=1}] ~~~ execute @e[type=item,name="gold nugget",r=5] ~~~ scoreboard players set @a[r=5] goldfnd 1
execute @s[scores={mdmtoggle=1}] ~~~ execute @s[scores={lapizmd=1}] ~~~ execute @e[type=item,name="Lapis Lazuli",r=5] ~~~ scoreboard players set @a[r=5] lapizfnd 1
execute @s[scores={mdmtoggle=1}] ~~~ execute @s[scores={scrapmd=1}] ~~~ execute @e[type=item,name="ancient debris",r=5] ~~~ scoreboard players set @a[r=5] scrapfnd 1
execute @s[scores={mdmtoggle=1}] ~~~ execute @s[scores={ironmd=1}] ~~~ execute @e[type=item,name="Raw Iron",r=5] ~~~ scoreboard players set @a[r=5] ironfnd 1


#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
