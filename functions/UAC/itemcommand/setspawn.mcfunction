tellraw @s {"rawtext":[{"text":"§¶§cUAC ► §¶§bSpawn Point has been set for §d"},{"selector":"@s"}]}
spawnpoint @s ~~~
playsound note.pling @s ~ ~ ~
tag @s add spawnset
kill @e[type=item,name=setspawn]

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide

scoreboard players set @s lstcmd 7


#Edited By Catastophe
#Date: 5/20/2021

##This will Show the players Coordinates Set
tellraw @s {"rawtext":[{"text":"§¶§cUAC ► §¶§bSpawn Set To§g X: "},{"score":{"name":"@s","objective":"X_Coordinate"}},{"text":" Y: "},{"score":{"name":"@s","objective":"Y_Coordinate"}},{"text":" Z: "},{"score":{"name":"@s","objective":"Z_Coordinate"}}]}

##This stores the data within the player
scoreboard players operation @s "X_Coord_S" = @s "X_Coordinate"
scoreboard players operation @s "Y_Coord_S" = @s "Y_Coordinate"
scoreboard players operation @s "Z_Coord_S" = @s "Z_Coordinate"
