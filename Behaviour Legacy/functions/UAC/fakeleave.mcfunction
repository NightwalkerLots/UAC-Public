execute as @s[tag=staffstatus] at @s run tellraw @a {"rawtext":[{"text":"§e"},{"selector":"@s"},{"text":" left the realm"}]}

execute as @s[tag=!staffstatus] at @s run tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► You must be staff to use this command!"}]}
execute as @s[tag=!staffstatus] at @s run playsound note.bass @s ~ ~ ~
execute as @s[tag=staffstatus] at @s run playsound note.pling @a ~ ~ ~
scoreboard players set @s lstcmd 15
