execute @s[scores={acmtoggle=1}] ~~~ kill @e[r=10,type=command_block_minecart]
execute @s[scores={acmtoggle=1}] ~~~ kill @e[r=10,name="minecart"]
execute @s[scores={acmtoggle=1}] ~~~ kill @e[r=10,type=npc]
execute @s[scores={acmtoggle=1}] ~~~ kill @e[r=10,name="Epic BadMan User"]

execute @s[scores={acmtoggle=1}] ~~~ kill @e[r=10,type=moving_block]
execute @s[scores={acmtoggle=1}] ~~~ kill @e[r=10,type=falling_block]

#buckets
execute @s[scores={acmtoggle=1}] ~~~ clear @s cod_bucket
execute @s[scores={acmtoggle=1}] ~~~ clear @s pufferfish_bucket
execute @s[scores={acmtoggle=1}] ~~~ clear @s salmon_bucket
execute @s[scores={acmtoggle=1}] ~~~ clear @s tropical_fish_bucket
execute @s[scores={acmtoggle=1}] ~~~ clear @s powder_snow_bucket
execute @s[scores={acmtoggle=1}] ~~~ clear @s axolotl_bucket

#Remove placed Stuff
execute @s[tag=!staffstatus,scores={acmtoggle=1}] ~ ~ ~ fill ~8 ~5 ~8 ~-8 ~-5 ~-8 air 0 replace beehive
execute @s[tag=!staffstatus,scores={acmtoggle=1}] ~ ~ ~ fill ~8 ~5 ~8 ~-8 ~-5 ~-8 air 0 replace bee_nest

#Adds a tag for the enabled/disabled check
scoreboard players operation @s ACM = acmtoggledummy ACM
scoreboard players operation @s acmtoggle = acmtoggledummy acmtoggle

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
