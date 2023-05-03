//This is not meant to be seen

#Ban Checks for stats and stuff
execute @s[tag=!staffstatus,tag=Ban] ~~~ scoreboard players add @s Ban 1
execute @s[tag=!staffstatus,tag=illegalitemban] ~~~ scoreboard players add @s IIB 1
execute @s[tag=!staffstatus,tag=BanFly] ~~~ scoreboard players add @s BanFly 1
execute @s[tag=!staffstatus,tag=BanPhase] ~~~ scoreboard players add @s BanPhase 1
execute @s[tag=!staffstatus,scores={warn=3}] ~~~ scoreboard players add @s BanWarn 1

#1.17 ban chat messages  (06/22/2021)
execute @s[scores={BanWarn=1..}] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC ► §d"},{"selector":"@s"},{"text":"§b §¶§cwas banned due to Reaching 3 Warnings"}]}
execute @s[scores={Ban=1..}] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC ► §d"},{"selector":"@s"},{"text":" §¶§cWas Banned by a OPERATOR"}]}
execute @s[scores={IIB=1..}] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC ► §d"},{"selector":"@s"},{"text":"§b §¶§cwas banned due to Illegal Items"}]}
execute @s[scores={BanFly=1..}] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC ► §d"},{"selector":"@s"},{"text":"§b §¶§cwas banned due to Fly Hacks"}]}
execute @s[scores={BanPhase=1..}] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC ► §d"},{"selector":"@s"},{"text":"§b §¶§cwas banned due to Phase Hacks"}]}

execute @s[tag=!staffstatus,tag=PermBan] ~~~ function UAC/asset/ban_gameplay
execute @s[tag=!staffstatus,tag=Ban] ~~~ function UAC/asset/ban_gameplay
execute @s[tag=!staffstatus,tag=illegalitemban] ~~~ function UAC/asset/ban_gameplay
execute @s[tag=!staffstatus,tag=BanFly] ~~~ function UAC/asset/ban_gameplay
execute @s[tag=!staffstatus,tag=BanPhase] ~~~ function UAC/asset/ban_gameplay
execute @s[tag=!staffstatus,scores={warn=3..}] ~~~ function UAC/asset/ban_gameplay

event entity @s[tag=!staffstatus,scores={BanPhase=1..}] uac:ban_soft
event entity @s[tag=!staffstatus,scores={BanFly=1..}] uac:ban_soft
event entity @s[tag=!staffstatus,scores={IIB=1..}] uac:ban_soft
event entity @s[tag=!staffstatus,scores={PermBan=1..}] uac:ban_soft
event entity @s[tag=!staffstatus,scores={BanWarn=1..}] uac:ban_soft
event entity @s[tag=!staffstatus,scores={warn=3..}] uac:ban_soft

#Prevents overflow from ban checks
execute @s[scores={PermBan=4}] ~~~ scoreboard players set @s PermBan 3
execute @s[scores={Ban=4}] ~~~ scoreboard players set @s Ban 3
execute @s[scores={IIB=4}] ~~~ scoreboard players set @s IIB 3
execute @s[scores={BanFly=4}] ~~~ scoreboard players set @s BanFly 3
execute @s[scores={BanPhase=4}] ~~~ scoreboard players set @s BanPhase 3
execute @s[scores={BanWarn=4}] ~~~ scoreboard players set @s BanWarn 3
