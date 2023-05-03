execute @s[tag=!staffstatus] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §b► §d"},{"selector":"@s"},{"text":" §¶§bHas been whitelisted from Anti-Fly Module"}]}
execute @s[tag=staffstatus] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC STAFF §b► §d"},{"selector":"@s"},{"text":" §¶§bdoes not need this because they are staff."}]}

execute @s[tag=!staffstatus] ~~~  scoreboard players set @s 2KK001 725
scoreboard players set @s lstcmd 16
