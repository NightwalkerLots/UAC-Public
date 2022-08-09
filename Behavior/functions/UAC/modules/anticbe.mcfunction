#execute @e[type=command_block_minecart] ~~~ execute @a[r=10,scores={acmtoggle=1}] ~~~ function UAC/asset/cbeitemwarn

# this'll fix lag bypasses trying to execute the command before it is killed
execute @s[scores={acmtoggle=1}] ~~~ execute @e[type=command_block_minecart] ~~~ scoreboard players set @a cbetime 30
execute @s[scores={amctoggle=1,cbetime=1..}] ~~~ gamerule commandblocksenabled false
scoreboard players remove @s[scores={amctoggle=1,cbetime=1..}] cbetime 1
scoreboard players set @s[scores={amctoggle=1,cbetime=1..2}] cbetime 0

execute @s[tag=!staffstatus,scores={acmtoggle=1,has_gt=0},hasitem={item=beehive,item=bee_nest}] ~~~ function UAC/asset/cbeitemwarn

execute @s[scores={acmtoggle=1}] ~~~ kill @e[type=command_block_minecart]
execute @s[scores={acmtoggle=1}] ~~~ kill @e[name="minecart"]
execute @s[scores={acmtoggle=1}] ~~~ kill @e[type=npc]
execute @s[scores={acmtoggle=1}] ~~~ kill @e[type=falling_block]
execute @s[scores={acmtoggle=1,has_gt=0},tag=!staffstatus] ~~~ clear @s beehive
execute @s[scores={acmtoggle=1,has_gt=0},tag=!staffstatus] ~~~ clear @s bee_nest


#Remove placed Stuff
execute @s[tag=!staffstatus,scores={acmtoggle=1,has_gt=0}] ~ ~ ~ fill ~8 ~5 ~8 ~-8 ~-5 ~-8 air 0 replace beehive
execute @s[tag=!staffstatus,scores={acmtoggle=1,has_gt=0}] ~ ~ ~ fill ~8 ~5 ~8 ~-8 ~-5 ~-8 air 0 replace bee_nest
execute @s[scores={acmtoggle=1}] ~~~ kill @e[type=item,name="bee nest"]
execute @s[scores={acmtoggle=1}] ~~~ kill @e[type=item,name="beehive"]
execute @s[scores={acmtoggle=1}] ~~~ kill @e[type=item,name="tile.movingblock.name"]
execute @s[scores={acmtoggle=1}] ~~~ kill @e[type=item,name="tile.moving_block.name"]

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
