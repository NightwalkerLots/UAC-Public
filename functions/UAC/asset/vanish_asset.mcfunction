#Deny if op abuse is on
execute @s[tag=!staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► Access §cDENIED§7! §bOnly staff can use this command"}]}
execute @s[tag=!staffstatus] ~~~ execute @s[scores={OPAM=1}] ~~~ playsound note.bass @s ~ ~ ~
execute @s[tag=staffstatus,scores={OPAM=1}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► Access §cDENIED§7! §6Anti OP Abuse §bdisables this command"}]}
#Enable Message
execute @s[tag=staffstatus,scores={OPAM=0,vnsh=1}] ~~~ playsound note.pling @s ~ ~ ~
execute @s[tag=staffstatus,scores={OPAM=0,vnsh=1}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC ► §d"},{"selector":"@s"},{"text":" §¶§bHas §2ENABLED §6Vanish Mode"}]}
#init vanish mode
execute @s[tag=staffstatus] ~~~ scoreboard players add @s vnsh 1
execute @s[tag=staffstatus,scores={OPAM=0,vnsh=1}] ~~~ tag @s add spectate
execute @s[tag=staffstatus,scores={OPAM=0,vnsh=1}] ~~~ effect @s night_vision 99999999 10 true
#disable with second use
execute @s[tag=staffstatus,scores={OPAM=0,vnsh=2}] ~~~ tag @s remove spectate
execute @s[tag=staffstatus,scores={OPAM=0,vnsh=2}] ~~~ effect @s clear
execute @s[tag=staffstatus,scores={OPAM=0,vnsh=2}] ~~~ scoreboard players add @s vnsh 0
