//This is not meant to be seen

#Prohibit further gameplay from player {you got better ideas please add}
execute @s[tag=!staffstatus] ~~~ tp @s 0 900 0
execute @s[tag=!staffstatus] ~~~ effect @s strength 99999999 255 false
execute @s[tag=!staffstatus] ~~~ effect @s resistance 99999999 255 false
execute @s[tag=!staffstatus] ~~~ effect @s blindness 99999999 10 false
execute @s[tag=!staffstatus] ~~~ effect @s slow_falling 99999999 255 false
execute @s[tag=!staffstatus] ~~~ effect @s mining_fatigue 99999999 255 false
execute @s[tag=!staffstatus] ~~~ tag @s godmode
execute @s[tag=!staffstatus] ~~~ function UAC/asset/inv_lock

#1.17 ban title messages  (06/22/2021)
execute @s[tag=!staffstatus] ~~~ title @s[tag=PermBan] title §¶§cUAC ► You are UAC Global Banned!
execute @s[tag=!staffstatus] ~~~ title @s[tag=BanCBE] title §¶§cUAC ► Flagged for CBE
execute @s[tag=!staffstatus] ~~~ title @s[tag=BanCreative] title §¶§cUAC ► Flagged Creative Mode
execute @s[tag=!staffstatus] ~~~ title @s[tag=Ban] title §¶§cUAC ► BANNED BY OPERATOR
execute @s[tag=!staffstatus] ~~~ title @s[tag=illegalitemban] title §¶§cUAC ► Flagged for Illegal Items
execute @s[tag=!staffstatus] ~~~ title @s[tag=BanFly] title §¶§cUAC ► Flagged for Fly Hacks
execute @s[tag=!staffstatus] ~~~ title @s[tag=BanPhase] title §¶§cUAC ► Flagged for No Clip
execute @s[tag=!staffstatus] ~~~ title @s[scores={warn=3}] title §¶§cUAC ► Third Warning Reached
#Ban Checks for stats and stuff
execute @s[tag=!staffstatus,tag=PermBan] ~~~ scoreboard players add @s PermBan 1
execute @s[tag=!staffstatus,tag=BanCBE] ~~~ scoreboard players add @s BanCBE 1
execute @s[tag=!staffstatus,tag=Ban] ~~~ scoreboard players add @s Ban 1
execute @s[tag=!staffstatus,tag=illegalitemban] ~~~ scoreboard players add @s IIB 1
execute @s[tag=!staffstatus,tag=BanFly] ~~~ scoreboard players add @s BanFly 1
execute @s[tag=!staffstatus,tag=BanPhase] ~~~ scoreboard players add @s BanPhase 1
execute @s[tag=!staffstatus,scores={warn=3}] ~~~ scoreboard players add @s BanWarn 1

#1.17 ban chat messages  (06/22/2021)
execute @s[scores={BanCBE=1}] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC ► §d"},{"selector":"@s"},{"text":"§b's §¶§cgameplay has been restricted due to CBE exploits"}]}
execute @s[scores={BanWarn=1}] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC ► §d"},{"selector":"@s"},{"text":"§b's §¶§cgameplay has been restricted due to Reaching 3 Warnings"}]}
#execute @s[scores={PermBan=1}] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC ► §d"},{"selector":"@s"},{"text":" §¶§cis UAC Global Banned"}]}
execute @s[scores={Ban=1}] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC ► §d"},{"selector":"@s"},{"text":" §¶§cWas Banned by a OPERATOR"}]}
execute @s[scores={IIB=1}] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC ► §d"},{"selector":"@s"},{"text":"§b's §¶§cgameplay has been restricted due to Illegal Items"}]}
execute @s[scores={BanFly=1}] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC ► §d"},{"selector":"@s"},{"text":"§b's §¶§cgameplay has been restricted due to Fly Hacks"}]}
execute @s[scores={BanPhase=1}] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC ► §d"},{"selector":"@s"},{"text":"§b's §¶§cgameplay has been restricted due to Phase Hacks"}]}

#Prevents overflow from ban checks
#execute @s[scores={PermBan=4}] ~~~ scoreboard players set @s PermBan 3
execute @s[scores={BanCBE=4}] ~~~ scoreboard players set @s BanCBE 3
execute @s[scores={Ban=4}] ~~~ scoreboard players set @s Ban 3
execute @s[scores={IIB=4}] ~~~ scoreboard players set @s IIB 3
execute @s[scores={BanFly=4}] ~~~ scoreboard players set @s BanFly 3
execute @s[scores={BanPhase=4}] ~~~ scoreboard players set @s BanPhase 3
execute @s[scores={BanWarn=4}] ~~~ scoreboard players set @s BanWarn 3
