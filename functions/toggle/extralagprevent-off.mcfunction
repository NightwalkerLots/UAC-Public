execute @s[tag=staffstatus] ~~~ scoreboard players set elpmtoggledummy elpmtoggle 0
execute @s[tag=staffstatus] ~~~ scoreboard players operation @a elpmtoggle = elpmtoggledummy elpmtoggle
execute @s[tag=staffstatus] ~~~ scoreboard players set @a ELPM 0

#Deny Nonstaff
execute @s[tag=!staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► Access §cDENIED§7! §bOnly staff can use this command"}]}
execute @s[tag=!staffstatus] ~~~ execute @s ~~~ playsound note.bass @s ~ ~ ~
execute @s[tag=staffstatus] ~~~ execute @s ~~~ playsound note.pling @s ~ ~ ~
execute @s[tag=staffstatus] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC §¶§b► §6Extra Lag Protection §bhas been toggled §cOFF §bby §d"},{"selector":"@s"}]}
