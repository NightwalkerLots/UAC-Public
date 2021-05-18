execute @s[tag=staffstatus] ~~~ scoreboard players set hmmtoggledummy hmmtoggle 0
execute @s[tag=staffstatus] ~~~ scoreboard players operation @a hmmtoggle = hmmtoggledummy hmmtoggle
execute @s[tag=staffstatus] ~~~ scoreboard players set @a HMM 0

#Deny Nonstaff
execute @s[tag=!staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► Access §cDENIED§7! §bOnly staff can use this command"}]}
execute @s[tag=!staffstatus] ~~~ playsound note.bass @s ~ ~ ~
execute @s[tag=staffstatus] ~~~ playsound note.pling @s ~ ~ ~
execute @s[tag=staffstatus] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC §¶§b► §6Hotbar Messages §bhas been toggled §cOFF §bby §d"},{"selector":"@s"}]}
