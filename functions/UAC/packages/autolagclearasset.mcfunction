gamerule doentitydrops false
difficulty peaceful
kill @e[type=item]
kill @e[type=arrow]
effect @a[m=!c,name=!nightwalkerlots,tag=!tgmGodMode] clear
scoreboard players reset @a cleararea
scoreboard players reset @a cleararealarge
gamerule doentitydrops true
difficulty hard
tellraw @a {"rawtext":[{"text":"§¶§cUAC §¶§b► Entities have been §2cleared"}]}

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
