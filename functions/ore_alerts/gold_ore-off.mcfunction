execute @s[scores={mdmtoggle=1}] ~~~ execute @s[tag=staffstatus] ~~~ scoreboard players set mdmtoggledummy goldmd 0
execute @s[scores={mdmtoggle=1}] ~~~ execute @s[tag=staffstatus] ~~~ scoreboard players operation @a goldmd = mdmtoggledummy goldmd

#Check of Mining Detection module
execute @s[scores={mdmtoggle=0}] ~~~ execute @s[tag=!staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► Access §cDENIED§7! §bOnly staff can use this command"}]}
execute @s[scores={mdmtoggle=0}] ~~~ execute @s[tag=!staffstatus] ~~~ execute @s ~~~ playsound note.bass @s ~ ~ ~
execute @s[scores={mdmtoggle=0}] ~~~ execute @s[tag=staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► Access §cDENIED§7! §6Mining Detection §bneeds to be enabled to toggle this"}]}
execute @s[scores={mdmtoggle=0}] ~~~ execute @s[tag=staffstatus] ~~~ execute @s ~~~ playsound note.bass @s ~ ~ ~

#Deny Nonstaff
execute @s[scores={mdmtoggle=1}] ~~~ execute @s[tag=!staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► Access §cDENIED§7! §bOnly staff can use this command"}]}
execute @s[scores={mdmtoggle=1}] ~~~ execute @s[tag=!staffstatus] ~~~ execute @s ~~~ playsound note.bass @s ~ ~ ~
execute @s[scores={mdmtoggle=1}] ~~~ execute @s[tag=staffstatus] ~~~ execute @s ~~~ playsound note.pling @s ~ ~ ~
execute @s[scores={mdmtoggle=1}] ~~~ execute @s[tag=staffstatus] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC §¶§b► §6Gold Alerts §bhas been toggled §cOFF §bby §d"},{"selector":"@s"}]}

scoreboard players set @s lstcmd 97
