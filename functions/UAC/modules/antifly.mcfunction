execute @r[scores={afmtoggle=1}] ~~~ execute @s ~~~ detect ~-1 ~-1 ~-1 air -1 execute @s ~~~ detect ~ ~-1 ~-1 air -1 execute @s ~~~ detect ~1 ~-1 ~-1 air -1 execute @s ~~~ detect ~-1 ~-1 ~ air -1 execute @s ~~~ detect ~ ~-1 ~ air -1 execute @s ~~~ detect ~1 ~-1 ~ air -1 execute @s ~~~ detect ~-1 ~-1 ~1 air -1 execute @s ~~~ detect ~ ~-1 ~1 air -1 execute @s ~~~ detect ~1 ~-1 ~1 air -1 execute @s ~~~ detect ~-1 ~ ~-1 air -1 execute @s ~~~ detect ~ ~ ~-1 air -1 execute @s ~~~ detect ~1 ~ ~-1 air -1 execute @s ~~~ detect ~-1 ~ ~ air -1 execute @s ~~~ detect ~ ~ ~ air -1 execute @s ~~~ detect ~1 ~ ~ air -1 execute @s ~~~ detect ~-1 ~ ~1 air -1 execute @s ~~~ detect ~ ~ ~1 air -1 execute @s ~~~ detect ~1 ~ ~1 air -1 execute @s ~~~ detect ~-1 ~1 ~-1 air -1 execute @s ~~~ detect ~ ~1 ~-1 air -1 execute @s ~~~ detect ~1 ~1 ~-1 air -1 execute @s ~~~ detect ~-1 ~1 ~ air -1 execute @s ~~~ detect ~ ~1 ~ air -1 execute @s ~~~ detect ~1 ~1 ~ air -1 execute @s ~~~ detect ~-1 ~1 ~1 air -1 execute @s ~~~ detect ~ ~1 ~1 air -1 execute @s ~~~ detect ~1 ~1 ~1 air -1 scoreboard players add @s flycount 1

#counter reset
execute @r[scores={afmtoggle=1}] ~~~ scoreboard players add @s flyreset 1
execute @r[scores={afmtoggle=1}] ~~~ scoreboard players set @s[scores={flyreset=150..160}] flycount 0
execute @r[scores={afmtoggle=1}] ~~~ scoreboard players set @s[scores={flyreset=150..160}] flyreset 0
execute @r[scores={afmtoggle=1}] ~~~ clear @s elytra

#Tempkick
#tag @r[tag=!staffstatus,scores={flycount=120}] add BanFly
execute @r[scores={flycount=120}] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC ► §d"},{"selector":"@s"},{"text":" §¶§cwas banned for fly hacks"}]}
execute @r[scores={afmtoggle=1}] ~~~ kick @s[tag=!staffstatus,scores={flycount=120}] §¶§cUAC §¶§b► banned for fly hacks

#Adds a tag for the enabled/disabled check
execute @r[scores={afmtoggle=1}] ~~~ scoreboard players set @r AFM 1
execute @r[scores={afmtoggle=0}] ~~~ scoreboard players set @r AFM 0
scoreboard players operation @r afmtoggle = afmtoggledummy afmtoggle

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
