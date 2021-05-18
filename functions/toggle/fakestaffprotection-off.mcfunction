execute @s[tag=staffstatus] ~~~ scoreboard players set ssmtoggledummy ssmtoggle 0
execute @s[tag=staffstatus] ~~~ scoreboard players operation @a ssmtoggle = ssmtoggledummy ssmtoggle
execute @s[tag=staffstatus] ~~~ scoreboard players set @a SSM 0

#Deny Nonstaff
execute @s[tag=!staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► Access §cDENIED§7! §bOnly staff can use this command"}]}
execute @s[tag=!staffstatus] ~~~ playsound note.bass @s ~ ~ ~
execute @s[tag=staffstatus] ~~~ playsound note.pling @s ~ ~ ~
execute @s[tag=staffstatus] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC §¶§b► §6Fake Staff Protection §bhas been toggled §cOFF §bby §d"},{"selector":"@s"}]}
