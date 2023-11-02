execute as @s[tag=staffstatus] at @s run function UAC/asset/version
execute as @s[tag=staffstatus] at @s run function UAC/asset/discord
execute as @s[tag=staffstatus] at @s run function UAC/asset/createdby
execute as @s[tag=staffstatus] at @s run function UAC/asset/patreon
execute as @s[tag=staffstatus] at @s run function UAC/asset/credit_asset
execute as @s[tag=!staffstatus] at @s run tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► You must be staff to use this command!"}]}
scoreboard players set @s lstcmd 11
