#Sets up scoreboard
scoreboard objectives add cleararea dummy cleararea
scoreboard players add @s[tag=staffstatus] cleararea 1

#If has clearcheck, then clear area
execute as @p[scores={cleararea=2},tag=staffstatus] at @s run summon armor_stand cleararea
execute as @e[type=armor_stand,name=cleararea] at @s run fill ~-15 ~-15 ~-15 ~15 ~15 ~15 air
execute as @p[scores={cleararea=2},tag=staffstatus] at @s run tellraw @a {"rawtext":[{"text":"§¶§cUAC §b► §d"},{"selector":"@s"},{"text":" §¶§bjust cleared a small area"}]}
kill @e[type=armor_stand,name=cleararea]

#Make-Shift "are you sure"
execute as @p[scores={cleararea=1},tag=staffstatus] at @s run tellraw @p[tag=!clearcheck] {"rawtext":[{"text":"§¶§cUAC► This will fill all blocks within a 15 radius with air!"}]}
execute as @p[scores={cleararea=1},tag=staffstatus] at @s run tellraw @p[tag=!clearcheck] {"rawtext":[{"text":"§¶§cUAC► This can't be undone! Execute command again if you're sure."}]}
execute as @p[scores={cleararea=2},tag=staffstatus] at @s tellraw @p[tag=!clearcheck] {"rawtext":[{"text":"§¶§cUAC► The immediate area has been cleared with air."}]}

execute as @s[tag=!staffstatus] at @s run tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► You must be staff to use this command!"}]}
execute as @s[tag=staffstatus] at @s run playsound note.pling @s ~ ~ ~
execute as @s[tag=!staffstatus] at @s run playsound note.bass @s ~ ~ ~

#Remove tag after area is cleared
execute as @p[scores={cleararea=2}] at @s run scoreboard players reset @s cleararea
execute as @a[scores={cleararea=3..10}] at @s run scoreboard players reset @s cleararea

scoreboard players set @s lstcmd 10
