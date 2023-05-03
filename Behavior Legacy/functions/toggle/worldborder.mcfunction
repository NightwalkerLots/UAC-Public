execute @s[tag=staffstatus] ~~~ scoreboard players add wbmtoggledummy WBM 1
execute @s[tag=staffstatus] ~~~ scoreboard players operation @a WBM = wbmtoggledummy WBM

#turn on
execute @s[tag=staffstatus,scores={WBM=1}] ~~~ scoreboard players set wbmtoggledummy wbmtoggle 1
execute @s[tag=staffstatus,scores={WBM=1}] ~~~ scoreboard players operation @a wbmtoggle = wbmtoggledummy wbmtoggle
execute @s[tag=staffstatus,scores={WBM=1}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §¶§b► §6World Border §bhas been toggled §2ON §bby §d"},{"selector":"@s"}]}
tellraw @a[tag=staffstatus,scores={has_xx=0,WBM=1}] {"rawtext":[{"text":"§¶§cUAC ► §6Experimental Features §7: §cNot Enabled §7|| §cThis module may not work!"}]}
#turn off
execute @s[tag=staffstatus,scores={WBM=2}] ~~~ scoreboard players set wbmtoggledummy wbmtoggle 0
execute @s[tag=staffstatus,scores={WBM=2}] ~~~ scoreboard players operation @a wbmtoggle = wbmtoggledummy wbmtoggle
execute @s[tag=staffstatus,scores={WBM=2}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §¶§b► §6World Border §bhas been toggled §cOFF §bby §d"},{"selector":"@s"}]}
execute @s[tag=staffstatus,scores={WBM=2}] ~~~ scoreboard players set wbmtoggledummy WBM 0
#Deny Nonstaff
execute @s[tag=!staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► Access §cDENIED§7! §bOnly staff can use this command"}]}
execute @s[tag=!staffstatus] ~~~ execute @s ~~~ playsound note.bass @s ~ ~ ~
execute @s[tag=staffstatus] ~~~ execute @s ~~~ playsound note.pling @s ~ ~ ~

scoreboard players set @s lstcmd 77
