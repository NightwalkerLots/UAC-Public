execute @s[tag=staffstatus] ~~~ scoreboard players set wbmtoggledummy wbmtoggle 1
execute @s[tag=staffstatus] ~~~ scoreboard players operation @a wbmtoggle = wbmtoggledummy wbmtoggle
execute @s[tag=staffstatus] ~~~ scoreboard players set @a WBM 1

#Deny Nonstaff
execute @s[tag=!staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► Access §cDENIED§7! §bOnly staff can use this command"}]}
execute @s[tag=!staffstatus] ~~~ execute @s ~~~ playsound note.bass @s ~ ~ ~
execute @s[tag=staffstatus] ~~~ execute @s ~~~ playsound note.pling @s ~ ~ ~
execute @s[tag=staffstatus] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC §¶§b► §6World Border §bhas been toggled §2ON §bby §d"},{"selector":"@s"}]}
execute @s[tag=staffstatus] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC §¶§b► §6World Border §bcan be changed from 100k - 10k range. Default is 70k. Use the help command to see how to change the border size."}]}
