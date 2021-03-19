#bridge-file-version: #106
hide

#Unban
tag @s[tag=unban] remove BanCreative
tag @s[tag=unban] remove BanCBE
tag @s[tag=unban] remove BanBypass
tag @s[tag=unban] remove Ban
tag @s[tag=unban] remove illegalitemban
tag @s[tag=unban] remove BanFly
tag @s[tag=unban] remove BanPhase
scoreboard players reset @s[tag=unban] warn
scoreboard players reset @s[tag=unban] warnillegal
gamemode s @s[tag=unban]

tag @s[tag=staffstatus] remove BanCreative
tag @s[tag=staffstatus] remove BanCBE
tag @s[tag=staffstatus] remove BanBypass
tag @s[tag=staffstatus] remove Ban
tag @s[tag=bypass] add BanBypass



#Autoban Creative/CBE
tag @s[tag=!staffstatus,m=c] add BanCreative
execute @e[type=command_block_minecart] ~~~ tag add @s[r=5] BanCBE

#Kick Messages
#execute @s[tag=BanCreative] ~~~ tellraw @s {"rawtext":[{"text":"§¶§c► UAC - Player Kicked - Changing Gamemode"}]}
#execute @s[tag=staff,m=c] ~~~ execute @s[tag=!staffcheck] ~~~ tellraw @s {"rawtext":[{"text":"§¶§c► UAC - Player Kicked - Changing Gamemode"}]}
execute @s[tag=BanCBE] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC ► §d"},{"selector":"@s"},{"text":" §¶§cwas season banned for CBE exploits"}]}
execute @s[tag=BanBypass] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC ► §d"},{"selector":"@s"},{"text":" §¶§cwas season banned for bypass attempt"}]}
execute @s[tag=Ban] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC ► §d"},{"selector":"@s"},{"text":" §¶§cwas season banned by a operator"}]}
execute @s[scores={warn=3}] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC ► §d"},{"selector":"@s"},{"text":" §¶§cwas season banned for reaching 3 warnings"}]}
execute @s[tag=illegalitemban] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC ► §d"},{"selector":"@s"},{"text":" §¶§cwas season banned for illegal items"}]}

#Anti-Creative Stuff
execute @s[m=c,tag=!staffstatus] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC ► §d"},{"selector":"@s"},{"text":" §¶§cChanging gamemode isn't allowed"}]}
gamemode s @s[m=c,tag=!staffstatus]

#AutoKick
kick @s[scores={warn=3}] §¶§cUAC ► Season Banned - 3 Warnings Recieved
kick @s[tag=illegalitemban] §¶§cUAC ► Season Banned - Illegal Items
kick @s[tag=BanCBE] §¶§cUAC ► Season Banned - CBE
#kick @s[tag=BanCreative] §¶§cUAC ►  Changing Gamemode
execute @s[tag=staff,m=c] ~~~ execute @s[tag=!staffcheck] ~~~ kick @s §¶§cUAC ►  Changing Gamemode
kick @s[tag=BanBypass] §¶§cUAC ► Season Banned - Attempting Bypass
kick @s[tag=Ban] §¶§cUAC ► Season Banned - Banned By Operator



#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
