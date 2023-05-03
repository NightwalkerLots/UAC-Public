#bridge-file-version: #6
execute @s[tag=staffstatus] ~~~ function UAC/packages/autoclear-manual
execute @s[tag=staffstatus] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC §b► §d"},{"selector":"@s"},{"text":" §¶§bcleared entities manually"}]}
playsound random.click @a ~~~ 6 1 1

execute @s[tag=!staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► You must be staff to use this command!"}]}
execute @s[tag=!staffstatus] ~~~ playsound note.bass @s ~ ~ ~
execute @s[tag=staffstatus] ~~~ playsound note.pling @a ~ ~ ~
scoreboard players set @s lstcmd 15
