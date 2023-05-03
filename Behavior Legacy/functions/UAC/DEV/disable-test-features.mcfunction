execute @s[tag=staffstatus] ~~~ scoreboard players set testindummy testin 0
execute @s[tag=staffstatus] ~~~ scoreboard players operation @s testin = testindummy testin
execute @s[tag=staffstatus] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §¶§b► The §2Developer Testing Features §bhave been §cDISABLED §bby §d"},{"selector":"@s"}]}
#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide