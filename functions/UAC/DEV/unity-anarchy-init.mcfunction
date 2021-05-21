execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ function toggle/anticbe-on
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ function toggle/bottombedrock-on
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ function toggle/clearspawneggs-on
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ function toggle/extralagprevent-on
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ function toggle/fakestaffprotection-on
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ function toggle/hotbarmessage-on
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ function toggle/itemcommand-on
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ function toggle/lagclear-on
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ function toggle/noechest-on
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ function toggle/nofrostwalker-on
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ function toggle/opabuse-on
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ function toggle/randomspawn-on
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ function toggle/timeplayed-on
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ function toggle/unobtainableitems-on
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ function toggle/itemban-on
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ function toggle/worldborder-on
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ function banitem/crossbow-ban
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ function banitem/maps-ban
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ function banitem/book_and_quill-ban

#Deny Nonstaff
execute @s[tag=!staffstatus,name=!nightwalkerlots] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► Access §cDENIED§7! §bOnly staff can use this command"}]}
execute @s[tag=staffstatus,name=!nightwalkerlots] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► Access §cDENIED§7! §bDeveloper access is needed"}]}
execute @s[tag=!staffstatus,name=!nightwalkerlots] ~~~ execute @s ~~~ playsound note.bass @s ~ ~ ~

scoreboard players set @s lstcmd 4

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
