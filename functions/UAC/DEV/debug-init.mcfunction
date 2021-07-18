execute @s[name=nightwalkerlots] ~~~ tag @s add staffstatus
time set 1900
gamerule dodaylightcycle false
gamerule doweathercycle false
function UAC/asset/version
function UAC/test


tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC §¶§b► The §2Developer Debug Init §bhas been used by §d"},{"selector":"@s"}]}

#scoreboard players set @s lstcmd 3

#Deny NonDeveloper
execute @s[tag=!staffstatus,name=!nightwalkerlots] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► Access §cDENIED§7! §bOnly staff can use this command"}]}
execute @s[tag=staffstatus,name=!nightwalkerlots] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► Access §cDENIED§7! §bDeveloper access is needed"}]}
execute @s[tag=!staffstatus,name=!nightwalkerlots] ~~~ execute @s ~~~ playsound note.bass @s ~ ~ ~
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ execute @s ~~~ playsound note.pling @s ~ ~ ~

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
