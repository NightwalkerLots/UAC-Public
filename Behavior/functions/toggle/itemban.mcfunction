execute @s[tag=staffstatus] ~~~ scoreboard players add ibmtoggledummy IBM 1
execute @s[tag=staffstatus] ~~~ scoreboard players operation @a IBM = ibmtoggledummy IBM

#turn on
execute @s[tag=staffstatus,scores={IBM=1}] ~~~ scoreboard players set ibmtoggledummy ibmtoggle 1
execute @s[tag=staffstatus,scores={IBM=1}] ~~~ scoreboard players operation @a ibmtoggle = ibmtoggledummy ibmtoggle
execute @s[tag=staffstatus,scores={IBM=1}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §¶§b► §6Custom Item Ban §bhas been toggled §2ON §bby §d"},{"selector":"@s"}]}
#turn off
execute @s[tag=staffstatus,scores={IBM=2}] ~~~ scoreboard players set ibmtoggledummy ibmtoggle 0
execute @s[tag=staffstatus,scores={IBM=2}] ~~~ scoreboard players operation @a ibmtoggle = ibmtoggledummy ibmtoggle
execute @s[tag=staffstatus,scores={IBM=2}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §¶§b► §6Custom Item Ban §bhas been toggled §cOFF §bby §d"},{"selector":"@s"}]}
execute @s[tag=staffstatus,scores={IBM=2}] ~~~ scoreboard players set ibmtoggledummy IBM 0
#Deny Nonstaff
execute @s[tag=!staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► Access §cDENIED§7! §bOnly staff can use this command"}]}
execute @s[tag=!staffstatus] ~~~ execute @s ~~~ playsound note.bass @s ~ ~ ~
execute @s[tag=staffstatus] ~~~ execute @s ~~~ playsound note.pling @s ~ ~ ~
scoreboard players set @s lstcmd 57
