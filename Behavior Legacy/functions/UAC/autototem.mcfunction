#On on first use
scoreboard players add @s[tag=staffstatus] totemtog 1
execute @s[scores={totemtog=1},tag=staffstatus] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §b► §d"},{"selector":"@s"},{"text":" §¶§bhas §2ENABLED §6Auto Totem"}]}
scoreboard players set @s[scores={totemtog=1},tag=staffstatus] totemaut  329
tag @s[scores={totemtog=1},tag=staffstatus] add totemaut
execute @s[scores={totemtog=1},tag=staffstatus] ~~~ function particle/totem_poof
execute @s[scores={totemtog=1},tag=staffstatus] ~~~ playsound note.pling @s ~ ~ ~

#Off after second use
replaceitem entity @s[scores={opamtoggle=0,totemaut=329,totemtog=2},tag=totemaut,tag=staffstatus] slot.weapon.offhand 0 air
tag @s[scores={totemaut=329,totemtog=2}] remove totemaut
execute @s[scores={totemaut=329,totemtog=2}] ~~~ function particle/totem_poof
execute @s[scores={totemaut=329,totemtog=2}] ~~~ playsound note.pling @s ~ ~ ~
scoreboard players set @s[scores={totemtog=2}] totemaut 0
scoreboard players set @s[scores={totemtog=2}] totemtog 0
execute @s[scores={totemaut=0,totemtog=0}] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §b► §d"},{"selector":"@s"},{"text":" §¶§bhas §cDISABLED §6Auto Totem"}]}



#Staff args
execute @s[tag=staffstatus] ~~~ playsound note.pling @s ~ ~ ~
execute @s[tag=!staffstatus] ~~~ playsound note.bass @s ~ ~ ~
execute @s[tag=!staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §b► §cMust have staff to use this command"}]}
