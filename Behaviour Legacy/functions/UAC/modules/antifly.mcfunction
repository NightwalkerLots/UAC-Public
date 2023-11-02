execute @s[tag=!Is_Gliding,tag=!has_trident,tag=!Effect:Levitation,tag=!Effect:Slowfall,tag=!Is_Jumping,tag=!Is_On_Ground,scores={afmtoggle=1,riding=0,fzplr=1,is_sleeping=0,welcomed=1}] ~~~ execute @s ~~~ detect ~-1 ~-1 ~-1 air -1 execute @s ~~~ detect ~ ~-1 ~-1 air -1 execute @s ~~~ detect ~1 ~-1 ~-1 air -1 execute @s ~~~ detect ~-1 ~-1 ~ air -1 execute @s ~~~ detect ~ ~-1 ~ air -1 execute @s ~~~ detect ~1 ~-1 ~ air -1 execute @s ~~~ detect ~-1 ~-1 ~1 air -1 execute @s ~~~ detect ~ ~-1 ~1 air -1 execute @s ~~~ detect ~1 ~-1 ~1 air -1 execute @s ~~~ detect ~-1 ~ ~-1 air -1 execute @s ~~~ detect ~ ~ ~-1 air -1 execute @s ~~~ detect ~1 ~ ~-1 air -1 execute @s ~~~ detect ~-1 ~ ~ air -1 execute @s ~~~ detect ~ ~ ~ air -1 execute @s ~~~ detect ~1 ~ ~ air -1 execute @s ~~~ detect ~-1 ~ ~1 air -1 execute @s ~~~ detect ~ ~ ~1 air -1 execute @s ~~~ detect ~1 ~ ~1 air -1 execute @s ~~~ detect ~-1 ~1 ~-1 air -1 execute @s ~~~ detect ~ ~1 ~-1 air -1 execute @s ~~~ detect ~1 ~1 ~-1 air -1 execute @s ~~~ detect ~-1 ~1 ~ air -1 execute @s ~~~ detect ~ ~1 ~ air -1 execute @s ~~~ detect ~1 ~1 ~ air -1 execute @s ~~~ detect ~-1 ~1 ~1 air -1 execute @s ~~~ detect ~ ~1 ~1 air -1 execute @s ~~~ detect ~1 ~1 ~1 air -1 scoreboard players add @s flycount 1

#counter reset
execute @s[tag=!staffstatus] ~~~ tag @s[scores={afmtoggle=1,2KK001=0,flycount=175..}] add BanFly
execute @s[scores={afmtoggle=1}] ~~~ scoreboard players add @s[scores={2KK001=0,flycount=1..}] flyreset 1
scoreboard players set @s[scores={flycount=1..},tag=Is_On_Ground] flycount 0
scoreboard players set @s[scores={flycount=1..},tag=Is_On_Ground] flyreset 0
execute @s[scores={afmtoggle=1}] ~~~ scoreboard players set @s[scores={flyreset=177..}] flycount 0
execute @s[scores={afmtoggle=1}] ~~~ scoreboard players set @s[scores={flyreset=177..}] flyreset 0


#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
