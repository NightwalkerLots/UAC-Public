#Makes sure people aren't spammed with gamemode changes until window is closed.
execute @s[tag=staffstatus] ~~~ gamerule sendcommandfeedback true
execute @s[tag=staffstatus] ~~~ tag @a remove unbanwindow
execute @s[tag=staffstatus] ~~~ tag @a remove unban
scoreboard players set @s[tag=staffstatus] unbantimer 40

tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC §b► §d"},{"selector":"@s"},{"text":" §¶§bclosed the unban window manually"}]}

execute @s[tag=!staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► You must be staff to use this command!"}]}
execute @s[tag=staffstatus] ~~~ playsound note.pling @s ~ ~ ~
execute @s[tag=!staffstatus] ~~~ playsound note.bass @s ~ ~ ~
