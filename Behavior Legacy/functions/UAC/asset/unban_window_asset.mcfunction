hide
#Deny if not staff
execute @s[tag=!staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► Access §cDENIED§7! §bOnly staff can use this command"}]}
execute @s[tag=!staffstatus] ~~~ playsound note.bass @s ~ ~ ~
execute @s[tag=staffstatus] ~~~ playsound note.pling @s ~ ~ ~

#add switch loop trigger
execute @s[tag=staffstatus] ~~~ scoreboard players add @s unban 1

#Start unban window
execute @s[tag=staffstatus,scores={unban=1}] ~~~ scoreboard players set @s unbantimer 940
execute @s[tag=staffstatus,scores={unban=1}] ~~~ scoreboard players set @s hometp 5
execute @s[tag=staffstatus,scores={unban=1}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §¶§b► §d"},{"selector":"@s"},{"text":" §bhas §2OPENED a §6Unban Window"}]}
execute @s[tag=staffstatus,scores={unban=1}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§d"},{"selector":"@s"},{"text":" §¶§bneeds to close the window before they leave the realm.\nThey may execute the unban window command again to close it early."}]}

#Close unban window
execute @s[tag=staffstatus,scores={unban=2}] ~~~ scoreboard players reset @s unbantimer
execute @s[tag=staffstatus,scores={unban=2}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §¶§b► §d"},{"selector":"@s"},{"text":" §bhas §cCLOSED a §6Unban Window"}]}
execute @s[tag=staffstatus,scores={unban=2}] ~~~ scoreboard players set @s hometp 3
execute @s[tag=staffstatus,scores={unban=2}] ~~~ scoreboard players set mrunban unban 0
execute @s[tag=staffstatus,scores={unban=2}] ~~~ scoreboard players set @s unban 0
