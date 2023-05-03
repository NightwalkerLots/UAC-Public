#bridge-file-version: #106
hide


tag @a[tag=staffstatus] remove BanCreative
tag @a[tag=staffstatus] remove BanBypass
tag @a[tag=staffstatus] remove Ban




# The 1.17 ban messages are in UAC/asset/ban_asset
#Restrict Player's Gameplay
title @s times 0 100 0
execute @s[tag=!staffstatus] ~~~ execute @s[tag=PermBan] ~~~ function UAC/asset/ban_asset
execute @s[tag=!staffstatus] ~~~ execute @s[tag=BanCreative] ~~~ function UAC/asset/ban_asset
execute @s[tag=!staffstatus] ~~~ execute @s[tag=Ban] ~~~ function UAC/asset/ban_asset
execute @s[tag=!staffstatus] ~~~ execute @s[tag=illegalitemban] ~~~ function UAC/asset/ban_asset
execute @s[tag=!staffstatus] ~~~ execute @s[tag=BanFly] ~~~ function UAC/asset/ban_asset
execute @s[tag=!staffstatus] ~~~ execute @s[scores={warn=3..}] ~~~ function UAC/asset/ban_asset
execute @s[tag=!staffstatus,scores={Ban=1}] ~~~ tag @s add Ban


execute @s[scores={IIB=1..}] ~~~ tag @s add illegalitemban
execute @s[scores={BanFly=1..}] ~~~ tag @s add BanFly
execute @s[scores={BanPhase=1..}] ~~~ tag @s add BanPhase
execute @s[scores={BanWarn=1..}] ~~~ tag @s add BanWarn




#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
