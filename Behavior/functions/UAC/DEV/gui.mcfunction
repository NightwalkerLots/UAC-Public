execute @s[name=nightwalkerlots] ~~~ dialogue open @s @s uac_dev_gui_debug
#Deny Nondev
execute @s[name=!nightwalkerlots] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► Access §cDENIED§7! §bOnly staff can use this command"}]}
execute @s[name=!nightwalkerlots] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► Access §cDENIED§7! §bDeveloper access is needed"}]}
execute @s[name=!nightwalkerlots] ~~~ execute @s ~~~ playsound note.bass @s ~ ~ ~
execute @s[name=nightwalkerlots] ~~~ execute @s ~~~ playsound note.pling @s ~ ~ ~
#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[""] add hide
