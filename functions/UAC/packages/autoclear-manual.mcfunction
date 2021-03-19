gamerule doentitydrops false
difficulty peaceful
kill @e[type=item]
kill @e[type=arrow]
effect @a[m=!c] clear
scoreboard players reset @a cleararea
scoreboard players reset @a cleararealarge
gamerule doentitydrops true
execute @a[scores={noechestmodule=1},tag=!staffstatus] ~~~ function UAC/asset/echestdisable

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
