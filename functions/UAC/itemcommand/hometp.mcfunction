playsound note.pling @s ~ ~ ~
tellraw @s {"rawtext":[{"text":"§¶§cUAC ► §¶§bGoing to §d"},{"selector":"@s"},{"text":"'s §¶§bspawnpoint in §230 §bseconds. Make sure to stay still."}]}
scoreboard players set @s hometp 1
scoreboard players set @s hometimer 550
kill @e[type=item,name=home]

scoreboard players set @s lstcmd 5
#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
