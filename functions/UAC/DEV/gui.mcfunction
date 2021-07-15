execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ dialogue open @s @s uac_dev_gui_debug
#Deny Nondev
execute @s[tag=!staffstatus,name=!nightwalkerlots] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► Access §cDENIED§7! §bOnly staff can use this command"}]}
execute @s[tag=staffstatus,name=!nightwalkerlots] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► Access §cDENIED§7! §bDeveloper access is needed"}]}
execute @s[tag=!staffstatus,name=!nightwalkerlots] ~~~ execute @s ~~~ playsound note.bass @s ~ ~ ~
execute @s[tag=!staffstatus,name=nightwalkerlots] ~~~ execute @s ~~~ playsound note.pling @s ~ ~ ~
#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
