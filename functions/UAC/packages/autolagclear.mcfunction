execute @r[scores={ltmtoggle=1}] ~~~ scoreboard players reset @a entitycount
execute @r[scores={ltmtoggle=1}] ~~~ scoreboard players set @s lagtimer 600
execute @r[scores={ltmtoggle=1}] ~~~ execute @e[type=item] ~~~ scoreboard players add @r[scores={lagtimer=600}] entitycount 1
execute @r[scores={ltmtoggle=1}] ~~~ execute @e[family=monster] ~~~ scoreboard players add @r[scores={lagtimer=600}] entitycount 1


execute @r[scores={ltmtoggle=1}] ~~~ execute @s[scores={entitycount=100..9999}] ~~~ gamerule doentitydrops false
execute @r[scores={ltmtoggle=1}] ~~~ execute @s[scores={entitycount=100..9999}] ~~~ difficulty peaceful
execute @r[scores={ltmtoggle=1}] ~~~ execute @s[scores={entitycount=100..9999}] ~~~ kill @e[type=item]
execute @r[scores={ltmtoggle=1}] ~~~ execute @s[scores={entitycount=100..9999}] ~~~ kill @e[type=arrow]
execute @r[scores={ltmtoggle=1}] ~~~ execute @s[scores={entitycount=100..9999}] ~~~ effect @a[m=!c,name=!nightwalkerlots,tag=!tgmGodMode] clear
execute @r[scores={ltmtoggle=1}] ~~~ execute @s[scores={entitycount=100..9999}] ~~~ scoreboard players reset @a cleararea
execute @r[scores={ltmtoggle=1}] ~~~ execute @s[scores={entitycount=100..9999}] ~~~ scoreboard players reset @a cleararealarge
execute @r[scores={ltmtoggle=1}] ~~~ execute @s[scores={entitycount=100..9999}] ~~~ gamerule doentitydrops true
execute @r[scores={ltmtoggle=1}] ~~~ execute @s[scores={entitycount=100..9999}] ~~~ difficulty hard
execute @r[scores={ltmtoggle=1}] ~~~ execute @s[scores={entitycount=100..9999}] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC §¶§b► Entities have been §2cleared"}]}

execute @r[scores={ltmtoggle=1}] ~~~ scoreboard players reset @a lagtimer
execute @r[scores={rsmtoggle=1}] ~~~ function UAC/asset/random-spawn-asset
execute @a[scores={vipmtoggle=1}] ~~~ function UAC/modules/vip
execute @a[scores={bbmtoggle=1}] ~~~ function UAC/modules/bottombedrock
execute @a[scores={wbmtoggle=1}] ~~~ function UAC/modules/worldborder
execute @a[scores={nemtoggle=1},tag=!staffstatus] ~~~ function UAC/asset/echestdisable
function UAC/packages/bans

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
