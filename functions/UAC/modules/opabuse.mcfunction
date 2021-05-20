#spectator
effect @s[m=c,tag=staffstatus] invisibility 30 10 true
effect @s[m=c,tag=staffstatus] night_vision 30 10 true

#This actually keeps people from doing dmg in creative. using game bug.
#Yes I know weakness in theory  will nerf your damage. However, with strength, your hits won't even register on any mob.
effect @s[m=c,name=!NightwalkerLots] strength 30 255 true

#Disable the GodMode tool
execute @s[tag=staffstatus,scores={opamtoggle=1}] ~~~ tag @s remove tgmGodMode
execute @s[tag=staffstatus,scores={opamtoggle=1}] ~~~ scoreboard players reset @s tgmGodMode


#Adds a tag for the enabled/disabled check
execute @r[scores={opamtoggle=1}] ~~~ scoreboard players set @r OPAM 1
execute @r[scores={opamtoggle=0}] ~~~ scoreboard players set @r OPAM 0
scoreboard players operation @r opamtoggle = opamtoggledummy opamtoggle

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
