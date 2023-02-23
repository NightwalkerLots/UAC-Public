execute @s[tag=staffstatus,scores={has_gt=1}] ~~~ scoreboard players add afkdummy afkm 1
scoreboard players operation @a afkm = afkdummy afkm
execute @s[tag=staffstatus,scores={afkm=1,has_gt=0}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► §cLOCKED §bThis only works if gametest is enabled"}]}


#turn on
execute @s[tag=staffstatus,scores={afkm=1,has_gt=1}] ~~~ scoreboard players operation @a afkm = afkdummy afkm
execute @s[tag=staffstatus,scores={afkm=1,has_gt=1}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §¶§b► §6Afk Kick §bhas been toggled §2ON §bby §d"},{"selector":"@s"}]}
#turn off
execute @s[tag=staffstatus,scores={afkm=2,has_gt=1}] ~~~ scoreboard players operation @a afkm = afkdummy afkm
execute @s[tag=staffstatus,scores={afkm=2,has_gt=1}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §¶§b► §6Afk Kick §bhas been toggled §cOFF §bby §d"},{"selector":"@s"}]}
execute @s[tag=staffstatus,scores={afkm=2,has_gt=1}] ~~~ scoreboard players set afkdummy afkm 0
execute @s[tag=staffstatus,scores={afkm=2,has_gt=1}] ~~~ scoreboard players operation @a afkm = afkdummy afkm

#Deny Nonstaff
execute @s[tag=!staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► Access §cDENIED§7! §bOnly staff can use this command"}]}
execute @s[tag=!staffstatus] ~~~ execute @s ~~~ playsound note.bass @s ~ ~ ~
execute @s[tag=staffstatus] ~~~ execute @s ~~~ playsound note.pling @s ~ ~ ~

