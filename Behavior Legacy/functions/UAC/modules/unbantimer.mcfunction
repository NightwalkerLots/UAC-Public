hide
#unban window system
execute @s[tag=staffstatus,scores={unban=1}] ~~~ scoreboard players remove @s unbantimer 1 
execute @s[tag=staffstatus,scores={unban=1,unbantimer=15..}] ~~~ scoreboard players set mrunban unban 1 
execute @s[tag=staffstatus,scores={unban=1}] ~~~ scoreboard players set @a lagtimer 0
execute @s[tag=staffstatus,scores={unban=1}] ~~~ function UAC/modules/hotbarmessage

execute @s[tag=staffstatus,scores={unban=1}] ~~~ execute @a[tag=BanCreative] ~~~ function UAC/asset/ban_asset_remove
execute @s[tag=staffstatus,scores={unban=1}] ~~~ execute @a[tag=BanWarn] ~~~ function UAC/asset/ban_asset_remove
execute @s[tag=staffstatus,scores={unban=1}] ~~~ execute @a[tag=Ban] ~~~ function UAC/asset/ban_asset_remove
execute @s[tag=staffstatus,scores={unban=1}] ~~~ execute @a[tag=illegalitemban] ~~~ function UAC/asset/ban_asset_remove
execute @s[tag=staffstatus,scores={unban=1}] ~~~ execute @a[tag=BanFly] ~~~ function UAC/asset/ban_asset_remove
execute @s[tag=staffstatus,scores={unban=1}] ~~~ execute @a[tag=BanPhase] ~~~ function UAC/asset/ban_asset_remove
execute @s[tag=staffstatus,scores={unban=1}] ~~~ execute @a[scores={warn=3..}] ~~~ function UAC/asset/ban_asset_remove
execute @s[tag=staffstatus,scores={unban=1}] ~~~ execute @a[scores={BanFly=1..}] ~~~ function UAC/asset/ban_asset_remove
execute @s[tag=staffstatus,scores={unban=1}] ~~~ execute @a[scores={Ban=1..}] ~~~ function UAC/asset/ban_asset_remove
execute @s[tag=staffstatus,scores={unban=1}] ~~~ execute @a[scores={BanPhase=1..}] ~~~ function UAC/asset/ban_asset_remove
execute @s[tag=staffstatus,scores={unban=1}] ~~~ execute @a[scores={BanWarn=1..}] ~~~ function UAC/asset/ban_asset_remove
execute @s[tag=staffstatus,scores={unban=1}] ~~~ execute @a[scores={BanFly=1..}] ~~~ function UAC/asset/ban_asset_remove
execute @s[tag=staffstatus,scores={unban=1}] ~~~ execute @a[scores={IIB=1..}] ~~~ function UAC/asset/ban_asset_remove
execute @s[tag=staffstatus,scores={unban=1}] ~~~ event entity * uac:ban_soft_remove 

execute @s[tag=staffstatus,scores={unban=1,unbantimer=0..15}] ~~~ scoreboard players set @s hometp 3
execute @s[tag=staffstatus,scores={unban=1,unbantimer=0..15}] ~~~ scoreboard players set mrunban unban 0 
execute @s[tag=staffstatus,scores={unban=1,unbantimer=0..8}] ~~~ scoreboard players set @s unban 0
execute @s[tag=staffstatus,scores={unban=0}] ~~~ scoreboard players reset @s unbantimer
