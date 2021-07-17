#Clear items
clear @s[tag=!staffstatus,scores={uoimtoggle=1}] bedrock
clear @s[tag=!staffstatus,scores={uoimtoggle=1}] barrier
clear @s[tag=!staffstatus,scores={uoimtoggle=1}] end_portal_frame
clear @s[tag=!staffstatus,scores={uoimtoggle=1}] mob_spawner

#Dropped Items bypass
execute @s[tag=!staffstatus,scores={uoimtoggle=1}] ~~~ execute @e[type=item,r=4] ~~~ kill @s[type=item,name="bedrock"]
execute @s[tag=!staffstatus,scores={uoimtoggle=1}] ~~~ execute @e[type=item,r=4] ~~~ kill @s[type=item,name="beehive"]
execute @s[tag=!staffstatus,scores={uoimtoggle=1}] ~~~ execute @e[type=item,r=4] ~~~ kill @s[type=item,name="bee_nest"]
execute @s[tag=!staffstatus,scores={uoimtoggle=1}] ~~~ execute @e[type=item,r=4] ~~~ kill @s[type=item,name="§g§lCommand Beehive"]
execute @s[tag=!staffstatus,scores={uoimtoggle=1}] ~~~ execute @e[type=item,r=4] ~~~ kill @s[type=item,name="§g§lCommand Beenest"]
execute @s[tag=!staffstatus,scores={uoimtoggle=1}] ~~~ execute @e[type=item,r=4] ~~~ kill @s[type=item,name="barrier"]
execute @s[tag=!staffstatus,scores={uoimtoggle=1}] ~~~ execute @e[type=item,r=4] ~~~ kill @s[type=item,name="bedrock"]
execute @s[tag=!staffstatus,scores={uoimtoggle=1}] ~~~ execute @e[type=item,r=4] ~~~ kill @s[type=item,name="minecart"]
execute @s[tag=!staffstatus,scores={uoimtoggle=1}] ~~~ execute @e[type=item,r=4] ~~~ kill @s[type=item,name="Invisible Bedrock"]

#Placed Items bypass
execute @s[tag=!staffstatus,scores={uoimtoggle=1}] ~ ~ ~ fill ~8 ~5 ~8 ~-8 ~-5 ~-8 air 0 replace barrier
execute @s[tag=!staffstatus,scores={uoimtoggle=1}] ~ ~ ~ execute @s[scores={bbmtoggle=0,Y_Coordinate=6..}] ~~~ fill ~8 ~5 ~8 ~-8 ~-5 ~-8 air 0 replace bedrock
execute @s[tag=!staffstatus,scores={uoimtoggle=1}] ~ ~ ~ fill ~8 ~5 ~8 ~-8 ~-5 ~-8 air 0 replace command_block
execute @s[tag=!staffstatus,scores={uoimtoggle=1}] ~ ~ ~ fill ~8 ~5 ~8 ~-8 ~-5 ~-8 air 0 replace repeating_command_block
execute @s[tag=!staffstatus,scores={uoimtoggle=1}] ~ ~ ~ fill ~8 ~5 ~8 ~-8 ~-5 ~-8 air 0 replace chain_command_block


#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
