#turn on
execute @s[tag=staffstatus,scores={CBEEM=0}] ~~~ scoreboard players set ftDummy CBEEM 1
execute @s[tag=staffstatus,scores={CBEEM=0}] ~~~ scoreboard players operation @a CBEEM = ftDummy CBEEM
execute @s[tag=staffstatus,scores={CBEEM=0}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC §¶§b► §6Anti-CBE Tile Clear §bhas been toggled §2ON §bby §d"},{"selector":"@s"}]}
#turn off
execute @s[tag=staffstatus,scores={CBEEM=1}] ~~~ scoreboard players set ftDummy CBEEM 0
execute @s[tag=staffstatus,scores={CBEEM=1}] ~~~ scoreboard players operation @a CBEEM = ftDummy CBEEM
execute @s[tag=staffstatus,scores={CBEEM=1}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC §¶§b► §6Anti-CBE Tile Clear §bhas been toggled §cOFF §bby §d"},{"selector":"@s"}]}
#Deny Nonstaff
execute @s[tag=!staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► Access §cDENIED§7! §bOnly staff can use this command"}]}
execute @s[tag=!staffstatus] ~~~ execute @s ~~~ playsound note.bass @s ~ ~ ~
execute @s[tag=staffstatus] ~~~ execute @s ~~~ playsound note.pling @s ~ ~ ~

#needs a dummy objective for add-switch to work. But I'm too fucked up and lazy for that right now.


scoreboard players operation @a CBEEM = ftDummy CBEEM
#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
