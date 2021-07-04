execute @s[tag=staffstatus] ~~~ scoreboard players set acmtoggledummy acmtoggle 0
execute @s[tag=staffstatus] ~~~ scoreboard players operation @a acmtoggle = acmtoggledummy acmtoggle
execute @s[tag=staffstatus] ~~~ scoreboard players set @a ACM 0

#Deny Nonstaff
execute @s[tag=!staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► Access §cDENIED§7! §bOnly staff can use this command"}]}
execute @s[tag=!staffstatus] ~~~ execute @s ~~~ playsound note.bass @s ~ ~ ~
execute @s[tag=staffstatus] ~~~ execute @s ~~~ playsound note.pling @s ~ ~ ~
execute @s[tag=staffstatus] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC §¶§b► §6Anti-CBE §bhas been toggled §cOFF §bby §d"},{"selector":"@s"}]}

scoreboard players set @s lstcmd 37
