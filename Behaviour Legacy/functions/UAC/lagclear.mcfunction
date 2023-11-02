#bridge-file-version: #6
execute as @s[tag=staffstatus] at @s run function UAC/packages/autoclear-manual
execute as @s[tag=staffstatus] at @s run tellraw @a {"rawtext":[{"text":"§¶§cUAC §b► §d"},{"selector":"@s"},{"text":" §¶§bcleared entities manually"}]}
playsound random.click @a ~~~ 6 1 1

execute as @s[tag=!staffstatus] at @s run tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► You must be staff to use this command!"}]}
execute as @s[tag=!staffstatus] at @s run playsound note.bass @s ~ ~ ~
execute as @s[tag=staffstatus] at @s run playsound note.pling @a ~ ~ ~
scoreboard players set @s lstcmd 15
