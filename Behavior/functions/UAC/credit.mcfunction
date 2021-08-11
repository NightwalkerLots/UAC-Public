execute @s[tag=staffstatus] ~~~ function UAC/asset/version
execute @s[tag=staffstatus] ~~~ function UAC/asset/discord
execute @s[tag=staffstatus] ~~~ function UAC/asset/createdby
execute @s[tag=staffstatus] ~~~ function UAC/asset/patreon
execute @s[tag=staffstatus] ~~~ function UAC/asset/credit_asset
execute @s[tag=!staffstatus] ~~~ tellraw @s {"rawtext":[{"text":"§¶§cUAC §¶§b► You must be staff to use this command!"}]}
scoreboard players set @s lstcmd 11
