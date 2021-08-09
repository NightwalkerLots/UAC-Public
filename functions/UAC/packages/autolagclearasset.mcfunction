gamerule doentitydrops false
difficulty peaceful
kill @e[type=item]
kill @e[type=arrow]
kill @e[type=polar_bear]
kill @e[type=minecraft:evoker]
kill @e[type=minecraft:area_effect_cloud]
kill @e[type=minecraft:fox]
kill @e[type=minecraft:vex]
effect @a[tag=!staffstatus] clear
scoreboard players reset @a cleararea
scoreboard players reset @a cleararealarge
gamerule doentitydrops true
difficulty hard
tellraw @a {"rawtext":[{"text":"§¶§cUAC §¶§b► Entities have been §2cleared"}]}

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
