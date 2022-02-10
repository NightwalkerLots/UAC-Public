execute @s[tag=staffstatus] ~~~ scoreboard players add afkdummy afkm 1
scoreboard players operation @a afkm = afkdummy afkm

#turn on
execute @s[tag=staffstatus,scores={afkm=1}] ~~~ scoreboard players operation @a afkm = afkdummy afkm
execute @s[tag=staffstatus,scores={afkm=1}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC §¶§b► §6Afk Kick §bhas been toggled §2ON §bby §d"},{"selector":"@s"}]}
#turn off
execute @s[tag=staffstatus,scores={afkm=2}] ~~~ scoreboard players operation @a afkm = afkdummy afkm
execute @s[tag=staffstatus,scores={afkm=2}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC §¶§b► §6Afk Kick §bhas been toggled §cOFF §bby §d"},{"selector":"@s"}]}
execute @s[tag=staffstatus,scores={afkm=2}] ~~~ scoreboard players set afkdummy afkm 0
execute @s[tag=staffstatus,scores={afkm=2}] ~~~ scoreboard players operation @a afkm = afkdummy afkm

#Deny Nonstaff
execute @s[tag=!staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► Access §cDENIED§7! §bOnly staff can use this command"}]}
execute @s[tag=!staffstatus] ~~~ execute @s ~~~ playsound note.bass @s ~ ~ ~
execute @s[tag=staffstatus] ~~~ execute @s ~~~ playsound note.pling @s ~ ~ ~

