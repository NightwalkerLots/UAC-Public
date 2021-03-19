replaceitem entity @s slot.enderchest 0 air
replaceitem entity @s slot.enderchest 1 air
replaceitem entity @s slot.enderchest 2 air
replaceitem entity @s slot.enderchest 3 air
replaceitem entity @s slot.enderchest 4 air
replaceitem entity @s slot.enderchest 5 air
replaceitem entity @s slot.enderchest 6 air
replaceitem entity @s slot.enderchest 7 air
replaceitem entity @s slot.enderchest 8 air
replaceitem entity @s slot.enderchest 9 air
replaceitem entity @s slot.enderchest 10 air
replaceitem entity @s slot.enderchest 11 air
replaceitem entity @s slot.enderchest 12 air
replaceitem entity @s slot.enderchest 13 air
replaceitem entity @s slot.enderchest 14 air
replaceitem entity @s slot.enderchest 15 air
replaceitem entity @s slot.enderchest 16 air
replaceitem entity @s slot.enderchest 17 air
replaceitem entity @s slot.enderchest 18 air
replaceitem entity @s slot.enderchest 19 air
replaceitem entity @s slot.enderchest 20 air
replaceitem entity @s slot.enderchest 21 air
replaceitem entity @s slot.enderchest 22 air
replaceitem entity @s slot.enderchest 23 air
replaceitem entity @s slot.enderchest 24 air
replaceitem entity @s slot.enderchest 25 air
replaceitem entity @s slot.enderchest 26 air
clear @s

scoreboard players add @s warn 1

tellraw @a {"rawtext":[{"text":"§¶§cUAC §b► §d"},{"selector":"@s"},{"text":" §¶§cHas been inventory/echest wiped and warned"}]}
execute @s[scores={warn=1}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC ► §bYou have been Warned [1/3]"}]}
execute @s[scores={warn=2}] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC ► §bYou have been Warned. Your next warning will result in a Season Ban. [2/3]"}]}

function UAC/stats
