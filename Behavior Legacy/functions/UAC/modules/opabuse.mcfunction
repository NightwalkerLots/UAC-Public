execute @s[m=c,scores={opamtoggle=1}] ~~~ gamemode spectator

#Disable the GodMode tool & vanish mode
execute @s[tag=staffstatus,scores={opamtoggle=1,vnsh=1}] ~~~ gamemode spectator
execute @s[tag=staffstatus,scores={opamtoggle=1}] ~~~ scoreboard players reset @s tgmGodMode

#Disable autototem
tag @s[tag=staffstatus,scores={opamtoggle=1}] remove totemaut
scoreboard players set @s[tag=staffstatus,scores={opamtoggle=1}] totemaut 0
scoreboard players set @s[tag=staffstatus,scores={opamtoggle=1}] totemtog 0

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
