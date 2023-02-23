execute @s[tag=staffstatus] ~~~ execute @s[scores={ibmtoggle=1}] ~~~ scoreboard players set BNBQdummy BNBQ 1
execute @s[tag=staffstatus] ~~~ execute @s[scores={ibmtoggle=1}] ~~~ scoreboard players operation @a BNBQ = BNBQdummy BNBQ
execute @s[tag=staffstatus] ~~~ execute @s[scores={ibmtoggle=1}] ~~~ scoreboard players set @a BNBQ 1

#Deny Nonstaff
execute @s[tag=!staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► Access §cDENIED§7! §bOnly staff can use this command"}]}
execute @s[tag=!staffstatus] ~~~ execute @s ~~~ playsound note.bass @s ~ ~ ~
execute @s[tag=staffstatus] ~~~ execute @s[scores={ibmtoggle=1}] ~~~ execute @s ~~~ playsound note.pling @s ~ ~ ~
execute @s[tag=staffstatus] ~~~ execute @s[scores={ibmtoggle=1}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §¶§b► §6Book and Quill §bhave been §cBANNED §bby §d"},{"selector":"@s"}]}

#add arg for itemban module
execute @s[tag=staffstatus] ~~~ execute @s[scores={ibmtoggle=0}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► Access §cDENIED§7! §6Ban Item Module §bmust be enabled to use this command"}]}
execute @s[tag=staffstatus] ~~~ execute @s[scores={ibmtoggle=0}] ~~~ playsound note.bass @s ~ ~ ~

scoreboard players set @s lstcmd 82
