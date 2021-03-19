execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ scoreboard players set ssmtoggledummy ssmtoggle 1
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ scoreboard players operation @a ssmtoggle = ssmtoggledummy ssmtoggle
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ scoreboard players set @a SSM 1

#Deny Nonstaff
execute @s[tag=!staffstatus,name=!nightwalkerlots] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► Access §cDENIED§7! §bOnly staff can use this command"}]}
execute @s[tag=staffstatus,name=!nightwalkerlots] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► Access §cDENIED§7! §bDeveloper access is needed"}]}
execute @s[tag=!staffstatus,name=!nightwalkerlots] ~~~ execute @s ~~~ playsound note.bass @s ~ ~ ~
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ execute @s ~~~ playsound note.pling @s ~ ~ ~
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC §¶§b► §6Fake Staff Protection §bhas been toggled §2ON §bby §d"},{"selector":"@s"}]}
