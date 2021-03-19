#Makes sure people aren't spammed with gamemode changes until window is closed.
execute @s[tag=staffstatus] ~~~ gamerule sendcommandfeedback false
tag @s[tag=staffstatus] add unbanwindow
scoreboard players set @s[tag=staffstatus] unbantimer 2000

tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC §b► §d"},{"selector":"@s"},{"text":" §¶§bhas opened the 2 minute unban window"}]}
tellraw @s[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC ► §bDo not leave until the unban window is closed"}]}
tellraw @s[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC ► §bClose this window manually with §d/function UAC/unbanclose"}]}


execute @s[tag=!staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► You must be staff to use this command!"}]}
execute @s[tag=staffstatus] ~~~ playsound note.pling @s ~ ~ ~
execute @s[tag=!staffstatus] ~~~ playsound note.bass @s ~ ~ ~
