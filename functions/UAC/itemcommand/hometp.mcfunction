playsound note.pling @s ~ ~ ~
tellraw @s[tag=spawnset] {"rawtext":[{"text":"§¶§cUAC ► §¶§bGoing to §d"},{"selector":"@s"},{"text":"'s §¶§bspawnpoint in §230 §bseconds. Make sure to stay still."}]}
tellraw @s[tag=!spawnset] {"rawtext":[{"text":"§¶§cUAC ► §bYou must set spawn with a item command, sleeping in bed, or through the setspawn GUI option first."}]}
scoreboard players set @s[tag=spawnset] hometp 1
scoreboard players set @s[tag=spawnset] hometimer 550
kill @e[type=item,name=home]

scoreboard players set @s lstcmd 5
#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
