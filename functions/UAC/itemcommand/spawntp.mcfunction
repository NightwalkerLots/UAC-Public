playsound note.pling @s ~ ~ ~
tellraw @s {"rawtext":[{"text":"§¶§cUAC §b► Teleported §d"},{"selector":"@s"},{"text":" §bto world spawn"}]}
tp @s 885 75 380
kill @e[type=item,name=spawn]


#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
