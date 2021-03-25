execute @r[scores={ltmtoggle=1}] ~~~ scoreboard players reset @a entitycount
execute @r[scores={ltmtoggle=1}] ~~~ scoreboard players set @s lagtimer 600
execute @r[scores={ltmtoggle=1}] ~~~ execute @e[type=item] ~~~ scoreboard players add @r[scores={lagtimer=600}] entitycount 1
execute @r[scores={ltmtoggle=1}] ~~~ execute @e[family=monster] ~~~ scoreboard players add @r[scores={lagtimer=600}] entitycount 1


execute @r[scores={entitycount=100..9999}] ~~~ execute @s[scores={ltmtoggle=1}] ~~~ function UAC/packages/autolagclearasset
execute @r[scores={ltmtoggle=1}] ~~~ scoreboard players reset @a lagtimer
execute @r[scores={rsmtoggle=1}] ~~~ function UAC/asset/random-spawn-asset
execute @a[scores={vipmtoggle=1}] ~~~ function UAC/modules/vip
execute @a[scores={bbmtoggle=1}] ~~~ function UAC/modules/bottombedrock
execute @a[scores={wbmtoggle=1}] ~~~ function UAC/modules/worldborder
execute @a[scores={nemtoggle=1},tag=!staffstatus] ~~~ function UAC/asset/echestdisable
function UAC/packages/bans
function UAC/asset/utility

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
