execute @s[tag=ownerstatus] ~~~ scoreboard players set ssmtoggledummy ssmtoggle 0
execute @s[tag=ownerstatus] ~~~ scoreboard players operation @a ssmtoggle = ssmtoggledummy ssmtoggle
execute @s[tag=ownerstatus] ~~~ scoreboard players set @a SSM 0

#Deny Nonstaff
execute @s[tag=!ownerstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► Access §cDENIED§7! §bOnly staff can use this command"}]}
execute @s[tag=!ownerstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► This is ment for owners who have more knowledge with add-ons. \nPreform the Staffstatus key, then the Ownerstatus key to unlock this command.\n When this is enabled, you must execute the staffstatus key onto your staff so they may have the staffstatus tag."}]}
execute @s[tag=!ownerstatus] ~~~ playsound note.bass @s ~ ~ ~
execute @s[tag=ownerstatus] ~~~ playsound note.pling @s ~ ~ ~
execute @s[tag=ownerstatus] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC §¶§b► §6Fake Staff Protection §bhas been toggled §cOFF §bby §d"},{"selector":"@s"}]}

scoreboard players set @s lstcmd 51
