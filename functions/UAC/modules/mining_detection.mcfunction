#alert messages
execute @s[scores={mdmtoggle=1}] ~~~ execute @s[scores={diamondmd=1}] ~~~ execute @s[scores={diamondfnd=0}] ~~~ execute @e[type=item,name="diamond",r=5] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC §b► §6Mining Detection §d"},{"selector":"@a[r=5]"},{"text":" §¶§bHas come across DIAMONDS."}]}
execute @s[scores={mdmtoggle=1}] ~~~ execute @s[scores={emeraldmd=1}] ~~~ execute @s[scores={emeraldfnd=0}] ~~~ execute @e[type=item,name="emerald",r=5] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC §b► §6Mining Detection §d"},{"selector":"@a[r=5]"},{"text":" §¶§bHas come across §2EMERALDS."}]}
execute @s[scores={mdmtoggle=1}] ~~~ execute @s[scores={goldmd=1}] ~~~ execute @s[scores={goldfnd=0}] ~~~ execute @e[type=item,name="Gold Ore",r=5] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC §b► §6Mining Detection §d"},{"selector":"@a[r=5]"},{"text":" §¶§bHas come across §6GOLD."}]}
execute @s[scores={mdmtoggle=1}] ~~~ execute @s[scores={lapizmd=1}] ~~~ execute @s[scores={lapizfnd=0}] ~~~ execute @e[type=item,name="Lapis Lazuli",r=5] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC §b► §6Mining Detection §d"},{"selector":"@a[r=5]"},{"text":" §¶§bHas come across §1LAPIS LAZULI."}]}
execute @s[scores={mdmtoggle=1}] ~~~ execute @s[scores={scrapmd=1}] ~~~ execute @s[scores={scrapfnd=0}] ~~~ execute @e[type=item,name="netherite scrap",r=5] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC §b► §6Mining Detection §d"},{"selector":"@a[r=5]"},{"text":" §¶§bHas come across §0NETHERITE SCRAP."}]}
execute @s[scores={mdmtoggle=1}] ~~~ execute @s[scores={ironmd=1}] ~~~ execute @s[scores={ironfnd=0}] ~~~ execute @e[type=item,name="iron ore",r=5] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC §b► §6Mining Detection §d"},{"selector":"@a[r=5]"},{"text":" §¶§bHas come across §8IRON."}]}

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
execute @s[scores={mdmtoggle=1}] ~~~ execute @s[scores={goldmd=1}] ~~~ execute @e[type=item,name="Gold Ore",r=5] ~~~ scoreboard players set @a[r=5] goldfnd 1
execute @s[scores={mdmtoggle=1}] ~~~ execute @s[scores={lapizmd=1}] ~~~ execute @e[type=item,name="Lapis Lazuli",r=5] ~~~ scoreboard players set @a[r=5] lapizfnd 1
execute @s[scores={mdmtoggle=1}] ~~~ execute @s[scores={scrapmd=1}] ~~~ execute @e[type=item,name="netherite scrap",r=5] ~~~ scoreboard players set @a[r=5] scrapfnd 1
execute @s[scores={mdmtoggle=1}] ~~~ execute @s[scores={ironmd=1}] ~~~ execute @e[type=item,name="iron ore",r=5] ~~~ scoreboard players set @a[r=5] ironfnd 1

#Adds a tag for the enabled/disabled check
scoreboard players set @s[scores={mdmtoggle=1}] MDM 1
execute @s[scores={mdmtoggle=0}] ~~~ scoreboard players set @s MDM 0
scoreboard players operation @s diamondmd = mdmtoggledummy diamondmd
scoreboard players operation @s goldmd = mdmtoggledummy goldmd
scoreboard players operation @s lapizmd = mdmtoggledummy lapizmd
scoreboard players operation @s scrapmd = mdmtoggledummy scrapmd
scoreboard players operation @s emeraldmd = mdmtoggledummy emeraldmd
scoreboard players operation @s ironmd = mdmtoggledummy ironmd

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
