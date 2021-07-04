execute @s[tag=ownerstatus] ~~~ scoreboard players set opamtoggledummy opamtoggle 0
execute @s[tag=ownerstatus] ~~~ scoreboard players operation @a opamtoggle = opamtoggledummy opamtoggle
execute @s[tag=ownerstatus] ~~~ scoreboard players set @a OPAM 0

#Deny Nonstaff
execute @s[tag=!ownerstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► Access §cDENIED§7! §bOnly ownerstatus can use this command"}]}
execute @s[tag=!ownerstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► This is ment for owners who have more knowledge with add-ons. Preform the Staffstatus key, then the Ownerstatus key to unlock this command."}]}
execute @s[tag=!ownerstatus] ~~~ playsound note.bass @s ~ ~ ~
execute @s[tag=ownerstatus] ~~~ playsound note.pling @s ~ ~ ~
execute @s[tag=ownerstatus] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC §¶§b► §6Anti OP Abuse §bhas been toggled §cOFF §bby §d"},{"selector":"@s"}]}

scoreboard players set @s lstcmd 67
