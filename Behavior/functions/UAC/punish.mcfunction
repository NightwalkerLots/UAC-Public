execute @s[tag=staffstatus] ~~~ tellraw @a[tag=staffstatus] {"rawtext":[{"text":"§¶§cUAC §b► §d"},{"selector":"@s"},{"text":" §¶§bis staff and cannot be punished"}]}
execute @s[tag=!staffstatus] ~~~ function UAC/asset/punish_asset
