scoreboard players add @a welcome 1
##scoreboard players add tpsdummy ontick 1
scoreboard objectives add welcome dummy welcome
execute @a[scores={welcome=100}] ~~~ scoreboard objectives add has_gt dummy
execute @a[scores={welcome=110..140}] ~~~ scoreboard players set @s has_gt 0
execute @a[scores={welcome=190}] ~~~ function UAC/asset/welcome_asset
execute @a[scores={welcomed=1}] ~~~ scoreboard players set @s welcome 0
gamerule functioncommandlimit 9999
#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
