execute @s[tag=staffstatus] ~~~ execute @s[scores={ibmtoggle=1}] ~~~ scoreboard players set BNTNdummy BNTN 0
execute @s[tag=staffstatus] ~~~ execute @s[scores={ibmtoggle=1}] ~~~ scoreboard players operation @a BNTN = BNTNdummy BNTN
execute @s[tag=staffstatus] ~~~ execute @s[scores={ibmtoggle=1}] ~~~ scoreboard players set @a BNTN 0

#Deny Nonstaff
execute @s[tag=!staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► Access §cDENIED§7! §bOnly staff can use this command"}]}
execute @s[tag=!staffstatus] ~~~ execute @s ~~~ playsound note.bass @s ~ ~ ~
execute @s[tag=staffstatus] ~~~ execute @s[scores={ibmtoggle=1}] ~~~ execute @s ~~~ playsound note.pling @s ~ ~ ~
execute @s[tag=staffstatus] ~~~ execute @s[scores={ibmtoggle=1}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §¶§b► §6TNT §bhave been §2ALLOWED §bby §d"},{"selector":"@s"}]}

#add arg for itemban module
execute @s[tag=staffstatus] ~~~ execute @s[scores={ibmtoggle=0}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► Access §cDENIED§7! §6Ban Item Module §bmust be enabled to use this command"}]}
execute @s[tag=staffstatus] ~~~ execute @s[scores={ibmtoggle=0}] ~~~ playsound note.bass @s ~ ~ ~

scoreboard players set @s lstcmd 89
