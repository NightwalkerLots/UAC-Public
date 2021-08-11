gamerule doentitydrops false
difficulty peaceful
kill @e[type=arrow]
kill @e[type=polar_bear]
kill @e[type=minecraft:evoker]
kill @e[type=minecraft:area_effect_cloud]
kill @e[type=minecraft:fox]
kill @e[type=minecraft:vex]
kill @e[type=item]
effect @a[scores={vnsh=!1,tgmGodMode=!1}] clear
scoreboard players reset @a cleararea
scoreboard players reset @a cleararealarge
gamerule doentitydrops true
difficulty hard
execute @a[scores={noechestmodule=1},tag=!staffstatus] ~~~ function UAC/asset/echestdisable
difficulty hard

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
