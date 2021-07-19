execute @r[scores={ltmtoggle=1}] ~~~ scoreboard players reset @a entitycount
#execute @r[scores={ltmtoggle=1}] ~~~ scoreboard players set @s lagtimer 600
execute @r[scores={ltmtoggle=1}] ~~~ execute @e[type=item] ~~~ scoreboard players add @a entitycount 1
execute @r[scores={ltmtoggle=1}] ~~~ execute @e[family=monster] ~~~ scoreboard players add @a entitycount 1
execute @r[scores={entitycount=100..9999}] ~~~ execute @s[scores={ltmtoggle=1}] ~~~ function UAC/packages/autolagclearasset


execute @r[scores={ltmtoggle=1}] ~~~ scoreboard players reset @a lagtimer
execute @a[tag=staffstatus,scores={rsmtoggle=1}] ~~~ function UAC/asset/random-spawn-asset

execute @a[scores={bbmtoggle=1}] ~~~ function UAC/modules/bottombedrock
#execute @a[scores={wbmtoggle=1}] ~~~ function UAC/modules/worldborder
execute @a[scores={ibmtoggle=1}] ~~~ function UAC/modules/itemban
execute @a[scores={opamtoggle=1}] ~~~ function UAC/modules/opabuse
execute @a[scores={ssmtoggle=1}] ~~~ function UAC/modules/staffstatus
execute @a[scores={ssmtoggle=1}] ~~~ function UAC/modules/enchanted_armor
execute @a[scores={nemtoggle=1},tag=!staffstatus] ~~~ function UAC/asset/echestdisable
function UAC/packages/bans
function UAC/modules/permban
function UAC/modules/ownerstatus
function UAC/asset/toggle_sync

#Extra stuff for TPS control
execute @a ~~~ execute @e[r=100,type=xp_orb] ~~~ tp @s[type=xp_orb] @p
execute @a ~~~ fill ~8 ~5 ~8 ~-8 ~-5 ~-8 air 0 replace light_block



#Syncs toggle for mining detection module
scoreboard players operation @s mdmtoggle = mdmtoggledummy mdmtoggle

#Syncs the Death Effect Toggle for everyone
scoreboard players operation @a Deathef = BDXdummy Deathef
scoreboard players operation @a dethtoggle = dethtoggledummy dethtoggle

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
