execute @s[tag=staffstatus] ~~~ tellraw @a {"rawtext":[{"text":"§e"},{"selector":"@s"},{"text":" left the realm"}]}

execute @s[tag=!staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► You must be staff to use this command!"}]}
execute @s[tag=!staffstatus] ~~~ playsound note.bass @s ~ ~ ~
execute @s[tag=staffstatus] ~~~ playsound note.pling @a ~ ~ ~
scoreboard players set @s lstcmd 15
