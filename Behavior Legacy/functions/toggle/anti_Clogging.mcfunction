execute @s[tag=staffstatus] ~~~ scoreboard players add clmdummy clmtoggle 1
scoreboard players operation @a clmtoggle = clmdummy clmtoggle

#turn on kill mode
execute @s[tag=staffstatus,scores={clmtoggle=1}] ~~~ scoreboard players operation @a clmtoggle = clmdummy clmtoggle
execute @s[tag=staffstatus,scores={clmtoggle=1}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §¶§b► §6Anti-C Logging §bhas been toggled to §2KILL MODE §bby §d"},{"selector":"@s"}]}
tellraw @a[tag=staffstatus,scores={has_xx=0,clmtoggle=1}] {"rawtext":[{"text":"§¶§cUAC ► §6Experimental Features §7: §cNot Enabled §7|| §cThis module may not work!"}]}

#turn on clear mode
execute @s[tag=staffstatus,scores={clmtoggle=2}] ~~~ scoreboard players operation @a clmtoggle = clmdummy clmtoggle
execute @s[tag=staffstatus,scores={clmtoggle=2}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §¶§b► §6Anti-C Logging §bhas been toggled to §2CLEAR MODE §bby §d"},{"selector":"@s"}]}
tellraw @a[tag=staffstatus,scores={has_xx=0,clmtoggle=2}] {"rawtext":[{"text":"§¶§cUAC ► §6Experimental Features §7: §cNot Enabled §7|| §cThis module may not work!"}]}
#turn off
execute @s[tag=staffstatus,scores={clmtoggle=3}] ~~~ scoreboard players operation @a clmtoggle = clmdummy clmtoggle
execute @s[tag=staffstatus,scores={clmtoggle=3}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §¶§b► §6Anti-C Logging §bhas been toggled §cOFF §bby §d"},{"selector":"@s"}]}
execute @s[tag=staffstatus,scores={clmtoggle=3}] ~~~ scoreboard players set clmdummy clmtoggle 0
execute @s[tag=staffstatus,scores={clmtoggle=3}] ~~~ scoreboard players operation @a clmtoggle = clmdummy clmtoggle

#Deny Nonstaff
execute @s[tag=!staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► Access §cDENIED§7! §bOnly staff can use this command"}]}
execute @s[tag=!staffstatus] ~~~ execute @s ~~~ playsound note.bass @s ~ ~ ~
execute @s[tag=staffstatus] ~~~ execute @s ~~~ playsound note.pling @s ~ ~ ~

