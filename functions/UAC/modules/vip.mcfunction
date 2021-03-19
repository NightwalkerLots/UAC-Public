#Portal Particles Around Player
execute @s[tag=vip,m=s,scores={vip=1}] ~~~ particle minecraft:mob_portal ~1 ~1 ~-1
execute @s[tag=vip,m=s,scores={vip=1}] ~~~ particle minecraft:mob_portal ~1 ~1 ~1
execute @s[tag=vip,m=s,scores={vip=1}] ~~~ particle minecraft:mob_portal ~-1 ~1 ~1
execute @s[tag=vip,m=s,scores={vip=1}] ~~~ particle minecraft:mob_portal ~-1 ~1 ~-1
execute @s[tag=vip,m=s,scores={vip=1}] ~~~ particle minecraft:mob_portal ~ ~1 ~
execute @s[tag=vip,m=s,scores={vip=1}] ~~~ particle minecraft:mob_portal ~1 ~1 ~-1
execute @s[tag=vip,m=s,scores={vip=1}] ~~~ particle minecraft:mob_portal ~1 ~1 ~1
execute @s[tag=vip,m=s,scores={vip=1}] ~~~ particle minecraft:mob_portal ~-1 ~1 ~1
execute @s[tag=vip,m=s,scores={vip=1}] ~~~ particle minecraft:mob_portal ~-1 ~1 ~-1
execute @s[tag=vip,m=s,scores={vip=1}] ~~~ particle minecraft:mob_portal ~ ~1 ~
execute @s[tag=vip,m=s,scores={vip=1}] ~~~ particle minecraft:mob_portal ~1 ~1 ~-1
execute @s[tag=vip,m=s,scores={vip=1}] ~~~ particle minecraft:mob_portal ~1 ~1 ~1
execute @s[tag=vip,m=s,scores={vip=1}] ~~~ particle minecraft:mob_portal ~-1 ~1 ~1
execute @s[tag=vip,m=s,scores={vip=1}] ~~~ particle minecraft:mob_portal ~-1 ~1 ~-1
execute @s[tag=vip,m=s,scores={vip=1}] ~~~ particle minecraft:mob_portal ~ ~1 ~
execute @s[tag=vip,m=s,scores={vip=1}] ~~~ particle minecraft:mob_portal ~1 ~1 ~-1
execute @s[tag=vip,m=s,scores={vip=1}] ~~~ particle minecraft:mob_portal ~1 ~1 ~1
execute @s[tag=vip,m=s,scores={vip=1}] ~~~ particle minecraft:mob_portal ~-1 ~1 ~1
execute @s[tag=vip,m=s,scores={vip=1}] ~~~ particle minecraft:mob_portal ~-1 ~1 ~-1
execute @s[tag=vip,m=s,scores={vip=1}] ~~~ particle minecraft:mob_portal ~ ~1 ~
execute @s[tag=vip,m=s,scores={vip=1}] ~~~ particle minecraft:mob_portal ~1 ~1 ~-1
execute @s[tag=vip,m=s,scores={vip=1}] ~~~ particle minecraft:mob_portal ~1 ~1 ~1
execute @s[tag=vip,m=s,scores={vip=1}] ~~~ particle minecraft:mob_portal ~-1 ~1 ~1
execute @s[tag=vip,m=s,scores={vip=1}] ~~~ particle minecraft:mob_portal ~-1 ~1 ~-1
execute @s[tag=vip,m=s,scores={vip=1}] ~~~ particle minecraft:mob_portal ~ ~1 ~
execute @s[tag=vip,m=s,scores={vip=1}] ~~~ particle minecraft:mob_portal ~1 ~1 ~-1
execute @s[tag=vip,m=s,scores={vip=1}] ~~~ particle minecraft:mob_portal ~1 ~1 ~1
execute @s[tag=vip,m=s,scores={vip=1}] ~~~ particle minecraft:mob_portal ~-1 ~1 ~1
execute @s[tag=vip,m=s,scores={vip=1}] ~~~ particle minecraft:mob_portal ~-1 ~1 ~-1
execute @s[tag=vip,m=s,scores={vip=1}] ~~~ particle minecraft:mob_portal ~ ~1 ~
execute @s[tag=vip,m=s,scores={vip=1}] ~~~ particle minecraft:mob_portal ~1 ~1 ~-1
execute @s[tag=vip,m=s,scores={vip=1}] ~~~ particle minecraft:mob_portal ~1 ~1 ~1
execute @s[tag=vip,m=s,scores={vip=1}] ~~~ particle minecraft:mob_portal ~-1 ~1 ~1
execute @s[tag=vip,m=s,scores={vip=1}] ~~~ particle minecraft:mob_portal ~-1 ~1 ~-1
execute @s[tag=vip,m=s,scores={vip=1}] ~~~ particle minecraft:mob_portal ~ ~1 ~


scoreboard players set @s[tag=vip,scores={vipmtoggle=1}] vip 1
scoreboard players reset @s[tag=!vip,scores={vipmtoggle=1}] vip
scoreboard objectives setdisplay sidebar vip


#Adds a tag for the enabled/disabled check
execute @s[scores={vipmtoggle=1}] ~~~ scoreboard players set @s VIPM 1
execute @s[scores={vipmtoggle=0}] ~~~ scoreboard players set @s VIPM 0
scoreboard players operation @s vipmtoggle = vipmtoggledummy vipmtoggle

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
