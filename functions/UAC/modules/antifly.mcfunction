execute @s[tag=!Is_Gliding,tag=!Effect:Levitation,tag=!Is_Jumping,tag=!Is_On_Ground,scores={afmtoggle=1}] ~~~ execute @s ~~~ detect ~-1 ~-1 ~-1 air -1 execute @s ~~~ detect ~ ~-1 ~-1 air -1 execute @s ~~~ detect ~1 ~-1 ~-1 air -1 execute @s ~~~ detect ~-1 ~-1 ~ air -1 execute @s ~~~ detect ~ ~-1 ~ air -1 execute @s ~~~ detect ~1 ~-1 ~ air -1 execute @s ~~~ detect ~-1 ~-1 ~1 air -1 execute @s ~~~ detect ~ ~-1 ~1 air -1 execute @s ~~~ detect ~1 ~-1 ~1 air -1 execute @s ~~~ detect ~-1 ~ ~-1 air -1 execute @s ~~~ detect ~ ~ ~-1 air -1 execute @s ~~~ detect ~1 ~ ~-1 air -1 execute @s ~~~ detect ~-1 ~ ~ air -1 execute @s ~~~ detect ~ ~ ~ air -1 execute @s ~~~ detect ~1 ~ ~ air -1 execute @s ~~~ detect ~-1 ~ ~1 air -1 execute @s ~~~ detect ~ ~ ~1 air -1 execute @s ~~~ detect ~1 ~ ~1 air -1 execute @s ~~~ detect ~-1 ~1 ~-1 air -1 execute @s ~~~ detect ~ ~1 ~-1 air -1 execute @s ~~~ detect ~1 ~1 ~-1 air -1 execute @s ~~~ detect ~-1 ~1 ~ air -1 execute @s ~~~ detect ~ ~1 ~ air -1 execute @s ~~~ detect ~1 ~1 ~ air -1 execute @s ~~~ detect ~-1 ~1 ~1 air -1 execute @s ~~~ detect ~ ~1 ~1 air -1 execute @s ~~~ detect ~1 ~1 ~1 air -1 scoreboard players add @s flycount 1

#counter reset
execute @s[scores={afmtoggle=1}] ~~~ scoreboard players add @s[scores={2KK001=0}] flyreset 1
execute @s[scores={afmtoggle=1,2KK001=0}] ~~~ tag @s[scores={flycount=150..9999},tag=!staffstatus] add BanFly
execute @s[scores={afmtoggle=1}] ~~~ scoreboard players set @s[scores={flyreset=150..9999}] flycount 0
execute @s[scores={afmtoggle=1}] ~~~ scoreboard players set @s[scores={flyreset=150..9999}] flyreset 0
#execute @s[scores={afmtoggle=1}] ~~~ clear @s[scores={2KK001=0}] elytra


#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
