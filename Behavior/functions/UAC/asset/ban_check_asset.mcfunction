#ban check for stats command
execute @s[scores={BanCBE=1..9}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC ► §d"},{"selector":"@s"},{"text":"§b's §¶§cgameplay is currently restricted due to CBE exploits"}]}
execute @s[scores={BanWarn=1..9}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC ► §d"},{"selector":"@s"},{"text":"§b's §¶§cgameplay is currently restricted due to Reaching 3 Warnings"}]}
execute @s[scores={PermBan=1..9}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC ► §d"},{"selector":"@s"},{"text":"§b's §¶§cgameplay is currently restricted due to UAC Global Banned"}]}
execute @s[scores={Ban=1..9}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC ► §d"},{"selector":"@s"},{"text":"§b's §¶§cgameplay is currently restricted due to Banned by a OPERATOR"}]}
execute @s[scores={IIB=1..9}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC ► §d"},{"selector":"@s"},{"text":"§b's §¶§cgameplay is currently restricted due to Illegal Items"}]}
execute @s[scores={BanFly=1..9}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC ► §d"},{"selector":"@s"},{"text":"§b's §¶§cgameplay is currently restricted due to Fly Hacks"}]}
execute @s[scores={BanPhase=1..9}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC ► §d"},{"selector":"@s"},{"text":"§b's §¶§cgameplay is currently restricted due to Phase Hacks"}]}

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
