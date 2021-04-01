#Clear items
clear @r[tag=!staffstatus,scores={uoimtoggle=1}] bedrock
clear @r[tag=!staffstatus,scores={uoimtoggle=1}] barrier
clear @r[tag=!staffstatus,scores={uoimtoggle=1}] end_portal_frame
clear @r[tag=!staffstatus,scores={uoimtoggle=1}] mob_spawner
clear @r[tag=!staffstatus,scores={uoimtoggle=1}] map
clear @r[tag=!staffstatus,scores={uoimtoggle=1}] empty_map
clear @r[tag=!staffstatus,scores={uoimtoggle=1}] filled_map

#Dropped Items bypass
execute @r[tag=!staffstatus,scores={uoimtoggle=1}] ~~~ execute @e[type=item,r=4] ~~~ kill @s[type=item,name="bedrock"]
execute @r[tag=!staffstatus,scores={uoimtoggle=1}] ~~~ execute @e[type=item,r=4] ~~~ kill @s[type=item,name="beehive"]
execute @r[tag=!staffstatus,scores={uoimtoggle=1}] ~~~ execute @e[type=item,r=4] ~~~ kill @s[type=item,name="bee_nest"]
execute @r[tag=!staffstatus,scores={uoimtoggle=1}] ~~~ execute @e[type=item,r=4] ~~~ kill @s[type=item,name="§g§lCommand Beehive"]
execute @r[tag=!staffstatus,scores={uoimtoggle=1}] ~~~ execute @e[type=item,r=4] ~~~ kill @s[type=item,name="§g§lCommand Beenest"]
execute @r[tag=!staffstatus,scores={uoimtoggle=1}] ~~~ execute @e[type=item,r=4] ~~~ kill @s[type=item,name="barrier"]
execute @r[tag=!staffstatus,scores={uoimtoggle=1}] ~~~ execute @e[type=item,r=4] ~~~ kill @s[type=item,name="bedrock"]
execute @r[tag=!staffstatus,scores={uoimtoggle=1}] ~~~ execute @e[type=item,r=4] ~~~ kill @s[type=item,name="minecart"]
execute @r[tag=!staffstatus,scores={uoimtoggle=1}] ~~~ execute @e[type=item,r=4] ~~~ kill @s[type=item,name="Invisible Bedrock"]

#Placed Items bypass
execute @r[tag=!staffstatus,scores={uoimtoggle=1}] ~ ~ ~ fill ~8 ~5 ~8 ~-8 ~-5 ~-8 air 0 replace barrier
execute @r[tag=!staffstatus,scores={uoimtoggle=1}] ~ ~ ~ execute @s[scores={bbmtoggle=0}] ~~~ fill ~8 ~5 ~8 ~-8 ~-5 ~-8 air 0 replace bedrock
execute @r[tag=!staffstatus,scores={uoimtoggle=1}] ~ ~ ~ fill ~8 ~5 ~8 ~-8 ~-5 ~-8 air 0 replace command_block
execute @r[tag=!staffstatus,scores={uoimtoggle=1}] ~ ~ ~ fill ~8 ~5 ~8 ~-8 ~-5 ~-8 air 0 replace repeating_command_block
execute @r[tag=!staffstatus,scores={uoimtoggle=1}] ~ ~ ~ fill ~8 ~5 ~8 ~-8 ~-5 ~-8 air 0 replace chain_command_block

#Adds a tag for the enabled/disabled check
execute @r[scores={uoimtoggle=1}] ~~~ scoreboard players set @r UOIM 1
execute @r[scores={uoimtoggle=0}] ~~~ scoreboard players set @r UOIM 0
scoreboard players operation @r uoimtoggle = uoimtoggledummy uoimtoggle

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
