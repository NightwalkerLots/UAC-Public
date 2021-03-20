#bridge-file-version: #106
hide

#Unban
tag @a[tag=unban] remove BanCreative
tag @a[tag=unban] remove BanCBE
tag @a[tag=unban] remove BanBypass
tag @a[tag=unban] remove Ban
tag @a[tag=unban] remove illegalitemban
tag @a[tag=unban] remove BanFly
tag @a[tag=unban] remove BanPhase
scoreboard players reset @s[tag=unban] warn
scoreboard players reset @s[tag=unban] warnillegal
gamemode s @s[tag=unban,name=!nightwalkerlots]

tag @a[tag=staffstatus] remove BanCreative
tag @a[tag=staffstatus] remove BanCBE
tag @a[tag=staffstatus] remove BanBypass
tag @a[tag=staffstatus] remove Ban
tag @a[tag=bypass] add BanBypass



#Autoban Creative/CBE
tag @a[tag=!staffstatus,m=c] add BanCreative

#Kick Messages
execute @a[tag=BanCBE] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC ► §d"},{"selector":"@s"},{"text":" §¶§cwas season banned for CBE exploits"}]}
execute @a[tag=BanBypass] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC ► §d"},{"selector":"@s"},{"text":" §¶§cwas season banned for bypass attempt"}]}
execute @a[tag=Ban] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC ► §d"},{"selector":"@s"},{"text":" §¶§cwas season banned by a operator"}]}
execute @a[scores={warn=3}] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC ► §d"},{"selector":"@s"},{"text":" §¶§cwas season banned for reaching 3 warnings"}]}
execute @a[tag=illegalitemban] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC ► §d"},{"selector":"@s"},{"text":" §¶§cwas season banned for illegal items"}]}

#Anti-Creative Stuff
execute @a[m=c,tag=!staffstatus] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC ► §d"},{"selector":"@s"},{"text":" §¶§cChanging gamemode isn't allowed"}]}
gamemode s @a[m=c,tag=!staffstatus]
kill @a[tag=BanCreative]
tag @a remove BanCreative

#AutoKick
kick @a[scores={warn=3}] §¶§cUAC ► Season Banned - 3 Warnings Recieved
kick @a[tag=illegalitemban] §¶§cUAC ► Season Banned - Illegal Items
kick @a[tag=BanCBE] §¶§cUAC ► Season Banned - CBE
#kick @s[tag=BanCreative] §¶§cUAC ►  Changing Gamemode
execute @a[tag=staff,m=c] ~~~ execute @s[tag=!staffcheck] ~~~ kick @s §¶§cUAC ►  Changing Gamemode
kick @a[tag=BanBypass] §¶§cUAC ► Season Banned - Attempting Bypass
kick @a[tag=Ban] §¶§cUAC ► Season Banned - Banned By Operator



#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
