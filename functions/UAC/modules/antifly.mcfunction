execute @s[tag=!Is_Gliding,tag=!Effect:Levitation,tag=!Is_Jumping,tag=!Is_On_Ground,scores={afmtoggle=1}] ~~~ execute @s ~~~ detect ~-1 ~-1 ~-1 air -1 execute @s ~~~ detect ~ ~-1 ~-1 air -1 execute @s ~~~ detect ~1 ~-1 ~-1 air -1 execute @s ~~~ detect ~-1 ~-1 ~ air -1 execute @s ~~~ detect ~ ~-1 ~ air -1 execute @s ~~~ detect ~1 ~-1 ~ air -1 execute @s ~~~ detect ~-1 ~-1 ~1 air -1 execute @s ~~~ detect ~ ~-1 ~1 air -1 execute @s ~~~ detect ~1 ~-1 ~1 air -1 execute @s ~~~ detect ~-1 ~ ~-1 air -1 execute @s ~~~ detect ~ ~ ~-1 air -1 execute @s ~~~ detect ~1 ~ ~-1 air -1 execute @s ~~~ detect ~-1 ~ ~ air -1 execute @s ~~~ detect ~ ~ ~ air -1 execute @s ~~~ detect ~1 ~ ~ air -1 execute @s ~~~ detect ~-1 ~ ~1 air -1 execute @s ~~~ detect ~ ~ ~1 air -1 execute @s ~~~ detect ~1 ~ ~1 air -1 execute @s ~~~ detect ~-1 ~1 ~-1 air -1 execute @s ~~~ detect ~ ~1 ~-1 air -1 execute @s ~~~ detect ~1 ~1 ~-1 air -1 execute @s ~~~ detect ~-1 ~1 ~ air -1 execute @s ~~~ detect ~ ~1 ~ air -1 execute @s ~~~ detect ~1 ~1 ~ air -1 execute @s ~~~ detect ~-1 ~1 ~1 air -1 execute @s ~~~ detect ~ ~1 ~1 air -1 execute @s ~~~ detect ~1 ~1 ~1 air -1 scoreboard players add @s flycount 1

#counter reset
execute @s[scores={afmtoggle=1}] ~~~ scoreboard players add @s[scores={2KK001=0}] flyreset 1
execute @s[scores={afmtoggle=1}] ~~~ scoreboard players set @s[scores={flyreset=150..9999}] flycount 0
execute @s[scores={afmtoggle=1}] ~~~ scoreboard players set @s[scores={flyreset=150..9999}] flyreset 0
execute @s[scores={afmtoggle=1}] ~~~ clear @s[scores={2KK001=0}] elytra

#Tempkick ("Edited By Catastrophe 5/24/2021 -> flycount makes sure anyone above the given value will be kicked/banned")
execute @s[tag=!staffstatus,scores={flycount=120..}] ~~~ execute @s[scores={2KK001=0}] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC ► §d"},{"selector":"@s"},{"text":" §¶§cwas banned for fly hacks"}]}
execute @s[scores={afmtoggle=1}] ~~~ execute @s[scores={2KK001=0}] ~~~ kick @s[m=!c,tag=!staffstatus,scores={flycount=120}] §¶§cUAC §¶§b► Tempkicked for fly hacks

#Adds a tag for the enabled/disabled check
execute @s[scores={afmtoggle=1}] ~~~ scoreboard players set @s AFM 1
execute @s[scores={afmtoggle=0}] ~~~ scoreboard players set @s AFM 0
scoreboard players operation @s afmtoggle = afmtoggledummy afmtoggle

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
