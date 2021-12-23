execute @s[tag=staffstatus] ~~~ scoreboard players add nfmtoggledummy NFM 1
execute @s[tag=staffstatus] ~~~ scoreboard players operation @a NFM = nfmtoggledummy NFM

#turn on
execute @s[tag=staffstatus,scores={NFM=1}] ~~~ scoreboard players set nfmtoggledummy nfmtoggle 1
execute @s[tag=staffstatus,scores={NFM=1}] ~~~ scoreboard players operation @a nfmtoggle = nfmtoggledummy nfmtoggle
execute @s[tag=staffstatus,scores={NFM=1}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC §¶§b► §6Anti-Frostwalker §bhas been toggled §2ON §bby §d"},{"selector":"@s"}]}
tellraw @a[tag=staffstatus,scores={has_xx=0,NFM=1}] {"rawtext":[{"text":"§¶§cUAC ► §6Experimental Features §7: §cNot Enabled §7|| §cThis module may not work!"}]}
#turn off
execute @s[tag=staffstatus,scores={NFM=2}] ~~~ scoreboard players set nfmtoggledummy nfmtoggle 0
execute @s[tag=staffstatus,scores={NFM=2}] ~~~ scoreboard players operation @a nfmtoggle = nfmtoggledummy nfmtoggle
execute @s[tag=staffstatus,scores={NFM=2}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC §¶§b► §6Anti-Frostwalker §bhas been toggled §cOFF §bby §d"},{"selector":"@s"}]}
execute @s[tag=staffstatus,scores={NFM=2}] ~~~ scoreboard players set nfmtoggledummy NFM 0
#Deny Nonstaff
execute @s[tag=!staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► Access §cDENIED§7! §bOnly staff can use this command"}]}
execute @s[tag=!staffstatus] ~~~ execute @s ~~~ playsound note.bass @s ~ ~ ~
execute @s[tag=staffstatus] ~~~ execute @s ~~~ playsound note.pling @s ~ ~ ~

scoreboard players set @s lstcmd 65
