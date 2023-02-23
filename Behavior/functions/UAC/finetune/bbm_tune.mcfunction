#turn on
execute @s[tag=staffstatus] ~~~ scoreboard players add ftDummy BBMCC 1
execute @s[tag=staffstatus] ~~~ scoreboard players operation @a BBMCC = ftDummy BBMCC
execute @s[tag=staffstatus,scores={BBMCC=1}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §¶§b► §6Bottom Bedrock §bhas been toggled §2Caves and Cliffs §bby §d"},{"selector":"@s"}]}
#turn off
execute @s[tag=staffstatus,scores={BBMCC=2}] ~~~ scoreboard players operation @a BBMCC = ftDummy BBMCC
execute @s[tag=staffstatus,scores={BBMCC=2}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §¶§b► §6Bottom Bedrock §bhas been toggled §cy=0 §bby §d"},{"selector":"@s"}]}
execute @s[tag=staffstatus,scores={BBMCC=2}] ~~~ scoreboard players set ftDummy BBMCC 0

#Deny Nonstaff
execute @s[tag=!staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► Access §cDENIED§7! §bOnly staff can use this command"}]}
execute @s[tag=!staffstatus] ~~~ execute @s ~~~ playsound note.bass @s ~ ~ ~
execute @s[tag=staffstatus] ~~~ execute @s ~~~ playsound note.pling @s ~ ~ ~

#needs a dummy objective for add-switch to work. But I'm too fucked up and lazy for that right now.


scoreboard players operation @a BBMCC = ftDummy BBMCC
#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
