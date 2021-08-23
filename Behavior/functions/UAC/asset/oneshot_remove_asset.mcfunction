execute @s[tag=can_oneshot,scores={osmtoggle=1}] ~~~ tag @s remove can_oneshot
execute @s[tag=!can_oneshot,scores={osmtoggle=1}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► §6Anti Onshot §bHealth 70% §d"},{"selector":"@s"},{"text":"§b! §¶§bprotection from oneshot blows by players §cDISABLED"}]}

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
