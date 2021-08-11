execute @s[tag=staffstatus] ~~~ scoreboard players add rsmtoggledummy RSM 1
execute @s[tag=staffstatus] ~~~ scoreboard players operation @a RSM = rsmtoggledummy RSM

#turn on
execute @s[tag=staffstatus,scores={RSM=1}] ~~~ scoreboard players set rsmtoggledummy rsmtoggle 1
execute @s[tag=staffstatus,scores={RSM=1}] ~~~ scoreboard players operation @a rsmtoggle = rsmtoggledummy rsmtoggle
execute @s[tag=staffstatus,scores={RSM=1}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC §¶§b► §6Random Spawn §bhas been toggled §2ON §bby §d"},{"selector":"@s"}]}
#turn off
execute @s[tag=staffstatus,scores={RSM=2}] ~~~ scoreboard players set rsmtoggledummy rsmtoggle 0
execute @s[tag=staffstatus,scores={RSM=2}] ~~~ scoreboard players operation @a rsmtoggle = rsmtoggledummy rsmtoggle
execute @s[tag=staffstatus,scores={RSM=2}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC §¶§b► §6Random Spawn §bhas been toggled §cOFF §bby §d"},{"selector":"@s"}]}
execute @s[tag=staffstatus,scores={RSM=2}] ~~~ scoreboard players set rsmtoggledummy RSM 0
#Deny Nonstaff
execute @s[tag=!staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► Access §cDENIED§7! §bOnly staff can use this command"}]}
execute @s[tag=!staffstatus] ~~~ execute @s ~~~ playsound note.bass @s ~ ~ ~
execute @s[tag=staffstatus] ~~~ execute @s ~~~ playsound note.pling @s ~ ~ ~

scoreboard players set @s lstcmd 69
