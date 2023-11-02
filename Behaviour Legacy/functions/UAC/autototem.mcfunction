#On on first use
scoreboard players add @s[tag=staffstatus] totemtog 1
execute as @s[scores={totemtog=1},tag=staffstatus] at @s run tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §b► §d"},{"selector":"@s"},{"text":" §¶§bhas §2ENABLED §6Auto Totem"}]}
scoreboard players set @s[scores={totemtog=1},tag=staffstatus] totemaut  329
tag @s[scores={totemtog=1},tag=staffstatus] add totemaut
execute as @s[scores={totemtog=1},tag=staffstatus] at @s run function particle/totem_poof
execute as @s[scores={totemtog=1},tag=staffstatus] at @s run playsound note.pling @s ~ ~ ~

#Off after second use
replaceitem entity @s[scores={opamtoggle=0,totemaut=329,totemtog=2},tag=totemaut,tag=staffstatus] slot.weapon.offhand 0 air
tag @s[scores={totemaut=329,totemtog=2}] remove totemaut
execute as @s[scores={totemaut=329,totemtog=2}] at @s run function particle/totem_poof
execute as @s[scores={totemaut=329,totemtog=2}] at @s run playsound note.pling @s ~ ~ ~
scoreboard players set @s[scores={totemtog=2}] totemaut 0
scoreboard players set @s[scores={totemtog=2}] totemtog 0
execute as @s[scores={totemaut=0,totemtog=0}] at @s run tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §b► §d"},{"selector":"@s"},{"text":" §¶§bhas §cDISABLED §6Auto Totem"}]}



#Staff args
execute as @s[tag=staffstatus] at @s run playsound note.pling @s ~ ~ ~
execute as @s[tag=!staffstatus] at @s run playsound note.bass @s ~ ~ ~
execute as @s[tag=!staffstatus] at @s run tellraw @s {"rawtext":[{"text":"§¶§cUAC §b► §cMust have staff to use this command"}]}
