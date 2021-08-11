playsound note.pling @s ~ ~ ~
tellraw @s {"rawtext":[{"text":"§¶§cUAC §b► Teleporting §d"},{"selector":"@s"},{"text":" §¶§bto World Spawn §230 §bseconds. Make sure to stay still."}]}
scoreboard players set @s hometp 4
scoreboard players set @s hometimer 550
kill @e[type=item,name=spawn]
scoreboard players set @s lstcmd 8

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
