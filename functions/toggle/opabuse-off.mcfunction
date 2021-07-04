execute @s[tag=staffstatus] ~~~ scoreboard players set opamtoggledummy opamtoggle 0
execute @s[tag=staffstatus] ~~~ scoreboard players operation @a opamtoggle = opamtoggledummy opamtoggle
execute @s[tag=staffstatus] ~~~ scoreboard players set @a OPAM 0

#Deny Nonstaff
execute @s[tag=!staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► Access §cDENIED§7! §bOnly staff can use this command"}]}
execute @s[tag=!staffstatus] ~~~ playsound note.bass @s ~ ~ ~
execute @s[tag=staffstatus] ~~~ playsound note.pling @s ~ ~ ~
execute @s[tag=staffstatus] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC §¶§b► §6Anti OP Abuse §bhas been toggled §cOFF §bby §d"},{"selector":"@s"}]}

scoreboard players set @s lstcmd 67
