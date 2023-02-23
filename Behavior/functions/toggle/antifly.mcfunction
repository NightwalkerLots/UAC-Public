execute @s[tag=staffstatus] ~~~ scoreboard players add afmtoggledummy AFM 1
execute @s[tag=staffstatus] ~~~ scoreboard players operation @a AFM = afmtoggledummy AFM

#turn on
execute @s[tag=staffstatus,scores={AFM=1}] ~~~ scoreboard players set afmtoggledummy afmtoggle 1
execute @s[tag=staffstatus,scores={AFM=1}] ~~~ scoreboard players operation @a afmtoggle = afmtoggledummy afmtoggle
execute @s[tag=staffstatus,scores={AFM=1}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §¶§b► §6Anti-Fly §bhas been toggled §2ON §bby §d"},{"selector":"@s"}]}
tellraw @a[tag=staffstatus,scores={has_xx=0,AFM=1}] {"rawtext":[{"text":"§¶§cUAC ► §6Experimental Features §7: §cNot Enabled §7|| §cThis module may false ban with elytra users!"}]}
#turn off
execute @s[tag=staffstatus,scores={AFM=2}] ~~~ scoreboard players set afmtoggledummy afmtoggle 0
execute @s[tag=staffstatus,scores={AFM=2}] ~~~ scoreboard players operation @a afmtoggle = afmtoggledummy afmtoggle
execute @s[tag=staffstatus,scores={AFM=2}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §¶§b► §6Anti-Fly §bhas been toggled §cOFF §bby §d"},{"selector":"@s"}]}
execute @s[tag=staffstatus,scores={AFM=2}] ~~~ scoreboard players set afmtoggledummy AFM 0
#Deny Nonstaff
execute @s[tag=!staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► Access §cDENIED§7! §bOnly staff can use this command"}]}
execute @s[tag=!staffstatus] ~~~ execute @s ~~~ playsound note.bass @s ~ ~ ~
execute @s[tag=staffstatus] ~~~ execute @s ~~~ playsound note.pling @s ~ ~ ~

scoreboard players set @s lstcmd 27
