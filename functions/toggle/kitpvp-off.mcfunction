execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ scoreboard players set kpvpmtoggledummy kpvpmtoggle 0
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ scoreboard players operation @a kpvpmtoggle = kpvpmtoggledummy kpvpmtoggle
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ scoreboard players set @a KPVPM 0

#Deny Nonstaff
execute @s[tag=!staffstatus,name=!nightwalkerlots] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► Access §cDENIED§7! §bOnly staff can use this command"}]}
execute @s[tag=staffstatus,name=!nightwalkerlots] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► Access §cDENIED§7! §bDeveloper access is needed"}]}
execute @s[tag=!staffstatus,name=!nightwalkerlots] ~~~ execute @s ~~~ playsound note.bass @s ~ ~ ~
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ execute @s ~~~ playsound note.pling @s ~ ~ ~
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC §¶§b► §6Kit PvP Gamemode §bhas been toggled §cOFF §bby §d"},{"selector":"@s"}]}
