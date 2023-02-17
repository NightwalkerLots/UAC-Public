scoreboard players operation worlddum Worldx = @s X_Coordinate
scoreboard players operation worlddum Worldy = @s Y_Coordinate
scoreboard players operation worlddum Worldz = @s Z_Coordinate
function UAC/asset/toggle_sync
setworldspawn  ~~~
function particle/explode
scoreboard players set worlddum worldcustom 1


#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide