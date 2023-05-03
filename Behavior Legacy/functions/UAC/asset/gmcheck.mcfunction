execute @s[m=s] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §b► §d"},{"selector":"@s"},{"text":"§b is in §2survival §bmode"}]}
execute @s[m=c] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §b► §d"},{"selector":"@s"},{"text":"§b is in §2creative §bmode"}]}
execute @s[m=a] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §b► §d"},{"selector":"@s"},{"text":"§b is in §2adventure §bmode"}]}


#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
