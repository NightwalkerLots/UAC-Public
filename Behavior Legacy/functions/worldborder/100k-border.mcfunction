execute @s[tag=staffstatus,scores={wbmtoggle=1}] ~~~ scoreboard players set BDXdummy Border_Coord_X 100000
execute @s[tag=staffstatus,scores={wbmtoggle=1}] ~~~ scoreboard players set BDXdummy Border_Coord_Z 100000
execute @s[tag=staffstatus,scores={wbmtoggle=1}] ~~~ scoreboard players operation @a Border_Coord_Z = BDXdummy Border_Coord_Z
execute @s[tag=staffstatus,scores={wbmtoggle=1}] ~~~ scoreboard players operation @a Border_Coord_X = BDXdummy Border_Coord_X

#Deny Nonstaff
execute @s[tag=!staffstatus] ~~~ tellraw @s[scores={wbmtoggle=1}] {"rawtext":[{"text":"§¶§cUAC §¶§b► Access §cDENIED§7! §bOnly staff can use this command"}]}
execute @s[tag=!staffstatus] ~~~ execute @s ~~~ playsound note.bass @s ~ ~ ~
execute @s[tag=staffstatus] ~~~ execute @s ~~~ playsound note.pling @s ~ ~ ~
execute @s[tag=staffstatus] ~~~ tellraw @a[tag=staffstatus,scores={wbmtoggle=1}] {"rawtext":[{"text":"§¶§cUAC §¶§b► §6World Border §bhas been set to §2100k §bby §d"},{"selector":"@s"}]}

#check for toggle
execute @s[tag=staffstatus] ~~~ tellraw @s[scores={wbmtoggle=0}] {"rawtext":[{"text":"§¶§cUAC §¶§b► Access §cDENIED§7! §bWorld Border Module must be enabled before the size can be changed"}]}
execute @s[tag=staffstatus,scores={wbmtoggle=0}] ~~~ playsound note.bass @s ~ ~ ~

scoreboard players set @s lstcmd 36
