#Deny if not staff
execute @s[tag=!staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► Access §cDENIED§7! §bOnly staff can use this command"}]}
execute @s[tag=!staffstatus] ~~~ playsound note.bass @s ~ ~ ~
execute @s[tag=staffstatus] ~~~ scoreboard players add @s vnsh 1
#init vanish mode
execute @s[tag=staffstatus,scores={vnsh=1}] ~~~ tag @s add spectate
execute @s[tag=staffstatus,scores={vnsh=1}] ~~~ effect @s night_vision 99999999 10 true
execute @s[tag=staffstatus,scores={vnsh=1}] ~~~ effect @s invisibility 99999999 10 true
execute @s[tag=staffstatus,scores={vnsh=1}] ~~~ playsound note.pling @s ~ ~ ~
execute @s[tag=staffstatus,scores={vnsh=1}] ~~~ function particle/nether_poof
execute @s[tag=staffstatus,scores={vnsh=1}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF ► §d"},{"selector":"@s"},{"text":" §¶§bHas §2ENABLED §6Vanish Mode"}]}

#disable with second use
execute @s[tag=staffstatus,scores={vnsh=2}] ~~~ tag @s remove spectate
execute @s[tag=staffstatus,scores={vnsh=2}] ~~~ effect @s clear
execute @s[tag=staffstatus,scores={vnsh=2}] ~~~ playsound note.pling @s ~ ~ ~
execute @s[tag=staffstatus,scores={vnsh=2}] ~~~ function particle/nether_poof
execute @s[tag=staffstatus,scores={vnsh=2}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF ► §d"},{"selector":"@s"},{"text":" §¶§bHas §cDISABLED §6Vanish Mode"}]}
execute @s[tag=staffstatus,scores={vnsh=2}] ~~~ scoreboard players set @s vnsh 0

#This hides this from the in-game function command directory
execute @f ~~~ hide
tag @f[tag=""] add hide
