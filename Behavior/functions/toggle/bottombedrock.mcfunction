execute @s[tag=staffstatus] ~~~ scoreboard players add bbmtoggledummy BBM 1
execute @s[tag=staffstatus] ~~~ scoreboard players operation @a BBM = bbmtoggledummy BBM

#turn on
execute @s[tag=staffstatus,scores={BBM=1}] ~~~ scoreboard players set bbmtoggledummy bbmtoggle 1
execute @s[tag=staffstatus,scores={BBM=1}] ~~~ scoreboard players operation @a bbmtoggle = bbmtoggledummy bbmtoggle
execute @s[tag=staffstatus,scores={BBM=1}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §¶§b► §6Bottom Bedrock §bhas been toggled §2ON §bby §d"},{"selector":"@s"}]}
tellraw @a[tag=staffstatus,scores={has_xx=0,BBM=1}] {"rawtext":[{"text":"§¶§cUAC ► §6Experimental Features §7: §cNot Enabled §7|| §cBedrock Layers may spawn in all demensions without proper detections working."}]}
execute @s[tag=staffstatus,scores={BBM=1}] ~~~ dialogue open @s @s uac_fine_tune_bbm
#turn off
execute @s[tag=staffstatus,scores={BBM=2}] ~~~ scoreboard players set bbmtoggledummy bbmtoggle 0
execute @s[tag=staffstatus,scores={BBM=2}] ~~~ scoreboard players operation @a bbmtoggle = bbmtoggledummy bbmtoggle
execute @s[tag=staffstatus,scores={BBM=2}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §¶§b► §6Bottom Bedrock §bhas been toggled §cOFF §bby §d"},{"selector":"@s"}]}
execute @s[tag=staffstatus,scores={BBM=2}] ~~~ scoreboard players set bbmtoggledummy BBM 0
#Deny Nonstaff
execute @s[tag=!staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► Access §cDENIED§7! §bOnly staff can use this command"}]}
execute @s[tag=!staffstatus] ~~~ execute @s ~~~ playsound note.bass @s ~ ~ ~
execute @s[tag=staffstatus] ~~~ execute @s ~~~ playsound note.pling @s ~ ~ ~

scoreboard players set @s lstcmd 27
