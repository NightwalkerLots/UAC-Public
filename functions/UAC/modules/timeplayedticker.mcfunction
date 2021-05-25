execute @s[scores={tpmtoggle=1}] ~~~ function UAC/asset/timeplayedtimer

scoreboard players add @s[scores={tpmtoggle=1}] timealive 1

#Adds a tag for the enabled/disabled check
execute @s[scores={tpmtoggle=1}] ~~~ scoreboard players set @r TPM 1
execute @s[scores={tpmtoggle=0}] ~~~ scoreboard players set @r TPM 0
scoreboard players operation @s tpmtoggle = tpmtoggledummy tpmtoggle

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide

#This adds the correct functions for all players
scoreboard players add @s timeplayedsec 0
scoreboard players add @s timeplayedmin 0
scoreboard players add @s timeplayedhr 0
scoreboard players add @s timeplayedday 0

###This is now controlled by the animation_controllers file ('animation.controller.walk')