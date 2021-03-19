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
#execute @r ~ ~ ~ fill ~20 ~8 ~20 ~-20 ~-8 ~-20 air air 0 replace dispenser
#execute @r[tag=!staffstatus] ~ ~ ~ fill ~20 ~8 ~20 ~-20 ~-8 ~-20 air 0 replace command_block
#execute @r[tag=!staffstatus] ~ ~ ~ fill ~20 ~8 ~20 ~-20 ~-8 ~-20 air 0 replace chain_command_block
#execute @r[tag=!staffstatus] ~ ~ ~ fill ~20 ~8 ~20 ~-20 ~-8 ~-20 air 0 replace repeating_command_block

#clear @s[tag=!staffstatus] beehive
#clear @s bee_nest
#clear @s writable_book
#clear @s[tag=!staffstatus] dispenser

#Mob CBE Methods
# execute @s ~~~ execute @e[r=20,type=!lightning_bolt,type=!llama_spit,type=!arrow,type=!egg,type=!snowball,type=!ender_pearl,type=!area_effect_cloud,type=!xp_bottle,type=!xp_orb,type=!item,family=!player] ~~~ function UAC/asset/anticbeasset


#Prevent wither/dragons
#execute @e[type=wither] ~~~ difficulty peaceful
#execute @e[type=ender_dragon] ~~~ difficulty peaceful
#execute @s ~~~ difficulty hard
#kill @e[type=wither]
#kill @e[type=ender_dragon]

#This keeps people from using xp_orbs as a mob, but tries to keep their functionality
#execute @s ~~~ execute @e[r=2,type=xp_orb] ~~~ xp 10 @p[r=2]
#execute @s ~~~ execute @e[r=2,type=xp_orb] ~~~ scoreboard players add @s cbespawn 1
#execute @s ~~~ execute @e[r=2,type=xp_orb,scores={cbespawn=3..4}] ~~~ kill @s


#Adds a tag for the enabled/disabled check
execute @r[scores={acmtoggle=1}] ~~~ scoreboard players set @r ACM 1
execute @r[scores={acmtoggle=0}] ~~~ scoreboard players set @r ACM 0
scoreboard players operation @r acmtoggle = acmtoggledummy acmtoggle

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
