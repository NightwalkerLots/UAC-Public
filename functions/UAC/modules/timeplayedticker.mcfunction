scoreboard players add @r[scores={tpmtoggle=1}] timeplayed 1
scoreboard players add @r[scores={tpmtoggle=1}] timealive 1

#Adds a tag for the enabled/disabled check
execute @r[scores={tpmtoggle=1}] ~~~ scoreboard players set @r TPM 1
execute @r[scores={tpmtoggle=0}] ~~~ scoreboard players set @r TPM 0
scoreboard players operation @r tpmtoggle = tpmtoggledummy tpmtoggle

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
