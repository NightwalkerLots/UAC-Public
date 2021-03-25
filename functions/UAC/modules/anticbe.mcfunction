execute @r[scores={acmtoggle=1}] ~~~ kill @e[r=10,type=command_block_minecart]
execute @r[scores={acmtoggle=1}] ~~~ kill @e[r=10,name="minecart"]
execute @r[scores={acmtoggle=1}] ~~~ kill @e[r=10,type=npc]
execute @r[scores={acmtoggle=1}] ~~~ kill @e[r=10,name="Epic BadMan User"]

#buckets
execute @r[scores={acmtoggle=1}] ~~~ clear @s cod_bucket
execute @r[scores={acmtoggle=1}] ~~~ clear @s pufferfish_bucket
execute @r[scores={acmtoggle=1}] ~~~ clear @s salmon_bucket
execute @r[scores={acmtoggle=1}] ~~~ clear @s tropical_fish_bucket

#Remove placed Stuff
execute @r[tag=!staffstatus,scores={acmtoggle=1}] ~ ~ ~ fill ~8 ~8 ~8 ~-8 ~-8 ~-8 air 0 replace beehive
execute @r[tag=!staffstatus,scores={acmtoggle=1}] ~ ~ ~ fill ~8 ~8 ~8 ~-8 ~-8 ~-8 air 0 replace bee_nest

#Adds a tag for the enabled/disabled check
execute @r[scores={acmtoggle=1}] ~~~ scoreboard players set @r ACM 1
execute @r[scores={acmtoggle=0}] ~~~ scoreboard players set @r ACM 0
scoreboard players operation @r acmtoggle = acmtoggledummy acmtoggle

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
