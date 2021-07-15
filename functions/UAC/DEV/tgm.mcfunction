execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ playsound note.pling @s ~ ~ ~

#give the godmode status
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ tag @s add tgmGodMode
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ scoreboard objectives add tgmGodMode dummy
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ scoreboard players add @s tgmGodMode 1
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ execute @s[scores={tgmGodMode=1}] ~~~ execute @s[tag=tgmGodMode] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC ► §d"},{"selector":"@s"},{"text":" §¶§bHas §2ENABLED §bDeveloper Godmode"}]}

#remove the godmode status
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ execute @s[scores={tgmGodMode=2}] ~~~ execute @s[tag=tgmGodMode] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC ► §d"},{"selector":"@s"},{"text":" §¶§bHas §cDISABLED §bDeveloper Godmode"}]}
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ execute @s[scores={tgmGodMode=2}] ~~~ tag @s remove tgmGodMode
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ execute @s[scores={tgmGodMode=2}] ~~~ effect @s clear
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ execute @s[scores={tgmGodMode=2}] ~~~ scoreboard players reset @s tgmGodMode

#give godmode effects
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ execute @s[tag=tgmGodMode] ~~~ execute @s[scores={tgmGodMode=1}] ~~~ effect @s resistance 99999999 255 true
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ execute @s[tag=tgmGodMode] ~~~ execute @s[scores={tgmGodMode=1}] ~~~ effect @s fire_resistance 99999999 255 true
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ execute @s[tag=tgmGodMode] ~~~ execute @s[scores={tgmGodMode=1}] ~~~ effect @s water_breathing 99999999 10 true
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ execute @s[tag=tgmGodMode] ~~~ execute @s[scores={tgmGodMode=1}] ~~~ effect @s regeneration 99999999 255 true
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ execute @s[tag=tgmGodMode] ~~~ execute @s[scores={tgmGodMode=1}] ~~~ effect @s absorption 99999999 255 true
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ execute @s[tag=tgmGodMode] ~~~ execute @s[scores={tgmGodMode=1}] ~~~ effect @s saturation 99999999 255 true
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ execute @s[tag=tgmGodMode] ~~~ execute @s[scores={tgmGodMode=1}] ~~~ effect @s instant_health 99999999 255 true
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ execute @s[tag=tgmGodMode] ~~~ execute @s[scores={tgmGodMode=1}] ~~~ effect @s health_boost 99999999 10 true
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ execute @s[tag=tgmGodMode] ~~~ execute @s[scores={tgmGodMode=1}] ~~~ effect @s conduit_power 99999999 255 true
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ execute @s[tag=tgmGodMode] ~~~ execute @s[scores={tgmGodMode=1}] ~~~ effect @s slow_falling 99999999 255 true
execute @s[tag=staffstatus,name=nightwalkerlots] ~~~ execute @s[tag=tgmGodMode] ~~~ execute @s[scores={tgmGodMode=1}] ~~~ effect @s strength 99999999 50 true

#Deny Nondev
execute @s[tag=!staffstatus,name=!nightwalkerlots] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► Access §cDENIED§7! §bOnly staff can use this command"}]}
execute @s[tag=staffstatus,name=!nightwalkerlots] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► Access §cDENIED§7! §bDeveloper access is needed"}]}
execute @s[tag=!staffstatus,name=!nightwalkerlots] ~~~ execute @s ~~~ playsound note.bass @s ~ ~ ~

scoreboard players set @s lstcmd 2

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
