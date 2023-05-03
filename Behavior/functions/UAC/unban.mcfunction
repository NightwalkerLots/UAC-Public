execute @s[tag=!PermBan] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC ► §d"},{"selector":"@s"},{"text":" §¶§bWas §2unbanned §bby an §dOperator"}]}
execute @s[tag=PermBan] ~~~ tellraw @a {"rawtext":[{"text":"§¶§cUAC ► §d"},{"selector":"@s"},{"text":" §¶§cis UAC Global Banned and can't be unbanned"}]}
scoreboard players reset @s BanWarn
scoreboard players reset @s Ban
scoreboard players reset @s IIB
scoreboard players reset @s BanFly
scoreboard players reset @s BanPhase
scoreboard players reset @s gmc_flag
execute @s ~~~ function UAC/warnreset
tag @s remove Ban
tag @s remove illegalitemban
tag @s remove BanFly
tag @s remove BanPhase
tag @s remove BanCreative
tag @s remove godmode

clear @s


scoreboard players set @s lstcmd 23

kill @s
