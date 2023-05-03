#Prints the current player's time played score
tellraw @a[tag=staffstatus,scores={tpmtoggle=0}] {"rawtext":[{"text":"§¶§cUAC §b► §d"},{"text":"§7{§bTimePlayed Tracker §cDISABLED§7}"}]}
execute @s[scores={timealive=0..59999}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §b► §d"},{"selector":"@s"},{"text":"§b has died over a hour ago"}]}
execute @s[scores={timealive=60000..120000}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §b► §d"},{"selector":"@s"},{"text":"§b has died over a hour ago"}]}
execute @s[scores={timealive=144000..216000}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §b► §d"},{"selector":"@s"},{"text":"§b has died 2+ hours ago"}]}
execute @s[scores={timealive=216000..288000}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §b► §d"},{"selector":"@s"},{"text":"§b has died 3+ hours ago"}]}
execute @s[scores={timealive=288000..360000}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §b► §d"},{"selector":"@s"},{"text":"§b has died 4+ hours ago"}]}
execute @s[scores={timealive=360000..432000}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §b► §d"},{"selector":"@s"},{"text":"§b has died 5+ hours ago"}]}
execute @s[scores={timealive=432000..504000}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §b► §d"},{"selector":"@s"},{"text":"§b has died 6+ hours ago"}]}
execute @s[scores={timealive=504000..576000}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §b► §d"},{"selector":"@s"},{"text":"§b has died 7+ hours ago"}]}
execute @s[scores={timealive=576000..648000}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §b► §d"},{"selector":"@s"},{"text":"§b has died 8+ hours ago"}]}
execute @s[scores={timealive=648000..720000}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §b► §d"},{"selector":"@s"},{"text":"§b has died 9+ hours ago"}]}
execute @s[scores={timealive=720000..792000}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §b► §d"},{"selector":"@s"},{"text":"§b has died 10+ hours ago"}]}
execute @s[scores={timealive=792000..864000}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §b► §d"},{"selector":"@s"},{"text":"§b has died 11+ hours ago"}]}
execute @s[scores={timealive=864000..936000}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §b► §d"},{"selector":"@s"},{"text":"§b has died 12+ hours ago"}]}
execute @s[scores={timealive=936000..1008000}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §b► §d"},{"selector":"@s"},{"text":"§b has died 13+ hours ago"}]}
execute @s[scores={timealive=1008000..1080000}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §b► §d"},{"selector":"@s"},{"text":"§b has died 14+ hours ago"}]}
execute @s[scores={timealive=1080000..1152000}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §b► §d"},{"selector":"@s"},{"text":"§b has died 15+ hours ago"}]}
execute @s[scores={timealive=1152000..1224000}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §b► §d"},{"selector":"@s"},{"text":"§b has died 16+ hours ago"}]}
execute @s[scores={timealive=1224000..1296000}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §b► §d"},{"selector":"@s"},{"text":"§b has died 17+ hours ago"}]}
execute @s[scores={timealive=1296000..1368000}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §b► §d"},{"selector":"@s"},{"text":"§b has died 18+ hours ago"}]}
execute @s[scores={timealive=1368000..1440000}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §b► §d"},{"selector":"@s"},{"text":"§b has died 19+ hours ago"}]}
execute @s[scores={timealive=1440000..1512000}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §b► §d"},{"selector":"@s"},{"text":"§b has died 20+ hours ago"}]}
execute @s[scores={timealive=1512000..1584000}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §b► §d"},{"selector":"@s"},{"text":"§b has died 21+ hours ago"}]}
execute @s[scores={timealive=1584000..1656000}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §b► §d"},{"selector":"@s"},{"text":"§b has died 22+ hours ago"}]}
execute @s[scores={timealive=1656000..1728000}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §b► §d"},{"selector":"@s"},{"text":"§b has died 23+ hours ago"}]}
execute @s[scores={timealive=1728000..1800000}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §b► §d"},{"selector":"@s"},{"text":"§b has died 24+ hours ago"}]}
execute @s[scores={timealive=3456000..5184000}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §b► §d"},{"selector":"@s"},{"text":"§b has died 2+ days ago"}]}
execute @s[scores={timealive=5184000..6912000}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §b► §d"},{"selector":"@s"},{"text":"§b has died 3+ days ago"}]}
execute @s[scores={timealive=6912000..8640000}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §b► §d"},{"selector":"@s"},{"text":"§b has died 4+ days ago"}]}
execute @s[scores={timealive=8640000..10368000}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §b► §d"},{"selector":"@s"},{"text":"§b has died 5+ days ago"}]}
execute @s[scores={timealive=10368000..12096000}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §b► §d"},{"selector":"@s"},{"text":"§b has died 6+ days ago"}]}



#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
