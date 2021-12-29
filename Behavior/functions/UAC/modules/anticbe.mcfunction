execute @e[type=command_block_minecart] ~~~ execute @a[r=10,scores={acmtoggle=1}] ~~~ function UAC/asset/cbeitemwarn
execute @s[scores={acmtoggle=1}] ~~~ kill @e[type=command_block_minecart]
execute @s[scores={acmtoggle=1}] ~~~ kill @e[name="minecart"]
execute @s[scores={acmtoggle=1}] ~~~ kill @e[type=npc]
execute @s[scores={acmtoggle=1}] ~~~ kill @e[r=10,type=moving_block]
execute @s[scores={acmtoggle=1}] ~~~ kill @e[r=10,type=falling_block]
execute @s[scores={acmtoggle=1}] ~~~ kill @e[type=leash_knot]

#buckets
execute @s[scores={acmtoggle=1,CBEBU=1}] ~~~ clear @s cod_bucket
execute @s[scores={acmtoggle=1,CBEBU=1}] ~~~ clear @s pufferfish_bucket
execute @s[scores={acmtoggle=1,CBEBU=1}] ~~~ clear @s salmon_bucket
execute @s[scores={acmtoggle=1,CBEBU=1}] ~~~ clear @s tropical_fish_bucket
execute @s[scores={acmtoggle=1,CBEBU=1}] ~~~ clear @s powder_snow_bucket
execute @s[scores={acmtoggle=1,CBEBU=1}] ~~~ clear @s axolotl_bucket
execute @s[scores={acmtoggle=1,CBEBU=1}] ~~~ clear @s flower_pot

execute @s[scores={acmtoggle=1,CBEBU=1}] ~~~ kill @e[type=item,name="bucket of axolotl"]
execute @s[scores={acmtoggle=1,CBEBU=1}] ~~~ kill @e[type=item,name="bucket of pufferfish"]
execute @s[scores={acmtoggle=1,CBEBU=1}] ~~~ kill @e[type=item,name="bucket of tropical fish"]
execute @s[scores={acmtoggle=1,CBEBU=1}] ~~~ kill @e[type=item,name="bucket of salmon"]
execute @s[scores={acmtoggle=1,CBEBU=1}] ~~~ kill @e[type=item,name="powder snow bucket"]
execute @s[scores={acmtoggle=1,CBEBU=1}] ~~~ kill @e[type=item,name="bucket of cod"]
execute @s[scores={acmtoggle=1,CBEBU=1}] ~~~ kill @e[type=item,name="flower pot"]

#Remove placed Stuff
execute @s[tag=!staffstatus,scores={acmtoggle=1,CBECO=1}] ~ ~ ~ fill ~8 ~5 ~8 ~-8 ~-5 ~-8 air 0 replace beehive
execute @s[tag=!staffstatus,scores={acmtoggle=1,CBECO=1}] ~ ~ ~ fill ~8 ~5 ~8 ~-8 ~-5 ~-8 air 0 replace bee_nest
execute @s[tag=!staffstatus,scores={acmtoggle=1,CBECO=1}] ~ ~ ~ fill ~8 ~5 ~8 ~-8 ~-5 ~-8 air 0 replace command_block
execute @s[tag=!staffstatus,scores={acmtoggle=1,CBECO=1}] ~ ~ ~ fill ~8 ~5 ~8 ~-8 ~-5 ~-8 air 0 replace repeating_command_block
execute @s[tag=!staffstatus,scores={acmtoggle=1,CBECO=1}] ~ ~ ~ fill ~8 ~5 ~8 ~-8 ~-5 ~-8 air 0 replace chain_command_block
execute @s[scores={acmtoggle=1}] ~~~ kill @e[type=item,name="bee nest"]
execute @s[scores={acmtoggle=1}] ~~~ kill @e[type=item,name="beehive"]
execute @s[scores={acmtoggle=1}] ~~~ kill @e[type=item,name="tile.movingblock.name"]

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
