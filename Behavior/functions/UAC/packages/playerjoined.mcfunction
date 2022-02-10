# This executes on THE PLAYER when every time they join ( Good for setting up combat logging and such )
# If gametest isn't enabled it will use the online player objective from autolagclear package

execute @s[scores={in_combat=1,clmtoggle=1}] ~~~ function UAC/asset/clog_punish

#Remove player from realm
execute @s[tag=!staffstatus,tag=PermBan] ~~~ execute @s ~~~ function UAC/asset/ban_disconnect_message
execute @s[tag=!staffstatus,tag=BanCBE] ~~~ execute @s ~~~ function UAC/asset/ban_disconnect_message
execute @s[tag=!staffstatus,tag=Ban] ~~~ execute @s ~~~ function UAC/asset/ban_disconnect_message
execute @s[tag=!staffstatus,tag=illegalitemban] ~~~ execute @s ~~~ function UAC/asset/ban_disconnect_message
execute @s[tag=!staffstatus,tag=BanFly] ~~~ execute @s ~~~ function UAC/asset/ban_disconnect_message
execute @s[tag=!staffstatus,tag=BanPhase] ~~~ execute @s ~~~ function UAC/asset/ban_disconnect_message
execute @s[tag=!staffstatus,scores={warn=3..}] ~~~ execute @s ~~~ function UAC/asset/ban_disconnect_message

event entity @s[tag=!staffstatus,scores={BanPhase=1..}] uac:ban_soft
event entity @s[tag=!staffstatus,scores={BanFly=1..}] uac:ban_soft
event entity @s[tag=!staffstatus,scores={IIB=1..}] uac:ban_soft
event entity @s[tag=!staffstatus,scores={PermBan=1..}] uac:ban_soft
event entity @s[tag=!staffstatus,scores={BanWarn=1..}] uac:ban_soft
event entity @s[tag=!staffstatus,scores={BanCBE=1..}] uac:ban_soft
event entity @s[tag=!staffstatus,scores={warn=3..}] uac:ban_soft

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide