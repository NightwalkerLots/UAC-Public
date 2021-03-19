tellraw @s {"rawtext":[{"text":"§¶§cUAC ► §¶§bSpawn Point has been set for §d"},{"selector":"@s"}]}
spawnpoint @s ~~~
playsound note.pling @s ~ ~ ~
kill @e[type=item,name=setspawn]

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
