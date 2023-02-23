execute @s[tag=staffstatus] ~~~ scoreboard players add mdmtoggledummy MDM 1
execute @s[tag=staffstatus] ~~~ scoreboard players operation @a MDM = mdmtoggledummy MDM

#turn on
execute @s[tag=staffstatus,scores={MDM=1}] ~~~ scoreboard players set mdmtoggledummy mdmtoggle 1
execute @s[tag=staffstatus,scores={MDM=1}] ~~~ scoreboard players set mdmtoggledummy diamondmd 0
execute @s[tag=staffstatus,scores={MDM=1}] ~~~ scoreboard players set mdmtoggledummy goldmd 0
execute @s[tag=staffstatus,scores={MDM=1}] ~~~ scoreboard players set mdmtoggledummy lapizmd 0
execute @s[tag=staffstatus,scores={MDM=1}] ~~~ scoreboard players set mdmtoggledummy scrapmd 0
execute @s[tag=staffstatus,scores={MDM=1}] ~~~ scoreboard players set mdmtoggledummy emeraldmd 0
execute @s[tag=staffstatus,scores={MDM=1}] ~~~ scoreboard players set mdmtoggledummy ironmd 0
execute @s[tag=staffstatus,scores={MDM=1}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §¶§b► §6Mining Detection §bhas been toggled §2ON §bby §d"},{"selector":"@s"}]}
#turn off
execute @s[tag=staffstatus,scores={MDM=2}] ~~~ scoreboard players set mdmtoggledummy mdmtoggle 0
execute @s[tag=staffstatus,scores={MDM=2}] ~~~ scoreboard players operation @a mdmtoggle = mdmtoggledummy mdmtoggle
execute @s[tag=staffstatus,scores={MDM=2}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §¶§b► §6Mining Detection §bhas been toggled §cOFF §bby §d"},{"selector":"@s"}]}
execute @s[tag=staffstatus,scores={MDM=2}] ~~~ scoreboard players set mdmtoggledummy MDM 0
#Deny Nonstaff
execute @s[tag=!staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► Access §cDENIED§7! §bOnly staff can use this command"}]}
execute @s[tag=!staffstatus] ~~~ execute @s ~~~ playsound note.bass @s ~ ~ ~
execute @s[tag=staffstatus] ~~~ execute @s ~~~ playsound note.pling @s ~ ~ ~

scoreboard players set @s lstcmd 91
