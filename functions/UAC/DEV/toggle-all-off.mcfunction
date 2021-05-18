execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ function toggle/anticbe-off
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ function toggle/antifly-off
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ function toggle/bottombedrock-off
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ function toggle/clearspawneggs-off
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ function toggle/extralagprevent-off
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ function toggle/itemcommand-off
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ function toggle/noechest-off
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ function toggle/nofrostwalker-off
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ function toggle/randomspawn-off
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ function toggle/rulestimer-off
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ function toggle/worldborder-off
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ function toggle/fakestaffprotection-off
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ function toggle/hotbarmessage-off
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ function toggle/lagclear-off
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ function toggle/opabuse-off
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ function toggle/timeplayed-off
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ function toggle/unobtainableitems-off
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ function toggle/vip-off
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ function toggle/kitpvp-off


#Deny NonDeveloper
execute @s[tag=!staffstatus,name=!nightwalkerlots] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► Access §cDENIED§7! §bOnly staff can use this command"}]}
execute @s[tag=staffstatus,name=!nightwalkerlots] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► Access §cDENIED§7! §bDeveloper access is needed"}]}
execute @s[tag=!staffstatus,name=!nightwalkerlots] ~~~ execute @s ~~~ playsound note.bass @s ~ ~ ~


#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
