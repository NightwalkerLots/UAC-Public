execute @s[tag=staffstatus] ~~~ scoreboard players add ltmtoggledummy LTM 1
execute @s[tag=staffstatus] ~~~ scoreboard players operation @a LTM = ltmtoggledummy LTM

#turn on
execute @s[tag=staffstatus,scores={LTM=1}] ~~~ scoreboard players set ltmtoggledummy ltmtoggle 1
execute @s[tag=staffstatus,scores={LTM=1}] ~~~ scoreboard players operation @a ltmtoggle = ltmtoggledummy ltmtoggle
execute @s[tag=staffstatus,scores={LTM=1}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §¶§b► §6Auto Lag Clear §bhas been toggled §2ON §bby §d"},{"selector":"@s"}]}
#turn off
execute @s[tag=staffstatus,scores={LTM=2}] ~~~ scoreboard players set ltmtoggledummy ltmtoggle 0
execute @s[tag=staffstatus,scores={LTM=2}] ~~~ scoreboard players operation @a ltmtoggle = ltmtoggledummy ltmtoggle
execute @s[tag=staffstatus,scores={LTM=2}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §¶§b► §6Auto Lag Clear §bhas been toggled §cOFF §bby §d"},{"selector":"@s"}]}
execute @s[tag=staffstatus,scores={LTM=2}] ~~~ scoreboard players set ltmtoggledummy LTM 0
#Deny Nonstaff
execute @s[tag=!staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► Access §cDENIED§7! §bOnly staff can use this command"}]}
execute @s[tag=!staffstatus] ~~~ execute @s ~~~ playsound note.bass @s ~ ~ ~
execute @s[tag=staffstatus] ~~~ execute @s ~~~ playsound note.pling @s ~ ~ ~

scoreboard players set @s lstcmd 61
