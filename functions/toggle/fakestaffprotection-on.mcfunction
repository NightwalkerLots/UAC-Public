execute @s[tag=ownerstatus] ~~~ scoreboard players set ssmtoggledummy ssmtoggle 1
execute @s[tag=ownerstatus] ~~~ scoreboard players operation @a ssmtoggle = ssmtoggledummy ssmtoggle
execute @s[tag=ownerstatus] ~~~ scoreboard players set @a SSM 1

#Deny Nonstaff
execute @s[tag=!ownerstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► Access §cDENIED§7! §bOnly staff can use this command"}]}
execute @s[tag=!ownerstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► This is ment for owners who have more knowledge with add-ons. Preform the Staffstatus key, then the Ownerstatus key to unlock this command."}]}
execute @s[tag=!ownerstatus] ~~~ playsound note.bass @s ~ ~ ~
execute @s[tag=ownerstatus] ~~~ playsound note.pling @s ~ ~ ~
execute @s[tag=ownerstatus] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC §¶§b► §6Fake Staff Protection §bhas been toggled §2ON §bby §d"},{"selector":"@s"}]}
execute @s[tag=ownerstatus] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC §¶§b► §bYou now need to execute the Staff Key Command on a player to give them staff access."}]}

scoreboard players set @s lstcmd 52
