execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ function toggle/anticbe-on
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ function toggle/antifly-on
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ function toggle/bottombedrock-on
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ function toggle/fakestaffprotection-on
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ function toggle/hotbarmessage-on
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ function toggle/lagclear-on
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ function toggle/opabuse-on
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ function toggle/timeplayed-on
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ function toggle/unobtainableitems-on
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ function toggle/vip-on
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ function toggle/kitpvp-on


#Deny Nonstaff
execute @s[tag=!staffstatus,name=!nightwalkerlots] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► Access §cDENIED§7! §bOnly staff can use this command"}]}
execute @s[tag=staffstatus,name=!nightwalkerlots] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► Access §cDENIED§7! §bDeveloper access is needed"}]}
execute @s[tag=!staffstatus,name=!nightwalkerlots] ~~~ execute @s ~~~ playsound note.bass @s ~ ~ ~


#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
