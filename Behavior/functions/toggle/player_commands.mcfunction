execute @s[tag=staffstatus] ~~~ scoreboard players add icmtoggledummy ICM 1
execute @s[tag=staffstatus] ~~~ scoreboard players operation @a ICM = icmtoggledummy ICM

#turn on
execute @s[tag=staffstatus,scores={ICM=1}] ~~~ scoreboard players set icmtoggledummy icmtoggle 1
execute @s[tag=staffstatus,scores={ICM=1}] ~~~ scoreboard players operation @a icmtoggle = icmtoggledummy icmtoggle
execute @s[tag=staffstatus,scores={ICM=1}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC §¶§b► §6Player Commands §bhas been toggled §2ON §bby §d"},{"selector":"@s"}]}
#turn off
execute @s[tag=staffstatus,scores={ICM=2}] ~~~ scoreboard players set icmtoggledummy icmtoggle 0
execute @s[tag=staffstatus,scores={ICM=2}] ~~~ scoreboard players operation @a icmtoggle = icmtoggledummy icmtoggle
execute @s[tag=staffstatus,scores={ICM=2}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC §¶§b► §6Player Commands §bhas been toggled §cOFF §bby §d"},{"selector":"@s"}]}
execute @s[tag=staffstatus,scores={ICM=2}] ~~~ scoreboard players set icmtoggledummy ICM 0
#Deny Nonstaff
execute @s[tag=!staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► Access §cDENIED§7! §bOnly staff can use this command"}]}
execute @s[tag=!staffstatus] ~~~ execute @s ~~~ playsound note.bass @s ~ ~ ~
execute @s[tag=staffstatus] ~~~ execute @s ~~~ playsound note.pling @s ~ ~ ~

scoreboard players set @s lstcmd 27